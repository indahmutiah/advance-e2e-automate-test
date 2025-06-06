const { should } = require("chai");

describe("Test agoda", async function () {
  it("Booking ticket for flight", async function () {
    await cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    await cy.visit("https://www.agoda.com");
    await cy.get("#tab-flight-tab").click();
    await cy.get("#flight-origin-search-input").type("Jakarta");
    await cy
      .xpath(`//li[@data-selenium="autosuggest-item"][contains(., 'Jakarta')]`)
      .click();

    await cy.get("#flight-destination-search-input").type("Singapore");
    await cy.xpath(`//li[@data-selenium="autosuggest-item"][1]`).click();
    await cy
      .xpath(
        `//div[contains(@class, "PriceSurgePicker-Day__circle--today")]/ancestor::div[@role="gridcell"]/following-sibling::div[1]`
      )
      .click();
    cy.get('[data-test="SearchButtonBox"]').click();
    await cy
      .xpath(`//button[.//span[contains(text(), "Show all")]]`, {
        timeout: 60000,
      })
      .should("be.visible")
      .click();
    await cy
      .xpath(
        '//label[@data-element-value="Malaysia Airlines"]//input[@type="checkbox"]'
      )
      .check({ force: true });

    await cy
      .xpath('//div[@data-testid="web-refresh-flights-card"]')
      .should("contain.text", "Malaysia Airlines");

    // save the departure time
    await cy
      .xpath("(//div[@data-testid='departure-time'])[1]//h3")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("departureTime");
      });

    // save the arrival time
    await cy
      .xpath("(//div[@data-testid='arrival-time'])[1]//h3")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("arrivalTime");
      });

    await cy
      .xpath(`(//div[@data-testid="flightCard-flight-detail"])[1]`)
      .click();

    await cy
      .xpath(`//button[@data-element-name="flight-detail-select-button"]`)
      .click();

    // input Konfirmasi kontak details
    await cy
      .get('[data-testid="contact.contactFirstName"]')
      .type("Indah Mutiah Utami");
    await cy.get('[data-testid="contact.contactLastName"]').type("MZ");
    await cy
      .get('[data-testid="contact.contactEmail"]')
      .type("indahmz@gmail.com");
    await cy
      .get('[data-element-name="contact-phone-number-input"]')
      .type("8123456789");

    // passnger details
    await cy
      .xpath(`//label[@data-testid="1"]//input[@type="radio"]`)
      .check({ force: true });
    await cy
      .xpath(
        `//input[@datatestid="flight.forms.i0.units.i0.passengerFirstName"]`
      )
      .type("Indah Mutiah Utami")
      .invoke("val")
      .as("firstName");

    await cy
      .xpath(
        `//input[@datatestid="flight.forms.i0.units.i0.passengerLastName"]`
      )
      .type("MZ")
      .invoke("val")
      .as("lastName");

    await cy
      .xpath(
        `//input[@datatestid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]`
      )
      .type("28");

    await cy.xpath('(//button[.//p[text()="Select"]])[1]').click();
    await cy
      .xpath('(//input[@name="dropdown-list-item"])[6]')
      .check({ force: true });

    await cy
      .xpath(
        `//input[@data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]`
      )
      .type("1998");

    await cy
      .get('[data-testid="flight.forms.i0.units.i0.passengerNationality"]')
      .find("button.ads-button-input")
      .should("be.visible")
      .click({ force: true });

    await cy
      .get(
        '.FormFieldstyled__SkeletonInputContainerStyled-sc-11x6xcu-3 input[type="text"]'
      )
      .type("Indonesia", { force: true });

    await cy
      .xpath(
        '(//input[@type="radio" and @name="dropdown-list-item"])[1]/ancestor::label'
      )
      .should("be.visible")
      .click({ force: true });

    // await cy
    //   .xpath(`//input[@data-testid="flight.forms.i0.units.i0.passportNumber"]`)
    //   .type("X12345678")
    //   .invoke("val")
    //   .as("passportNumber");

    // await cy
    //   .get('[data-testid="flight.forms.i0.units.i0.passportCountryOfIssue"]')
    //   .find("button.ads-button-input")
    //   .should("be.visible")
    //   .click({ force: true });
    // await cy
    //   .get(".SearchField__SearchFieldContainer-sc-1s2srj9-0")
    //   .type("Indonesia");
    // await cy
    //   .xpath(
    //     '(//input[@type="radio" and @name="dropdown-list-item"])[1]/ancestor::label'
    //   )
    //   .should("be.visible")
    //   .click({ force: true });
    // await cy
    //   .xpath(
    //     `//input[@data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]`
    //   )
    //   .type("28");
    // await cy
    //   .get(
    //     `[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]`
    //   )
    //   .click();
    // await cy
    //   .xpath('(//input[@name="dropdown-list-item"])[8]')
    //   .check({ force: true });
    // await cy
    //   .get(
    //     `[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]`
    //   )
    //   .type("2036");

    await cy
      .xpath(
        `//dd[@data-component="mob-flight-price-total-desc"]//span[@data-component="mob-price-desc-text"]`
      )
      .invoke("text")
      .then((text) => {
        const cleanPrice = text.replace(/[^\d]/g, "");
        cy.wrap(cleanPrice).as("expectedPrice");
      });
    cy.xpath('//button[@data-component="flight-continue-to-addOns-button"]')
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });

    cy.xpath(
      '//button[@data-component="flight-continue-to-addOns-button"]'
    ).should("not.exist");

    cy.xpath(`//div[@data-element-value="option-BASIC"]`).click();
    cy.xpath(`//div[@data-testid="radio-button-option-no"]`).click({
      force: true,
    });
    cy.get('[data-testid="continue-to-payment-button"]').click();

    cy.get('button[data-component="last-chance-decline-button"]').click();

    // expect the first name and last name to be the same as the input
    cy.get("@firstName").then((firstName) => {
      cy.get("@lastName").then((lastName) => {
        const fullName = `${firstName} ${lastName}`;

        // Ambil teks dari strong element
        cy.xpath(`//strong[@data-component="name-container-name"]`, {
          timeout: 30000,
        })
          .should("exist")
          .first()
          .invoke("text")
          .then((displayedName) => {
            expect(displayedName.trim()).to.eq(fullName);
          });
      });
    });
    // expect the price
    cy.get("@expectedPrice").then((expectedPrice) => {
      const expected = parseInt(expectedPrice, 10);
      cy.xpath(
        `//dd[@data-component="mob-flight-price-total-desc"]//span[@data-component="mob-price-desc-text"]`,
        {
          timeout: 30000,
        }
      )
        .invoke("text")
        .then((actualPriceText) => {
          const actual = parseInt(actualPriceText.replace(/[^\d]/g, ""), 10);
          expect(actual).to.eq(expected);
        });
    });

    // Ambil jam keberangkatan

    const expectedTimeRange = `${departureTime.trim()} - ${arrivalTime.trim()}`;

    // Ambil teks dari div yang ingin dibandingkan
    cy.xpath("//div[contains(@class, 'aec39-box') and contains(text(), ' - ')]")
      .invoke("text")
      .then((actualTimeRange) => {
        const cleanTime = actualTimeRange.replace(/\+\d+/, "").trim(); // hapus +1, +2, dll
        expect(cleanTime).to.eq(expectedTimeRange);
      });
  });
});
