import Agoda from "../support/pages/agoda";

describe("Test Agoda", async function () {
  beforeEach(function () {
    cy.fixture("passenger").as("passengerData");
  });
  it("Booking ticket for flight", async function () {
    cy.on("uncaught:exception", () => false);
    Agoda.visitHomePage();
    Agoda.selectFlightTab();
    Agoda.setOrigin("Jakarta");
    Agoda.setDestination("Singapore");
    Agoda.selectDepartureDate();
    Agoda.searchFlight();
    Agoda.filterByAirline("Malaysia Airlines");
    Agoda.saveDepartureTime();
    Agoda.saveArrivalTime();
    Agoda.selectFirstFlight();

    // Use fixture data for contact info
    Agoda.fillContactInfo({
      firstName: this.passengerData.firstName,
      lastName: this.passengerData.lastName,
      email: this.passengerData.email,
      phone: this.passengerData.phone,
    });

    // Use fixture data for passenger info
    Agoda.fillPassengerInfo({
      firstName: this.passengerData.firstName,
      lastName: this.passengerData.lastName,
      day: this.passengerData.dob.day,
      year: this.passengerData.dob.year,
      nationality: this.passengerData.nationality,
    });
    Agoda.fillPassportInfo({
      number: this.passengerData.passport.number,
      countryOfIssue: this.passengerData.passport.countryOfIssue,
      expiryDay: this.passengerData.passport.expiryDay,
      expiryMonthIndex: this.passengerData.passport.expiryMonthIndex,
      expiryYear: this.passengerData.passport.expiryYear,
    });

    Agoda.saveExpectedPrice();
    Agoda.continueToAddOns();
    Agoda.skipAddOns();

    // Assertions (optional, uncomment if you want to check)
    Agoda.assertNameMatches();
    Agoda.assertPriceMatches();
    Agoda.assertTimeMatches();
  });
});
