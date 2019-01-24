const request = require("supertest");
const { User } = require("../../models/schemas");
let server;

describe("all users routes", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async done => {
    await server.close();
    await User.deleteMany({}, () => {
      done();
    });
  });

  describe("POST /api/users", () => {
    it("should add user to the db", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /api/users", () => {
    it("should throw validation error: nick is required", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe('"nick" is not allowed to be empty');
    });
  });

  describe("POST /api/users", () => {
    it("should throw validation error: password is required", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe('"password" is not allowed to be empty');
    });
  });

  describe("POST /api/users", () => {
    it("should throw validation error: email is required", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: ""
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe('"email" is not allowed to be empty');
    });
  });

  describe("POST /api/users", () => {
    it("should throw 404 error", async () => {
      await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");

      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(404);
      expect(res.text).toBe("User already exist.");
    });
  });

  describe("GET /api/users", () => {
    it("shoud return not hidden users", async () => {
      await User.collection.insertMany([
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
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(4);
      res.body.data.map(user => {
        expect(user).toHaveProperty("nick");
        expect(user).toHaveProperty("_id");
        expect(user).toHaveProperty("last");
      });
    });
  });

  describe("GET /api/users/hidden", () => {
    it("shoud return all users", async () => {
      await User.collection.insertMany([
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
