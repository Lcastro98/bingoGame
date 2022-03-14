# Bingo Game 
                                 
La empresa **El Gran Buda**, una casa de juegos de apuestas y azar, requiere desarrollar un Bingo Virtual, bajo los siguientes requerimientos.

1. Cada persona deberá ser un usuario del sistema, usted puede usar lo que más le convenga como por ejemplo:
- El clásico usuario y contraseña.
- Identificación con cualquier red social.
- Identificación con cuentas de correo como por ejemplo de Gmail, Outlook, entre otros.
- Identificación por medio alguna wallet como por ejemplo MetaMask (web 3.0)

2. Los usuarios (backend) serán manejados con NodeJS + MongoDB.
3. El frontend puede ser desarrollado en Angular, ReactJS, VueJS o cualquier otro framework y/o librería, como también lo puede hacer en HTML puro producido desde NodeJS bajo la tecnología que usted desee escoger.
La comunicación entre el frontend y el backend, debe ser de forma exclusiva por medio de fetch, axios o cualquier otro método que use la tecnología AJAX; si desea usar websockets también lo puede hacer, no hay problema.
4. El backend, es decir, quien maneja la lógica del negocio, deberá ser escrita en Java con Spring Boot.
La base debe principal debe usar MySQL, PostgreSQL, Oracle o MSSQL.
Aplique todos los conocimientos adquiridos en Cantera Nivel 2.
5. El backend en Java, sí requiere información de un usuario, el sistema deberá solicitarlo a NodeJS a través del consumo de un API.

## Estructura
1. 👤 **bg-auth-ms**: microservicio encargado de la autenticación

- NodeJS
- MongoDB

2. 💰 **bg-game-ms**: microservicio encargado de la lógica del juego

- Java con Spring Boot
- MySQL

3. 🔁 **bg-game-api**: API Getway gestiona el tráfico que interactúa con el backend 

4. 🖥️ **bg-game-fe**: front-end de la aplicación

- React

## Atención ⚠️
El programa no se encuentra terminado 💔.

## Hecho ✔️
- Microservicio encargado de la autenticación

## Por hacer 📝
Se encuentra pendiente los puntos 2 (lógica del juego), 3 (API Getway) y 4 (front-end) de la estructura.

---
⌨️ con ❤️ por [Lorena Castro](https://github.com/Lcastro98) ✌