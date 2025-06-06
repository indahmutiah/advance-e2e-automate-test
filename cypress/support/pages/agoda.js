class Agoda {
  visitHomePage() {
    cy.visit("https://www.agoda.com");
  }
  selectFlightTab() {
    cy.get("#tab-flight-tab").click();
  }

  setOrigin(city) {
    cy.get("#flight-origin-search-input").type(city);
    cy.xpath(
      `//li[@data-selenium="autosuggest-item"][contains(., '${city}')]`
    ).click();
  }
  setDestination(city) {
    cy.get("#flight-destination-search-input").type(city);
    cy.xpath(`//li[@data-selenium="autosuggest-item"][1]`).click();
  }

  selectDepartureDate() {
    cy.xpath(
      `//div[contains(@class, "PriceSurgePicker-Day__circle--today")]/ancestor::div[@role="gridcell"]/following-sibling::div[1]`
    ).click();
  }

  searchFlight() {
    cy.get('[data-test="SearchButtonBox"]').click();
  }

  filterByAirline(airline) {
    cy.xpath(`//button[.//span[contains(text(), "Show all")]]`, {
      timeout: 60000,
    }).click();
    cy.xpath(
      `//label[@data-element-value="${airline}"]//input[@type="checkbox"]`
    ).check({ force: true });
  }

  assertFlightCardContains(text) {
    cy.xpath('//div[@data-testid="web-refresh-flights-card"]').should(
      "contain.text",
      text
    );
  }

  saveDepartureTime() {
    cy.xpath("(//div[@data-testid='departure-time'])[1]//h3")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("departureTime");
      });
  }

  saveArrivalTime() {
    cy.xpath("(//div[@data-testid='arrival-time'])[1]//h3")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("arrivalTime");
      });
  }

  selectFirstFlight() {
    cy.xpath(`(//div[@data-testid="flightCard-flight-detail"])[1]`).click();
    cy.xpath(
      `//button[@data-element-name="flight-detail-select-button"]`
    ).click();
  }

  fillContactInfo({ firstName, lastName, email, phone }) {
    cy.get('[data-testid="contact.contactFirstName"]').type(firstName);
    cy.get('[data-testid="contact.contactLastName"]').type(lastName);
    cy.get('[data-testid="contact.contactEmail"]').type(email);
    cy.get('[data-element-name="contact-phone-number-input"]').type(phone);
  }
  fillPassengerInfo({ firstName, lastName, day, year, nationality }) {
    cy.xpath(`//label[@data-testid="1"]//input[@type="radio"]`).check({
      force: true,
    });
    cy.xpath(
      `//input[@datatestid="flight.forms.i0.units.i0.passengerFirstName"]`
    )
      .type(firstName)
      .invoke("val")
      .as("firstName");

    cy.xpath(
      `//input[@datatestid="flight.forms.i0.units.i0.passengerLastName"]`
    )
      .type(lastName)
      .invoke("val")
      .as("lastName");

    cy.xpath(
      `//input[@datatestid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]`
    ).type(day);

    cy.xpath('(//button[.//p[text()="Select"]])[1]').click();
    cy.xpath('(//input[@name="dropdown-list-item"])[6]').check({ force: true });

    cy.xpath(
      `//input[@data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]`
    ).type(year);

    cy.get(
      '[data-testid="flight.forms.i0.units.i0.passengerNationality"] button'
    ).click({ force: true });
    cy.get(
      '.FormFieldstyled__SkeletonInputContainerStyled-sc-11x6xcu-3 input[type="text"]'
    ).type(nationality, { force: true });

    cy.xpath(
      '(//input[@type="radio" and @name="dropdown-list-item"])[1]/ancestor::label'
    ).click({ force: true });
  }
  fillPassportInfo({
    number,
    countryOfIssue,
    expiryDay,
    expiryMonthIndex,
    expiryYear,
  }) {
    cy.xpath(`//input[@data-testid="flight.forms.i0.units.i0.passportNumber"]`)
      .type(number)
      .invoke("val")
      .as("passportNumber");

    cy.get('[data-testid="flight.forms.i0.units.i0.passportCountryOfIssue"]')
      .find("button.ads-button-input")
      .should("be.visible")
      .click({ force: true });

    cy.get(".SearchField__SearchFieldContainer-sc-1s2srj9-0").type(
      countryOfIssue
    );

    cy.xpath(
      '(//input[@type="radio" and @name="dropdown-list-item"])[1]/ancestor::label'
    )
      .should("be.visible")
      .click({ force: true });

    cy.xpath(
      `//input[@data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]`
    ).type(expiryDay);

    cy.get(
      `[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]`
    ).click();

    cy.xpath(
      `(//input[@name="dropdown-list-item"])[${expiryMonthIndex}]`
    ).check({ force: true });

    cy.get(
      `[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]`
    ).type(expiryYear);
  }

  saveExpectedPrice() {
    cy.xpath(`//dd[@data-component="mob-flight-price-total-desc"]//span`)
      .invoke("text")
      .then((text) => cy.wrap(text.replace(/[^\d]/g, "")).as("expectedPrice"));
  }

  continueToAddOns() {
    cy.xpath('//button[@data-component="flight-continue-to-addOns-button"]')
      .scrollIntoView()
      .click({ force: true });
    cy.xpath(
      '//button[@data-component="flight-continue-to-addOns-button"]'
    ).should("not.exist");
  }

  skipAddOns() {
    cy.xpath(`//div[@data-element-value="option-BASIC"]`).click();
    cy.xpath(`//div[@data-testid="radio-button-option-no"]`).click({
      force: true,
    });
    cy.get('[data-testid="continue-to-payment-button"]').click();
    cy.get('button[data-component="last-chance-decline-button"]').click();
  }

  assertNameMatches() {
    cy.get("@firstName").then((first) => {
      cy.get("@lastName").then((last) => {
        const fullName = `${first} ${last}`;
        cy.xpath(`//strong[@data-component="name-container-name"]`, {
          timeout: 60000,
        })
          .first()
          .invoke("text")
          .should((name) => {
            expect(name.trim()).to.eq(fullName);
          });
      });
    });
  }

  assertPriceMatches() {
    cy.get("@expectedPrice").then((expectedPrice) => {
      cy.xpath(`//dd[@data-component="mob-flight-price-total-desc"]//span`)
        .invoke("text")
        .then((text) => {
          const actual = parseInt(text.replace(/[^\d]/g, ""), 10);
          expect(actual).to.eq(parseInt(expectedPrice, 10));
        });
    });
  }

  assertTimeMatches() {
    cy.get("@departureTime").then((departure) => {
      cy.get("@arrivalTime").then((arrival) => {
        cy.get("body").then(($body) => {
          if (
            $body.find('div.aec39-box.aec39-fill-inherit:contains(" - ")')
              .length > 0
          ) {
            cy.get("div.aec39-box.aec39-fill-inherit")
              .contains(" - ")
              .invoke("text")
              .then((actualTime) => {
                expect(actualTime.replace(/\+\d+/, "").trim()).to.eq(
                  `${departure} - ${arrival}`
                );
              });
          } else {
            cy.contains(departure.trim()).should("exist");
            cy.contains(arrival.trim()).should("exist");
          }
        });
      });
    });
  }
}

export default new Agoda();
