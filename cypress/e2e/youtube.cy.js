describe("Test Youtube", function () {
  it("Get Video Trending", function () {
    cy.on("uncaught:exception", () => false);

    // Step 1: Buka YouTube dan masuk ke Trending
    cy.visit("https://www.youtube.com/");
    cy.wait(3000);

    cy.get('a#endpoint[title="Trending"]').should("be.visible").click();
    cy.url().should("include", "/feed/trending");
    cy.contains("Trending").should("be.visible");

    // Step 2: Klik tab Movies
    cy.contains("yt-tab-shape", "Movies").should("be.visible").click();
    cy.wait(3000); // tunggu konten tab ter-load

    // Step 3: Ambil judul dan nama channel dari video ke-3
    cy.get("ytd-video-renderer")
      .eq(2) // index ke-2 = video ke-3
      .as("thirdVideo");

    cy.get("@thirdVideo")
      .find("#video-title")
      .invoke("text")
      .as("expectedTitle");
    cy.get("@thirdVideo")
      .find("ytd-channel-name #text")
      .first() // hanya ambil elemen pertama
      .invoke("text")
      .as("expectedChannel");

    // Step 4: Klik video ke-3
    cy.get("@thirdVideo").find("a#thumbnail").click();

    // Step 5: Verifikasi bahwa judul dan channel sesuai
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
  });
});
