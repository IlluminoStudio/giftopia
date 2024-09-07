/* global cy */
import {
  GIPHY_SEARCH_BASE_URL,
  GIPHY_TRENDING_BASE_URL,
} from "../../src/config";

describe("Overall correctness", () => {
  beforeEach(() => {
    // Intercept the API request and respond with the fixture
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "5Images.json",
    }).as("getTrendingGifs");

    cy.intercept("GET", `${GIPHY_SEARCH_BASE_URL}*`, {
      fixture: "1Image.json",
    }).as("getSearchGifs");
  });

  it("Page should load correctly with all the elements", () => {
    // Visit the homepage
    cy.visit("/");

    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");

    // Assert that the empty message is displayed
    cy.get(".header").should("be.visible");
    cy.get(".image-list").should("have.length", 1);
    cy.get(".image-list img").should("have.length", 5); // Wait until 10 images are rendered
    cy.get(".search-bar").should("be.visible");
    cy.get(".no-gifs-message").should("not.exist");
  });

  it("'Trending' to 'Search' transition", () => {
    // Visit the homepage
    cy.visit("/");

    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");
    cy.get(".image-list img").should("have.length", 5); 

    searchSomething("bean");

    // Assert that the empty message is displayed
    cy.get(".header").should("be.visible");
    cy.get(".image-list").should("have.length", 1);
    cy.get(".image-list img").should("have.length", 1); // Wait until 10 images are rendered
    cy.get(".search-bar").should("be.visible");
    cy.get(".no-gifs-message").should("not.exist");
  });

  it("Favourite/unfavourite", () => {
    // Visit the homepage
    cy.visit("/");

    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");

    searchSomething("bean");

    // Toggle favorite
    cy.get(".image-list img").first().parent().find(".favourite-button").click();
    cy.get(".image-list img").first().parent().find(".favourite-button").should("have.class", "favourited");

    // Untoggle favorite
    cy.get(".image-list img").first().parent().find(".favourite-button").click();
    cy.get(".image-list img").first().parent().find(".favourite-button").should("not.have.class", "favourited");
  });

  it("Favourite persistence", () => {
    // Visit the homepage
    cy.visit("/");

    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");


    // Toggle favorite
    cy.get(".image-list img").first().parent().find(".favourite-button").should("be.visible").click();
    cy.get(".image-list img").first().parent().find(".favourite-button").should("have.class", "favourited");

    // Refresh the page
    cy.reload();


    // Re-query and assert that the favourite class is still present after refresh
    cy.get(".image-list img").first().parent().find(".favourite-button").should("have.class", "favourited");
  });
});

describe("Trending GIFs", () => {
  beforeEach(() => {
    // Intercept the API request and respond with the fixture
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "1Image.json",
    }).as("getTrendingGifs");
  });

  it("When Trending API respond with 200", () => {
    // Visit the homepage
    cy.visit("/");
    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");

    // Assert that the empty message is displayed
    cy.get(".image-list").should("have.length", 1);
    cy.get(".image-list img").should("have.length", 1);
  });

  it("When Trending API respond with 500", () => {
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      statusCode: 500,
      body: {},
    }).as("getTrendingGifs");
    // Visit the homepage
    cy.visit("/");
    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");

    cy.get(".no-gifs-message").should("be.visible").and("contain", "coffee");
  });

  it("When Trending API respond with 200 but no data", () => {
    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "0Image.json",
    }).as("getTrendingGifs");
    // Visit the homepage
    cy.visit("/");
    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");

    cy.get(".no-gifs-message").should("be.visible").and("contain", "coffee");
  });
});

describe("Search GIFs", () => {
  beforeEach(() => {
    // Intercept the API request and respond with the fixture
    cy.intercept("GET", `${GIPHY_SEARCH_BASE_URL}*`, {
      fixture: "1Image.json",
    }).as("getSearchGifs");

    cy.intercept("GET", `${GIPHY_TRENDING_BASE_URL}*`, {
      fixture: "5Images.json",
    }).as("getTrendingGifs");
  });

  it("When Search API respond with 200", () => {
    // Visit the homepage
    cy.visit("/");
    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");

    searchSomething("bean");

    // Assert that the empty message is displayed
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
    // Visit the homepage
    cy.visit("/");

    cy.wait("@getTrendingGifs");

    searchSomething("berry");

    cy.get(".no-gifs-message").should("be.visible").and("contain", "coffee");
  });

  it("When Search API respond with 200 but no data", () => {
    cy.intercept("GET", `${GIPHY_SEARCH_BASE_URL}*`, {
      fixture: "0Image.json",
    }).as("getSearchGifs");
    // Visit the homepage
    cy.visit("/");
    // Wait for the trending GIF API call
    cy.wait("@getTrendingGifs");
    searchSomething("fish");

    cy.get(".no-gifs-message").should("be.visible").and("contain", "coffee");
  });
});

function searchSomething(searchTerm) {
  cy.get(".search-input").type(`${searchTerm}{enter}`);
  cy.wait("@getSearchGifs");
}
