deploy :

1. install depedency `npm i`

auth key :

1. run `node console/keyGenerate.js`

migration :

1.
2. delete all file inside `/prisma/migration`
3. set `DATABASE_URL` inside .env.developtment with template `mysql://[username]:[password]@[host:port]/[db_name]`
4. run migration with `npx prisma migrate dev`
5. seed data with `node ./prisma/seed.js`
6. run dev with : `npm run devs`
