# node-points-webapp-v2
Points web-service that adds transactions, spends points, and returns balances.
Server on localhost:(env.port or 8080).
Takes json input in body of request. 
Uses server.js for production and app.test.js for tests {jest, supertest}
user % npm start 
user % npm test 

Operations:
- POST /api => creates account
- GET /api/transactions => returns list of all transactions
- POST /api/transactions => add transaction { "payer": string, "points": integer, "timestamp": yyyy-mm-ddThh:mm:ssZ } returns id
- GET /api/transactions/points => returns total balances { "payer": string, "points": integer }
- POST /api/transactions/points => spend points{ "points": integer }, returns list of points spent { "payer": string, "points": integer }
- GET /api/transactions/:id => returns transaction with id == :id 

Works with Given Examples:

/api/transactions
- POST { "payer": "DANNON", "points": 300, "timestamp": "2022-10-31T10:00:00Z" }
- POST { "payer": "UNILEVER", "points": 200, "timestamp": "2022-10-31T11:00:00Z" }
- POST { "payer": "DANNON", "points": -200, "timestamp": "2022-10-31T15:00:00Z" }
- POST { "payer": "MILLER COORS", "points": 10000, "timestamp": "2022-11-01T14:00:00Z" }
- POST { "payer": "DANNON", "points": 1000, "timestamp": "2022-11-02T14:00:00Z" }
  
/api/transactions/points
- POST { "points": 5000 }
- GET 

To do: 
- continue tests
- app.delete, app.patch

% npm test

 PASS  ./app.test.js
  POST /api
    ✓ create account (14 ms)
  POST /api/transactions
    given payer, points, and timestamp
      ✓ respond with status 201 (12 ms)
      ✓ json in content type header (3 ms)
      ✓ response has id (3 ms)
    missing payer, points, and timestamp
      ✓ respond with status 400 (24 ms)
  GET /api/transactions
    ✓ respond with status 200 (3 ms)
    ✓ json in content type header (2 ms)
    ✓ respond with transactions (2 ms)
  GET /api/transactions/points
    ✓ respond with status 200 (1 ms)
    ✓ json in content type header (3 ms)
    ✓ respond with balance (3 ms)
  POST /api/transactions/points
    ✓ respond with status 200 (10 ms)
    ✓ json in content type header (13 ms)
    ✓ respond with new negative transactions (10 ms)
  GET /api/transactions/:id
    given correct id
      ✓ respond with status 200 (6 ms)
      ✓ json in content type header (8 ms)
      ✓ respond with transactons/:id (7 ms)
    given incorrect id
      ✓ respond with status 404 (14 ms)

Test Suites: 1 passed, 1 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        0.396 s, estimated 1 s
