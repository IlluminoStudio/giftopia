/* global cy, Cypress */
import {
  GIPHY_SEARCH_BASE_URL,
  GIPHY_TRENDING_BASE_URL,
} from "../../src/config";

describe("Overall functionalities and user interaction", () => {
  beforeEach(() => {
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "5Images.json",
    }).as("getTrendingGifs");

    cy.intercept("GET", `${GIPHY_SEARCH_BASE_URL}*`, {
      fixture: "1Image.json",
    }).as("getSearchGifs");
  });

  it("Page should load correctly with all the elements", () => {
    cy.visit("/");

    cy.wait("@getTrendingGifs");

    cy.get(".header").should("be.visible");
    cy.get(".image-list").should("have.length", 1);
    cy.get(".image-list img").should("have.length", 5);
    cy.get(".search-bar").should("be.visible");
    cy.get(".no-gifs-message").should("not.exist");
  });

  it("'Trending' to 'Search' transition", () => {
    cy.visit("/");

    cy.wait("@getTrendingGifs");
    cy.get(".image-list img").should("have.length", 5);

    searchSomething("bean");

    cy.get(".header").should("be.visible");
    cy.get(".image-list").should("have.length", 1);
    cy.get(".image-list img").should("have.length", 1);
    cy.get(".search-bar").should("be.visible");
    cy.get(".no-gifs-message").should("not.exist");
  });

  it("Favourite/unfavourite", () => {
    cy.visit("/");

    cy.wait("@getTrendingGifs");

    searchSomething("bean");

    // Toggle favorite
    cy.get(".image-list img")
      .first()
      .parent()
      .find(".favourite-button")
      .should("be.visible")
      .then(($el) => {
        // eslint-disable-next-line no-unused-expressions
        expect(Cypress.dom.isAttached($el)).to.be.true;
        cy.wrap($el).should("be.visible");
      });

    // Untoggle favorite
    cy.get(".image-list img")
      .first()
      .parent()
      .find(".favourite-button")
      .should("be.visible")
      .then(($el) => {
        // eslint-disable-next-line no-unused-expressions
        expect(Cypress.dom.isAttached($el)).to.be.true;
        cy.wrap($el).should("be.visible");
      });

    cy.get(".image-list img")
      .first()
      .parent()
      .find(".favourite-button")
      .should("not.have.class", "favourited");
  });

  it("Favourite persistence", () => {
    cy.visit("/");

    cy.wait("@getTrendingGifs");

    // Toggle favorite
    cy.get(".image-list img")
      .first()
      .parent()
      .find(".favourite-button")
      .should("be.visible")
      .click();
    cy.get(".image-list img")
      .first()
      .parent()
      .find(".favourite-button")
      .should("have.class", "favourited");

    // Refresh the page
    cy.reload();

    // Re-query and assert that the favourite class is still present after refresh
    cy.get(".image-list img")
      .first()
      .parent()
      .find(".favourite-button")
      .should("have.class", "favourited");
  });

  it("When failed to retrieve individual GIFs", () => {
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "10ImagesWithError.json",
    }).as("getSearchGifs");

    cy.visit("/");

    // // The last image will eventually fail and the 'missing' image should be used
    cy.get(".image-list img").should("have.length", 10);
  });
});

describe("Trending GIFs", () => {
  beforeEach(() => {
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "1Image.json",
    }).as("getTrendingGifs");
  });

  it("When Trending API respond with 200", () => {
    cy.visit("/");
    cy.wait("@getTrendingGifs");

    cy.get(".image-list").should("have.length", 1);
    cy.get(".image-list img").should("have.length", 1);
  });

  it("When Trending API respond with 500", () => {
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      statusCode: 500,
      body: {},
    }).as("getTrendingGifs");

    cy.visit("/");
    cy.wait("@getTrendingGifs");

    cy.get(".no-gifs-message").should("be.visible").and("contain", "coffee");
  });

  it("When Trending API respond with 200 but no data", () => {
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "0Image.json",
    }).as("getTrendingGifs");

    cy.visit("/");

    cy.wait("@getTrendingGifs");

    cy.get(".no-gifs-message").should("be.visible").and("contain", "coffee");
  });
});

describe("Search GIFs", () => {
  beforeEach(() => {
    cy.intercept("GET", `${GIPHY_SEARCH_BASE_URL}*`, {
      fixture: "1Image.json",
    }).as("getSearchGifs");

    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "5Images.json",
    }).as("getTrendingGifs");
  });

  it("When Search API respond with 200", () => {
    cy.visit("/");

    cy.wait("@getTrendingGifs");

    searchSomething("bean");

    cy.get(".image-list").should("have.length", 1);
    cy.get(".image-list img").should("have.length", 1);
    cy.get(".display-search-term").should(
      "contain",
      "Displaying GIFs for: 'bean'"
    );
  });

  it("When Search API respond with 404", () => {
    cy.intercept("GET", `${GIPHY_SEARCH_BASE_URL}*`, {
      statusCode: 404,
      body: {},
    }).as("getSearchGifs");

    cy.visit("/");

    cy.wait("@getTrendingGifs");

    searchSomething("berry");

    cy.get(".no-gifs-message").should("be.visible").and("contain", "coffee");
  });

  it("When Search API respond with 200 but no data", () => {
    cy.intercept("GET", `${GIPHY_SEARCH_BASE_URL}*`, {
      fixture: "0Image.json",
    }).as("getSearchGifs");

    cy.visit("/");

    cy.wait("@getTrendingGifs");
    searchSomething("fish");

    cy.get(".no-gifs-message").should("be.visible").and("contain", "coffee");
  });
});

function searchSomething(searchTerm) {
  cy.get(".search-input").type(`${searchTerm}{enter}`);
  cy.wait("@getSearchGifs");
}
