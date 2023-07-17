# BeGo API

_El proyecto consiste de una API con un CRUD para ordenes y rutas de transporte. A su vez permite listar puntos de origen y destino y flota de camiones_

## Construido con 🛠️
_Desarrollo en Javascript con las siguientes tecnologías: NodeJS, Express, MongoDB, Mongoose _

### Pre-requisitos 📋
_Se deberán instalar las siguientes dependecias: _

- [axios](https://www.npmjs.com/package/axios)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jwt](https://www.npmjs.com/package/jsonwebtoken)

### Instalación 🔧
* _Clonar repositorio: git clone https://github.com/Estanip/bego-challenge.git_
* _Acceder a la carpeta del proyecto_
* _Ejecutar ``npm install``_
* _Crear archivo .env con para reemplazar las variables de entorno utilizadas para la configuración del servidor(API_PORT), DB(MONGO_URI), APIs(GOOGLE_API_KEY) y librerías(JWT_SECRET, JWT_EXPIRE)_
* _Ejecutar ``npm run dev`` para correr en modo desarrollo (URL de la api en modo desarrollo: http://localhost:API_PORT/)_

## Endpoints
_auth_
* POST localhost:API_PORT/auth/register
* POST localhost:API_PORT/auth/login

_points_
* GET localhost:API_PORT/points
* GET localhost:API_PORT/points/coordinates/:placeId

_trucks_
* GET localhost:API_PORT/trucks

_orders_
* POST localhost:API_PORT/orders
* PUT localhost:API_PORT/orders/:id
* PUT localhost:API_PORT/orders/:id/status/:status
* DELETE localhost:API_PORT/orders/:id

_routes_
* POST localhost:API_PORT/routes
* GET localhost:API_PORT/routes/:id
* PUT localhost:API_PORT/routes/:id
* DELETE localhost:API_PORT/routes/:id

## Autor ✒️
* **Estani Pettigrew** - [Estanip](https://github.com/Estanip)
