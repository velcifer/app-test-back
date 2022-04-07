# app-test-back

App del lado del servidor para ejecutar los metodos GET, POST, PUT Y DELETE, junto a MongoDB para 
poder crear usuarios, editar y eliminar.



# Herramientas

Del lado del Back: 
*Docker: usado como contenedor y configuracion del servidor.
*Lenguaje: Javascrip y node.js.
--------------
Dependencias usadas:

*Express para crear apis y buen funcionanmiento.
*Jasonwebtoken: para crear y ejecutar token de inicio login.
*MongoDB: BD.
*Morgan: para ver las peticiones https por consola cuando vamos probando.
*node-fetch: para porder consumir apis externas y poder obtener datos.
*mongose: para poder conectar mongodb con el back.
*nodemon: la uso para que cada vez que haga un cambio se actualiza el servidor local alos cambis que cargue, esto se usa solo por desarrollo.

# Dockerfile
Con este definimos la version de node, tambien le indicamos que cuando se ejecute la el servidor con docker busque la carpeta donde esta el archivo que ejecuta el servicio, crea una copia del pakage.json
inicia el servicio.

FROM node:14

RUN mkdir -p /Users/src/app

WORKDIR /User/src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start", "dev"]





# Dockerignore

*Este archivo es muy parecido a gitignore nos ayuda a no subir a produccion carpetas o modulos innecesarios como ( node_Module )



# Docker-componse.yml

*es una herramienta para definir y ejecutar aplicaciones de Docker de varios contenedores. En Compose, se usa un archivo YAML para configurar los servicios de la aplicación. Después, con un solo comando, se crean y se inician todos los servicios de la configuración, indicamos la version le damos un  nombre al servicio luego colocamos como se inicia, y se debe colocar el puerto en el se ejecutara dokerservice y el servidor local de desarrollo, tambien colocamos el puerto y nobre de mongo o la base de datos.

version: "3"

services:
 web:
    container_name: web
    image: node
    restart: always
    build: .
    ports:
    - "4000:3000"
    links:
    - mongo
    volumes:
    - .:/usr/src/app
    environment:
    - MONGODB_HOST=mongo
    - MONGODB_DB=test-backend
    - PORT=4000
 mongo:
    container_name: database
    image: mongo
    ports:
      - "27017:27017"
    logging:
      driver: none
      
      
    
    # Comandos Doker
    
    *docker images: para poder ver en consola todos o la imagen que tenemos.
    *docker run -it -d httpd: este ejecuta por consola la imagen docker.
    *ps -a: con este comnado enumeramos los contenedores y podemos ver que contenedores hay cualse esta      ejecuatndo , cual esta en stop con todos sus detalles.
    
    **Despliegue de la aplicacion en la nube con AWS**
    
    1 creamos una cuenta empresa o prsonal en aws luego en el panel de control buscamos este modulo( AWS Elastic Beanstalk ).
    
    2 Luego que estemos en el modulo le damos o buscamos crear aplicacion pulsamo el boton, nos creara una imagen o interfaz donde seguiremos editando.
    
    3 luego nos enviara a la pantalla de donde crearemos un servidos donde estara alojado los servicios si se esta trabajando con varios micros.
    
    4 siguiente paso, seria cargar el proyecto ya comrimido en un archivo Zip seleccionamos, subimos y colocamos el nombre para el entorno con la url.
    
    5 en este paso nos mostrara un check de marcacion para que lo seleccionemos las configuraciones de preferencia como etiquetas de entorno y configuración de VPC.
    
    6 para este paso despues de que la configuración sea adecuada damos siguiente y saldra un boton qu dice lanzar lo presionamos y estara listo, buscamos de nuevo el       modulo Elastic Beanstalk y veremos nuetros servicios en aws con su url para ver y trabajar con ellos.
    
    La base de dados usada MongoDB: usu Mongo Atalas Se crea una cuenta, un usuario luego vamos al cluster cramos nuestras colecciones y por ultimo ingresamos en el       panel izquierdo donde buscaremos conexión copiamos el URI luego vamos a nuetro proyecto buscamos la direccion local cambiamos por esta uri que nos dio Mongo atlas     para finalizar colocamos un user y passwor y listo ya la bd estaria en la nube y los servicios en aws.
    
    
    
    
    
    
  


