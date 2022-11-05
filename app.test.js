const request = require("supertest");
const app = require("./app");

describe("POST /api", () => {
    test("create account", async () => {
        const response = await request(app).post("/api").send();
        expect(response.statusCode).toBe(200);
    })
})
describe("POST /api/transactions", () => {

    describe("given payer, points, and timestamp", () => {
        //add to database, 
        //return json id, 
        const newT = {
            payer: "DANNON",
            points: 300,
            timestamp: "2022-10-31T10:00:00Z"
        }
        test("respond with status 201", async () => {
            const response = await request(app).post("/api/transactions").send(newT);
            expect(response.statusCode).toBe(201);
        })
        test("json in content type header", async () => {
            const response = await request(app).post("/api/transactions").send(newT);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
        test("response has id", async () => {
            const response = await request(app).post("/api/transactions").send(newT);
            expect(response.body.id).toBeDefined();
        })
    })

    describe("missing payer, points, and timestamp", () => {
        test("respond with status 400", async () => {
            const bodyData = [
                {},
                { payer: "APPLE" },
                { points: 500 },
                { timestamp: "2022-11-02T15:00:00Z" },
                { payer: "APPLE", points: 500 },
                { payer: "APPLE", timestamp: "2022-11-02T15:00:00Z" },
                { points: 500, timestamp: "2022-11-02T15:00:00Z" }
            ]
            for (const body of bodyData) {
                const response = await request(app).post("/api/transactions").send(body);
                expect(response.statusCode).toBe(400);
            }
        })
    })
})

describe("GET /api/transactions", () => {
    const newT = {
        payer: "DANNON",
        points: 300,
        timestamp: "2022-10-31T10:00:00Z"
    }
    beforeAll(async () => {
        await request(app).post("/api/transactions").send(newT);
    })
    afterAll(async () => {
        await request(app).post("/api").send();
    })
    test("respond with status 200", async () => {
        const response = await request(app).get("/api/transactions");
        expect(response.statusCode).toBe(200);
    })
    test("json in content type header", async () => {
        const response = await request(app).get("/api/transactions");
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    })
    test("respond with transactions", async () => {
        const response = await request(app).get("/api/transactions");
        expect(response.body.length > 0).toBe(true);
    })
})

describe("GET /api/transactions/points", () => {
    const bodyData = [
        { payer: "DANNON", points: 300, timestamp: "2022-10-31T10:00:00Z" },
        { payer: "UNILEVER", points: 200, timestamp: "2022-10-31T11:00:00Z" },
        { payer: "DANNON", points: -200, timestamp: "2022-10-31T15:00:00Z" },
        { payer: "MILLER COORS", points: 10000, timestamp: "2022-11-01T14:00:00Z" },
        { payer: "DANNON", points: 1000, timestamp: "2022-11-02T14:00:00Z" }
    ]
    beforeAll(async () => {
        for (const body of bodyData) {
            const response = await request(app).post("/api/transactions").send(body);
        }
    })
    afterAll(async () => {
        await request(app).post("/api").send();
    })
    test("respond with status 200", async () => {
        const response = await request(app).get("/api/transactions/points");
        expect(response.statusCode).toBe(200);
    })
    test("json in content type header", async () => {
        const response = await request(app).get("/api/transactions/points");
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    })
    test("respond with balance", async () => {
        const response = await request(app).get("/api/transactions/points");
        expect(response.body.length == 3).toBe(true);
    })
})

describe("POST /api/transactions/points", () => {
    const bodyData = [
        { payer: "DANNON", points: 300, timestamp: "2022-10-31T10:00:00Z" },
        { payer: "UNILEVER", points: 200, timestamp: "2022-10-31T11:00:00Z" },
        { payer: "DANNON", points: -200, timestamp: "2022-10-31T15:00:00Z" },
        { payer: "MILLER COORS", points: 10000, timestamp: "2022-11-01T14:00:00Z" },
        { payer: "DANNON", points: 1000, timestamp: "2022-11-02T14:00:00Z" }
    ]
    const body = { points: 5000 };

    beforeEach(async () => {
        for (const body of bodyData) {
            const response = await request(app).post("/api/transactions").send(body);
        }
    })
    afterEach(async () => {
        await request(app).post("/api").send();
    })
    test("respond with status 200", async () => {
        const response = await request(app).post("/api/transactions/points").send(body);
        expect(response.statusCode).toBe(200);
    })
    test("json in content type header", async () => {
        const response = await request(app).post("/api/transactions/points").send(body);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    })
    test("respond with new negative transactions", async () => {
        const response = await request(app).post("/api/transactions/points").send(body);
        expect(response.body.length == 3).toBe(true);
    })
})

describe("GET /api/transactions/:id", () => {
    describe("given correct id", () => {
        const bodyData = [
            { payer: "DANNON", points: 300, timestamp: "2022-10-31T10:00:00Z" },
            { payer: "UNILEVER", points: 200, timestamp: "2022-10-31T11:00:00Z" },
            { payer: "DANNON", points: -200, timestamp: "2022-10-31T15:00:00Z" },
            { payer: "MILLER COORS", points: 10000, timestamp: "2022-11-01T14:00:00Z" },
            { payer: "DANNON", points: 1000, timestamp: "2022-11-02T14:00:00Z" }
        ]
        beforeAll(async () => {
            for (const body of bodyData) {
                const response = await request(app).post("/api/transactions").send(body);
            }
        })
        afterAll(async () => {
            await request(app).post("/api").send();
        })
        test("respond with status 200", async () => {
            for (let id = 1; id <= 5; id++) {
                const response = await request(app).get(`/api/transactions/${id}`);
                expect(response.statusCode).toBe(200);
            }
        })
        test("json in content type header", async () => {
            for (let id = 1; id <= 5; id++) {
                const response = await request(app).get(`/api/transactions/${id}`);
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
            }
        })
        test("respond with transactions/:id", async () => {
            for (let id = 1; id <= 5; id++) {
                const response = await request(app).get(`/api/transactions/${id}`);
                expect(response.body.id == id).toBe(true);
            }
        })
    })

    describe("given incorrect id", () => {
        const bodyData = [
            { payer: "DANNON", points: 300, timestamp: "2022-10-31T10:00:00Z" },
            { payer: "UNILEVER", points: 200, timestamp: "2022-10-31T11:00:00Z" },
            { payer: "DANNON", points: -200, timestamp: "2022-10-31T15:00:00Z" },
            { payer: "MILLER COORS", points: 10000, timestamp: "2022-11-01T14:00:00Z" },
            { payer: "DANNON", points: 1000, timestamp: "2022-11-02T14:00:00Z" }
        ]
        beforeAll(async () => {
            for (const body of bodyData) {
                const response = await request(app).post("/api/transactions").send(body);
            }
        })
        afterAll(async () => {
            await request(app).post("/api").send();
        })
        test("respond with status 404", async () => {
            for (let id = -5; id <= 10; id++) {
                if (id == 1)  id = 6;
                const response = await request(app).get(`/api/transactions/${id}`);
                expect(response.statusCode).toBe(404);
            }
        })
    })
})

