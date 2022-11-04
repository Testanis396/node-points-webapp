const request = require("supertest");
const app = require("./app");

describe("POST /api", () => {
    test("create account", async () => {
        const response = await request(app).post("/api").send({
        })
        expect(response.statusCode).toBe(200);
    }) 

    describe("POST /api/transactions", () => {

        describe("given payer, points, and timestamp", () => {
            //add to database, 
            //return json id, 
            test("respond with status 200", async () => {
                const response = await request(app).post("/api/transactions").send({
                    payer: "Apple",
                    points: 500,
                    timestamp: "2022-11-02T15:00:00Z"
                })
                expect(response.statusCode).toBe(200);
            }) 
            test("json in content type header", async () => {
                const response = await request(app).post("/api/transactions").send({
                    payer: "Apple",
                    points: 500,
                    timestamp: "2022-11-02T15:00:00Z"
                })
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            })
            test("response has id", async () => {
                const response = await request(app).post("/api/transactions").send({
                    payer: "Apple",
                    points: 500,
                    timestamp: "2022-11-02T15:00:00Z"
                })
                expect(response.body.id).toBeDefined()
            })
        })

        describe("missing payer, points, and timestamp", () => {
            test("respond with status 400", async () => {
                const response = await request(app).post("/api/transactions").send({
                    payer: "Apple",
                    timestamp: "2022-11-02T15:00:00Z"
                })
                expect(response.statusCode).toBe(400);
            }) 
        })
        
    })
})