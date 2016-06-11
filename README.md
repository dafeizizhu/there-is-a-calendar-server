# About Mongodb

1. set mongodb without auth
2. use `init-db` to add users to database: `./init-db <username> <pwd> <host> <port>`
3. export a env variable: `export YOUGERILI_MONGODB_CONN_STR='mongodb://<username>:<pwd>@<host>:<port>/yougerili`
4. restart mongodb with auth
5. use `fixture` to fill some origin data to  database: `node fixture`
