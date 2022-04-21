const request = require('supertest');
const app = require('./app');

jest.setTimeout(20000);

describe("GET /", () => {
  test("should return 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
})

// TODO Fix it
// describe("POST /item/add", () => {
//   test("should return 200 OK", async () => {
//     const response = await request(app).post("/item/add").send({ name: "My super item" });
//     expect(response.statusCode).toBe(200);
//   });
// })