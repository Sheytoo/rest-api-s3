# REST API (Node.js & Express.js)

API for semester 3 web project in IUT of Belfort-Montbéliard.

## Requirements

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Google API access](https://console.cloud.google.com/apis/)
- [Facebook API access](https://developers.facebook.com/)
- [Postman](https://www.postman.com/) (Optional)

## Install

```bash
git clone https://github.com/Sheytoo/rest-api-s3
cd rest-api-s3
npm install
```

## Database MySQL
_You can find all table creations and inserts in the file [companydb.sql](companydb.sql)._

```bash
mysql [-h localhost] -u <user> -p<password>
source companydb.sql
```

## Configure app

Create and open `.env` file in the project directory then edit it with your settings. Use this template:

```properties
APP_PORT=3000

DB_HOSTNAME=localhost
DB_PORT=3306
DB_DATABASE=companydb
DB_USER=root
DB_PASSWD=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
```

## Running the project

```bash
npm start
```

## Auth & Session
To logout from session after login or register to access to the swagger
documentation, you have to use this URL path: `/api-docs/logout`.

## Documentation (Swagger)
The documentation can be find directly in the API using `/api-docs` URL path.
If you want to directly test requests with Swagger and you don't use `localhost`
or the default port (3000), you have to change this following line in file
[openapi.json](openapi.json).

```json
"servers": [
  {
    "url": "http://localhost:3000/api"
  }
],
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more informations.
