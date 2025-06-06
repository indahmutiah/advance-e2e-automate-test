class Amazon {
  visitHomePage() {
    cy.visit("https://www.amazon.com");
  }
  searchProduct(productName) {
    cy.get("#nav-search").type(productName);
    cy.get("#nav-search-submit-button").click();
  }
  sortByPrice() {
    cy.get("#a-autoid-0-announce").click();
    cy.get("#s-result-sort-select_2", { timeout: 10000 }).click();
  }
  saveSearchProductName() {
    cy.xpath("(//div[@data-cy='title-recipe'])[5]//h2/span")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("searchProductName");
      });
  }
  saveSearchProductPrice() {
    cy.xpath(
      "(//div[@data-cy='price-recipe'])[5]//span[contains(@class, 'a-offscreen')]"
    )
      .invoke("text")
      .then((text) => {
        const priceNoDecimal = text.replace(/[^\d]/g, "").slice(0, -2);
        cy.wrap(priceNoDecimal).as("searchPrice");
      });
  }
  clickOnTheRightmostProduct() {
    cy.xpath("(//div[@data-component-type='s-search-result'])[5]").click();
  }
  expectProductName() {
    cy.get("@searchProductName").then((searchName) => {
      cy.xpath("//span[@id='productTitle']")
        .invoke("text")
        .then((detailName) => {
          expect(detailName.trim().toLowerCase()).to.include(
            searchName.toLowerCase()
          );
        });
    });
  }
  expectProductPrice() {
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
  }
}
