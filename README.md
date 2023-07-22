# BeGo API

_El proyecto consiste de una API con un CRUD para ordenes y rutas de transporte. A su vez permite listar puntos de origen y destino y flota de camiones_

## Construido con 🛠️

_Desarrollo en Javascript con las siguientes tecnologías: NodeJS, Express, MongoDB, Mongoose _

### Pre-requisitos 📋

_Se deberán instalar las siguientes dependecias: _

- [axios](https://www.npmjs.com/package/axios)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [bson](https://www.npmjs.com/package/bson)
- [cors](https://www.npmjs.com/package/cors)
- [express](https://www.npmjs.com/package/express)
- [express-oas-generatorv](https://www.npmjs.com/package/express-oas-generator)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [mongoose](https://www.npmjs.com/package/mongoose-to-swagger)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [ts-dotenv](https://www.npmjs.com/package/ts-dotenv)

### Instalación 🔧

- _Clonar repositorio: git clone https://github.com/Estanip/bego-challenge.git_
- _Acceder a la carpeta del proyecto_
- _Ejecutar `npm install`_
- _Crear archivo .env con para reemplazar las variables de entorno utilizadas para la configuración del servidor(API_PORT), DB(MONGO_URI), APIs(GOOGLE_API_KEY) y librerías(JWT_SECRET, JWT_EXPIRE)_
- _Ejecutar `npm run dev` para correr en modo desarrollo (URL de la api en modo desarrollo: http://localhost:API_PORT/)_

## Endpoints

_auth_

- POST localhost:API_PORT/auth/register
- POST localhost:API_PORT/auth/login

_points_

- GET localhost:API_PORT/points
- GET localhost:API_PORT/points/coordinates/:placeId

_trucks_

- GET localhost:API_PORT/trucks

_orders_

- POST localhost:API_PORT/orders
- PUT localhost:API_PORT/orders/:id
- PUT localhost:API_PORT/orders/:id/status/:status
- DELETE localhost:API_PORT/orders/:id

_routes_

- POST localhost:API_PORT/routes
- GET localhost:API_PORT/routes/:id
- PUT localhost:API_PORT/routes/:id
- DELETE localhost:API_PORT/routes/:id

## Docs 📄 ()

- GET localhost:API_PORT/api-docs

- IMPORTANTE: _Para autogenerar la plantilla de Swagger UI deberás antes correr los endpoints._
- Archivo de configuración: _/utils/swagger.ts_

## Autor ✒️

- **Estani Pettigrew** - [Estanip](https://github.com/Estanip)
