const { should } = require("chai");

describe("Test agoda", async function () {
  it("Booking ticket for flight", async function () {
    await cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    await cy.visit("https://www.youtube.com/");
  });
});
