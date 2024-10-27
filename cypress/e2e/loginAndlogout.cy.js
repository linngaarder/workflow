describe("Login validation", () => {
  beforeEach(() => {
    cy.visit("/index.html");
    cy.wait(1000);
    cy.get("#registerForm > div.modal-header > button").click();
    cy.get("button[data-bs-target='#loginModal']").should("exist");
    cy.get("input[type='email']:visible").should("exist");
    cy.get("input[type='password']:visible").should("exist");
    cy.get('button[type="submit"]:visible').should("exist");
  });

  it("should show message if login is invalid", () => {
    cy.get("button[data-bs-target='#loginModal']:visible").first().click();
    cy.wait(1000);
    cy.get("input[id='loginEmail']").type("test89@example.no");
    cy.get("input[id='loginPassword']").type("testtest1234");

    cy.get('form#loginForm button[type="submit"]').click();
    cy.wait(1000);
    cy.on("window:alert", (text) => {
      expect(text).to.contain(
        "Please match the requested format. Only Noroff student or teacher emails are valid.",
      );
    });
  });

  it("should log in user and access dashboard", () => {
    cy.get("button[data-bs-target='#loginModal']:visible").first().click();
    cy.wait(1000);
    cy.get("input[id='loginEmail']").type("test89@stud.noroff.no");
    cy.get("input[id='loginPassword']").type("testtest1234");

    cy.get('form#loginForm button[type="submit"]').click();

    cy.url().should("include", "/index.html");
  });

  it("should log out user", () => {
    cy.get("button[data-bs-target='#loginModal']:visible").first().click();
    cy.wait(1000);
    cy.get("input[id='loginEmail']").type("test89@stud.noroff.no");
    cy.get("input[id='loginPassword']").type("testtest1234");

    cy.get('form#loginForm button[type="submit"]').click();

    cy.url().should("include", "/index.html");

    cy.get(`header [data-auth="logout"]`).contains("Logout").click();
  });
});
