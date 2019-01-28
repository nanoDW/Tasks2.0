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
    it("should add user to the db and get it", async () => {
      await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");
      const res = await request(server).get("/api/users/hidden");
      expect(res.status).toBe(200);
      expect(res.body.users[0]).toHaveProperty("nick");
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
    it("should throw validation error: nick length is too short", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "1",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe('"nick" length must be at least 3 characters long');
    });
  });

  describe("POST /api/users", () => {
    it("should throw validation error: nick length is too long", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1person1person1person1",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe(
        '"nick" length must be less than or equal to 25 characters long'
      );
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
    it("should throw validation error: password is too short", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "p",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe(
        '"password" length must be at least 8 characters long'
      );
    });
  });

  describe("POST /api/users", () => {
    it("should throw validation error: password is too long", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "veryverystrongpasswordorverylongidontcare",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe(
        '"password" length must be less than or equal to 30 characters long'
      );
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
    it("should throw validation error: too short email", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "email"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe(
        '"email" length must be at least 8 characters long'
      );
    });
  });

  describe("POST /api/users", () => {
    it("should throw validation error: not valid email", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "emailemail"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe('"email" must be a valid email');
    });
  });

  describe("POST /api/users", () => {
    it("should throw validation error: not valid email", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "emailemail@email"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.text).toBe('"email" must be a valid email');
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
      const { header } = await request(server)
        .post("/api/users")
        .send({
          nick: "person1",
          password: "strong_password",
          email: "person1@gmail.com"
        })
        .set("Accept", "application/json");
      console.log(JSON.parse(header));
      const res = await request(server)
        .get("/api/users")
        .set("xAuthToken", header("xAuthToken"));

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
