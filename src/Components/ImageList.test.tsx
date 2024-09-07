import React from "react";
import ImageList from "./ImageList";
import { ImageType } from "./types";

describe("ImageList component", () => {
  const mockImages: ImageType[] = [
    {
      id: "1",
      title: "Test Image 1",
      fixed_width_url: "https://foo.gif",
      favourite: false,
    },
    {
      id: "2",
      title: "Test Image 2",
      fixed_width_url: "https://bar.gif",
      favourite: false,
    },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it("renders images when provided", () => {});

  it("displays coffee message when images is empty", () => {});

  it("loads favourites from localStorage", () => {});

  it("toggles favourite status and updates localStorage", async () => {});
});
