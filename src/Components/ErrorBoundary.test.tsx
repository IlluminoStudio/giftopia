import React from "react";
// Mock component that throws an error
const ErrorThrowingComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {});

  it("renders fallback UI when error", () => {});

  it('resets the error state when "Try again" is clicked', () => {});
});
