# node-points-webapp-v1
Points web-service that adds transactions, spends points, and returns balances.
Server on localhost:(env.port or 8080).
Takes json input in body of request. 

Operations:
- GET /api => creates account
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
- app.delete, app.patch
