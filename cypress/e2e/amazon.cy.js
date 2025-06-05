const { expect } = require("chai");

describe("Test amazon", async function () {
  it("Search for chair", async function () {
    await cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    await cy.visit("https://www.amazon.com");
    await cy.get("#nav-search").type("chair");
    await cy.get("#nav-search-submit-button").click();
    await cy.get("#a-autoid-0-announce").click();
    await cy.get("#s-result-sort-select_2", { timeout: 10000 }).click();

    await cy
      .xpath("(//div[@data-cy='title-recipe'])[5]//h2/span")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("searchProductName");
      });

    await cy
      .xpath(
        "(//div[@data-cy='price-recipe'])[5]//span[contains(@class, 'a-offscreen')]"
      )
      .invoke("text")
      .then((text) => {
        const priceNoDecimal = text.replace(/[^\d]/g, "").slice(0, -2); // Buang 2 digit belakang
        cy.wrap(priceNoDecimal).as("searchPrice");
      });
    await cy
      .xpath("(//div[@data-component-type='s-search-result'])[5]")
      .click();

    await cy.get("@searchProductName").then((searchName) => {
      cy.xpath("//span[@id='productTitle']")
        .invoke("text")
        .then((detailName) => {
          expect(detailName.trim().toLowerCase()).to.include(
            searchName.toLowerCase()
          );
        });
    });

    cy.get("@searchPrice").then((searchPrice) => {
      cy.xpath(
        "//div[@id='corePriceDisplay_desktop_feature_div']//span[@class='a-price-whole']"
      )
        .invoke("text")
        .then((detailPrice) => {
          const detailPriceClean = detailPrice.replace(/[^\d]/g, "");
          expect(detailPriceClean).to.include(searchPrice);
        });
    });
  });
});
