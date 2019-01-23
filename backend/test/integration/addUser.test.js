const request = require("supertest");
const { User } = require("../../models/schemas");
let server;

describe("addUsers", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async done => {
    server.close();
    await User.remove({});
    done();
  });

  describe("POST /api/users", () => {
    it("shoud return data about user", async done => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(200);
      done();
    });
  });
});
