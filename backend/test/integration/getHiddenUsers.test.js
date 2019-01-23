const request = require("supertest");
const { User } = require("../../models/schemas");
let server;

describe("getHiddenUsers", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async () => {
    server.close();
    await User.remove({});
  });

  describe("GET /api/users/hidden", () => {
    it("shoud return all users", async () => {
      User.collection.insertMany([
        {
          nick: "person1",
          password: "strong_password",
          email: "person1@gmail.com",
          hidden: false
        },
        {
          nick: "person2",
          password: "strong_password",
          email: "person2@gmail.com",
          hidden: true
        },
        {
          nick: "person3",
          password: "strong_password",
          email: "person3@gmail.com",
          hidden: false
        },
        {
          nick: "person4",
          password: "strong_password",
          email: "person4@gmail.com",
          hidden: true
        },
        {
          nick: "person5",
          password: "strong_password",
          email: "person5@gmail.com",
          hidden: false
        },
        {
          nick: "person6",
          password: "strong_password",
          email: "person6@gmail.com",
          hidden: true
        },
        {
          nick: "person7",
          password: "strong_password",
          email: "person7@gmail.com",
          hidden: true
        },
        {
          nick: "person8",
          password: "strong_password",
          email: "person8@gmail.com",
          hidden: false
        }
      ]);
      const res = await request(server).get("/api/users/hidden");
      expect(res.status).toBe(200);
      expect(res.body.users.length).toBe(8);
      res.body.users.map(user => {
        expect(user).toHaveProperty("nick");
        expect(user).toHaveProperty("_id");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("last");
        expect(user).toHaveProperty("accountCreated");
        expect(user).toHaveProperty("hidden");
      });
    });
  });
});
