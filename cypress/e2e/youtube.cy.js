import Youtube from "../support/pages/youtube";

describe("Test Youtube", function () {
  before(() => {
    cy.on("uncaught:exception", () => false);
  });

  it("Get Video Trending", function () {
    Youtube.visitHomePage();
    Youtube.clickTrendingTab();
    Youtube.clickMoviesTab();
    Youtube.saveVideoTitle(2);
    Youtube.saveVideoChannel();
    Youtube.clickVideo();
    Youtube.assertVideoTitle();
    Youtube.assertVideoChannel();
  });
});
