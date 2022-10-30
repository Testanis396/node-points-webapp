# node-points-webapp-v1
Points web-service that adds transactions, spends points, and returns balances.
Server on localhost:(env.port or 8080).
Takes json input in body of request. 

Works with Given Examples:

/transactions
- POST { "payer": "DANNON", "points": 300, "timestamp": "2022-10-31T10:00:00Z" }
- POST { "payer": "UNILEVER", "points": 200, "timestamp": "2022-10-31T11:00:00Z" }
- POST { "payer": "DANNON", "points": -200, "timestamp": "2022-10-31T15:00:00Z" }
- POST { "payer": "MILLER COORS", "points": 10000, "timestamp": "2022-11-01T14:00:00Z" }
- POST { "payer": "DANNON", "points": 1000, "timestamp": "2022-11-02T14:00:00Z" }
  
/spend
- POST { "points": 5000 }

/balance
- GET 

To do: 
- re-configure /api/transaction url routes.
- try/catch err handling
- app.delete, app.patch
- allow multiple transactions per /transactions GET req
