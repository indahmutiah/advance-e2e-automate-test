const { expect } = require("chai");
import Amazon from "../support/pages/amazon";

describe("Test amazon", async function () {
  before(() => {
    cy.on("uncaught:exception", () => false);
  });

  it("Search for chair", async function () {
    Amazon.visitHomePage();
    Amazon.searchProduct("chair");
    Amazon.sortByPrice();
    Amazon.saveSearchProductName();
    Amazon.saveSearchProductPrice();
    Amazon.clickOnTheRightmostProduct();
    Amazon.expectProductName();
    Amazon.expectProductPrice();
  });
});
