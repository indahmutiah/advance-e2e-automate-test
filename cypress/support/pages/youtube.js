class Youtube {
  visitHomePage() {
    cy.visit("https://www.youtube.com/");
  }
  clickTrendingTab() {
    cy.get('a#endpoint[title="Trending"]').should("be.visible").click();
    cy.url().should("include", "/feed/trending");
    cy.contains("Trending").should("be.visible");
  }
  clickMoviesTab() {
    cy.contains("yt-tab-shape", "Movies").should("be.visible").click();
    cy.wait(3000);
  }
  saveVideoTitle(index) {
    cy.get("ytd-video-renderer").eq(index).as("thirdVideo");

    cy.get("@thirdVideo")
      .find("#video-title")
      .invoke("text")
      .as("expectedTitle");
  }
  saveVideoChannel() {
    cy.get("@thirdVideo")
      .find("ytd-channel-name #text")
      .first()
      .invoke("text")
      .as("expectedChannel");
  }
  clickVideo() {
    cy.get("@thirdVideo").find("a#thumbnail").click();
  }
  assertVideoTitle() {
    cy.get("@expectedTitle").then((expectedTitle) => {
      cy.xpath("//div[@id='title']//h1//yt-formatted-string")
        .should("be.visible")
        .invoke("text")
        .then((actualTitle) => {
          const cleanActualTitle = actualTitle
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .replace(/&nbsp;/g, " ")
            .trim();

          const cleanExpectedTitle = expectedTitle
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .replace(/&nbsp;/g, " ")
            .trim();

          expect(cleanActualTitle).to.eq(cleanExpectedTitle);
        });
    });
  }
  assertVideoChannel(index) {
    cy.get("@expectedChannel").then((expectedChannel) => {
      cy.xpath(`//ytd-video-owner-renderer//yt-formatted-string[@id='text']`)
        .should("be.visible")
        .invoke("text")
        .then((actualChannel) => {
          const cleanActualChannel = actualChannel
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .trim();

          const cleanExpectedChannel = expectedChannel
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .trim();

          expect(cleanActualChannel).to.eq(cleanExpectedChannel);
        });
    });
  }
}
export default new Youtube();
