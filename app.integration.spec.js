const request = require("supertest");

const app = require("./index");
const agent = request.agent(app);

describe("app", () => {
  describe("When authenticated", () => {
    beforeEach(async () => {
      await agent
        .post("/login")
        .send("username=randombrandon&password=randompassword");
    });
    describe("POST /messages", () => {
      describe("with non-empty content", () => {
        describe("with JavaScript code in personnalWebsiteURL", () => {
          it("responds with error", async () => {
            await agent
              .post("/messages")
              .send({
                content: "hey",
                personalWebsiteURL: "javascript:alert('hack tentative');",
              })
              .expect(400);
          });
        });
        describe("with HTTP URL in personnalWebsiteURL", () => {
          it("responds with success", async () => {
            let data = {
              content: "hey",
              personalWebsiteURL: "https://jeuxvideo.com",
            };
            await agent
              .post("/messages")
              .send({
                content: "hey",
                personalWebsiteURL: "https://jeuxvideo.com",
              })
              .expect(201);
          });
        });
      });
    });
  });
});
