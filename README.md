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

```
 PASS  ./app.test.js
  POST /api
    ✓ create account (20 ms)
  POST /api/transactions
    given payer, points, and timestamp
      ✓ respond with status 201 (15 ms)
      ✓ json in content type header (3 ms)
      ✓ response has id (2 ms)
    missing payer, points, and timestamp
      ✓ respond with status 400 (19 ms)
  GET /api/transactions
    ✓ respond with status 200 (2 ms)
    ✓ json in content type header (3 ms)
    ✓ respond with transactions (2 ms)
  GET /api/transactions/points
    ✓ respond with status 200 (3 ms)
    ✓ json in content type header (2 ms)
    ✓ respond with balance (1 ms)
  POST /api/transactions/points
    ✓ respond with status 200 (12 ms)
    ✓ json in content type header (12 ms)
    ✓ respond with new negative transactions (12 ms)
  GET /api/transactions/:id
    given correct id
      ✓ respond with status 200 (9 ms)
      ✓ json in content type header (17 ms)
      ✓ respond with transactions/:id (20 ms)
    given incorrect id
      ✓ respond with status 404 (15 ms)
  Given Examples
    ✓ respond with status 200 (3 ms)

Test Suites: 1 passed, 1 total
Tests:       19 passed, 19 total
Snapshots:   0 total
Time:        0.713 s, estimated 1 s
Ran all test suites.
```