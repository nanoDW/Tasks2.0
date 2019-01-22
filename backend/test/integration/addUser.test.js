const request = require("supertest");
let server;

describe("getUsers", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("shoud return all users", async () => {
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(200);
    });
  });
});
