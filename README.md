
API REST development and deployment

Course
25/26
Group
IFC31C
Delivery date
14/2/2026
Module
Web application implantation
Title
API REST development and deployment


Task 1

Describe your API REST idea indicating:
Main objective. 

El objetivo principal de esta API REST es ofrecer información organizada sobre los animales de un zoológico mediante peticiones HTTP. REST permite acceder y gestionar estos datos de forma sencilla y estructurada.

Where did you get the data? What’s for?
Los datos del JSON han sido generados con ayuda de ChatGPT. Incluyen información básica de los animales del zoo: especie, tipo (mamífero, ave, reptil), peso, altura y jaula asignada.


Create the JSON containing your data. 



Explain the data JSON model.
Is there some node that you will not use?

En el diseño actual de la API, hay nodos que no se utilizan directamente.Las propiedades del JSON ( peso, altura) no son muy relevantes para las operaciones de filtrado y búsqueda.Tan solo son utilizadas al mostrar toda la información del json.

Design your requirements and briefly explain your classes and methods. Do it BEFORE programming, so you get the visual idea before starting.


Creo el directorio Data .dentro se encuentra el archivo Zoo.json. Es donde tengo la información sobre el nombre, tipo, peso y la jaula de los animales. Aquí lo único que se hace es almacenar los datos en formato JSON para que sean consumibles por la aplicación.
Luego he creado el directorio Routes Dentro está el archivo Animal-routes.js. Aquí es donde asignamos los campos que usamos en el archivo de Data para poder ofrecer la información y no dejar ningún campo vacío. Digamos que cada ruta llama a un controlador específico, como el listado general o la búsqueda por nombre, que sabe cómo leer y procesar los datos.
Directorio Controller/Animalcontroller.js En este archivo es donde se encuentra la lógica. No es como el data, ya que el data solo almacena; en cambio, el controller lee el archivo JSON, filtra los animales por tipo si es necesario, busca ejemplares específicos y devuelve las respuestas de las rutas de la carpeta que hemos creado anteriormente.
Model En este directorio se encuentra el archivo Animal.js. Aquí están las clases que voy a crear para poder usar las variables asignadas con el this (nombre, tipo, peso, jaula, etc.), definiendo la estructura de objeto que usará el controlador.
APP.JS Es el archivo más importante de todos, y sin este archivo no funcionaría la API. Es el archivo principal y aquí es donde vamos a configurar y arrancar nuestro servidor Express, conectar las rutas y gestionar el middleware básico para que todo funcione básicamente.
README.md Básicamente es el documento donde yo voy a estar escribiendo y documentando todos los pasos que hago para poder realizar el API REST, incluyendo la descripción del proyecto y cómo ejecutarlo.
DOCKERFILE Aquí es donde voy a poner toda la configuración de todos los archivos para luego crear la imagen del contenedor de Node.js. Esto permitirá luego hacer un docker-compose.yml, poner la imagen creada y al levantarlo con un “docker-compose up”, tener los contenedores con toda la configuración que he estado haciendo sobre mi API REST de forma aislada y lista para producción.


Task 2

During development it’s really important that you keep storing your advances on GitHub. Everytime you archive something, push it towards your repository with a message of your work. The more commits and clear messages, the better. You should create one branch for each task and merge them to the main branch once finished. That way you can keep track of unfinished tasks. 


Task 3

Dockerize your project so it’s deployed as a docker container. Use the following advice:

Create a Dockerfile on the root of your project.
Use the node.js base.
The image name should have the following format:
ifc31c-iaw-surname-name
Expose only the required port.
The application should not be installed or executed as a root user.
Deploy your image to DockerHub. Keep track of the version number, don’t overwrite them.
Make a readme/manual on how to put the image to work.



generamos la imagen de docker con el siguiente comando;
 docker build -t ifc31c-iaw-llabres-mateu:v1  . 


Para ello,lo escribiremos en el terminal , yo utilizo el terminal de visual studio que esta conectado a mi espacio de trabajo de Git Hub


Ahora una vez tengamos generada la imagen, vamos a subirla al Dockerhub
para ello debemos crear una cuenta si no dispones de ella o iniciareos sesion



Una vez lo tengamos miramos que nombre de usuario hemos puesto (por si no nos acordamos), pero lo importante es que estés con la cuenta logeada 


iniciaremos sesión en el terminal



Generamos el tag de nuestra imagen

Una vez esté preparado, ya lo tenemos listo para subir 



I si entramos al dockerhub y vamos a nuestro perfil, podemos ver como se ha creado



Ahora deberemos crear el Dockerfile



Para la containerización de la API del Zoológico, se ha creado un Dockerfile optimizado, priorizando seguridad y eficiencia:
1. Imagen Base
Se utiliza node:22-alpine, una imagen ligera que reduce el tamaño del contenedor y minimiza la superficie de ataque.
2. Directorio de Trabajo
Se define /app como directorio principal y se ajustan permisos para que el usuario no privilegiado pueda operar sin errores de acceso.
3. Instalación de Dependencias
Se optimiza la caché de Docker:
Se copia primero package.json.
Se ejecuta npm install.
Luego se copia el resto del código.
Esto evita reinstalar dependencias cuando solo cambian archivos de la aplicación.
5. Exposición y Ejecución
El contenedor expone el puerto 8080 y usa CMD ["node", "app.js"] para iniciar automáticamente la API al arrancar el contenedor.
Archivo package.json


Script de Inicio
En la sección scripts, el comando "start": "node app.js" estandariza cómo se lanza la aplicación. Se especifica node explícitamente porque los archivos .js no son ejecutables por sí mismos; necesitan que el motor de Node.js los interprete.
Dependencias y Versionado
Para express, se define la versión "^5.2.1".
El símbolo ^ permite instalar automáticamente actualizaciones minor y patch, manteniendo la compatibilidad sin riesgo de romper la API. Al mismo tiempo, evita saltar a versiones major, donde podrían introducirse cambios incompatibles.
Controllers/Animalcontroller.js

Resumen del Funcionamiento del Controlador (Animalcontroller.js)
Importación de Recursos
Modelo Animal: const Animal = require('../models/Animal');  
Permite crear objetos con una estructura coherente usando la clase definida en el modelo.
Datos del zoológico: const Animaljson = require('../data/Zoo.json');  
Al importar un .json con require, Node.js lo convierte automáticamente en un array de objetos listo para usar, sin necesidad de fs.
Función listarAnimales
exports.listarAnimales = (req, res) => { ... }  
Esta función gestiona las peticiones a la ruta correspondiente.
req: contiene la petición del usuario, incluidos posibles filtros como ?tipo=mamifero.
res: se usa para enviar la respuesta final en formato JSON.
Proceso Interno
Se crea un array vacío animales donde se guardarán los resultados filtrados.
Se recorre el JSON con un for para analizar cada registro.
Para cada elemento, se crea una instancia de Animal, garantizando que los datos tengan la estructura correcta.
Se aplica el filtro:
Si no hay filtro, se añade el animal.
Si hay filtro, solo se añade si coincide el tipo.
Respuesta
Al finalizar, res.json(animales) devuelve al cliente la lista de animales filtrados o completa.

model/clase-videojuego.js


Resumen del Modelo (Animal.js)
Definición de la Clase
Se crea la clase Animal usando class Animal, que sirve como plantilla para todos los objetos del sistema.
Constructor
constructor(nombre, edad, tipo, peso, altura, jaula)  
El constructor define la estructura obligatoria que debe tener cada animal. Garantiza que todos los objetos creados incluyan las propiedades necesarias.
Asignación de Propiedades
Dentro del constructor, se usa this.propiedad = valor para:
Crear propiedades fijas del objeto (this.nombre, this.edad, etc.).
Asignarles los valores recibidos al instanciar cada animal.
Esto asegura que cada instancia tenga la misma estructura, aunque con datos distintos.
Exportación
module.exports = Animal;  
Permite que la clase se use en otros archivos, como controladores o rutas.

routes/Animal-routes.js




Importa la herramienta Express, que es la librería base que necesito para poder crear y gestionar las rutas de mi servidor web.
const router = express.Router();
Es como el policía de tráfico; es el componente que organiza y controla el flujo de las peticiones para tener todo el código separado y ordenado, evitando que se mezcle todo en el archivo principal. Viene a ser un "sub-mapa" dedicado exclusivamente a las rutas de los animales.
const AnimalController = require('../controllers/Animalcontroller');
Con esta línea, creo una variable llamada AnimalController e importo en ella todo el contenido del archivo de controladores. De esta forma, toda la lógica y las funciones que programé antes quedan accesibles aquí. Esta línea es vital; sin ella, las rutas no sabrían qué hacer ni qué código ejecutar.
router.get('/', AnimalController.listarAnimales);
Aquí conecto la petición con la acción. Con router.get, le indico al sistema que, cuando un usuario entre a la ruta principal, debe buscar dentro de la variable AnimalController (que definí antes) y ejecutar la función listarAnimales. En mi caso, esta única función es muy potente porque, como expliqué en el controlador, es capaz de devolver todos los animales o filtrarlos automáticamente si el usuario lo pide, sin necesidad de crear rutas separadas para cada tipo.
module.exports = router;
Finalmente, este comando empaqueta y exporta el router configurado. Esto permite que el archivo sea visible y utilizable por el archivo principal app.js (el servidor), conectando así estas rutas con el resto de la aplicación.
app.js


Importa la herramienta Express, y la necesita, ya que Node.js es solo un lenguaje de programación y necesita la app para poder recibir peticiones y comunicarse.
var AnimalRouter = require('./routes/Animal-routes');
Creamos una variable llamada AnimalRouter donde se va a guardar toda la configuración del archivo de rutas que vamos a importar en el archivo app.js. Esto es vital, ya que si no importamos las rutas, cuando algún usuario o cliente quiera buscar un animal, la API no sabrá dónde buscar para darle una respuesta.
app.use('/animales', AnimalRouter);
Es la dirección o la URL base que aparecerá en el navegador cuando alguien quiera acceder a la información del zoológico. Le decimos que todo lo que empiece por esa dirección lo gestione nuestro archivo de rutas de animales.
Ejemplo: http://localhost:8080/animales
app.use(express.json());
Esta línea traduce el texto plano en un objeto de JavaScript. Si no lo hacemos, la aplicación no podría entender los datos que le enviamos (por ejemplo, al crear un nuevo animal con nombre y tipo) y no podríamos usar propiedades como req.body.nombre.
module.exports = app;
(Nota: En tu código actual no usas app.listen directamente en este archivo, sino que exportas la app). Este comando permite que toda la configuración que hemos hecho en app.js sea visible y utilizable por otros archivos. En tu caso, es lo que permite que el archivo de arranque (normalmente bin/www en esta estructura) pueda coger esta aplicación y encender el servidor.

Task 4

Deploy your API REST as production-ready on a production server. For this project, consider the following:

Use the docker image generated on previous tasks.
Deploy your application in a VM as a docker container.
Add a DNS registry pointing to your domain and the IP address of your VM.
Put your API REST behind a reverse-proxy such as Caddy. Either you build a docker-compose or create a network and use it in the two containers.
Redirect all HTTP traffic to HTTPS installing a SSL certificate. Use Let’s Encrypt! for free certs.

Está es la configuración de mi container LXC que he creado en el ProxMox de clase



Configuración de Conectividad y DNS
Selección de la Dirección IP Una vez desplegado el contenedor donde se ejecutará el script, estableceré la conexión apuntando directamente a la IP interna del contenedor LXC que actúa como servidor. He tomado esta decisión técnica porque el uso de la IP pública dentro de la red del instituto generaría conflictos de enrutamiento (NAT Loopback) o bloqueos por el firewall, impidiendo el correcto funcionamiento.
Configuración del Servicio DNS El siguiente paso es facilitar el acceso mediante un nombre de dominio. Para ello, utilizo la plataforma No-IP:
Accedo al portal oficial de no-ip.com.
Me dirijo a la sección DDNS & Remote Access (DNS Dinámico y Acceso Remoto) para dar de alta y configurar mi nuevo host.


I luego sobre



Una vez estemos, clickamos donde dice Create Hostname 

Y creamos nuestro DNS


Una vez creado el DNS, vamos a ir al container LXC que hemos creado anteriormente y vamos a crear un archivo y meter el script para ejecutarlo







Una vez tengamos el script creado y hayamos pegado todo el script, vamos a darle permisos al archivo para poder ejecutarlo



Una vez le demos permisos, ya estaría listo para ejecutarlo





Nos va a pedir el nombre de nuestro DNS, lo introducimos y pulsamos “Enter”.  Luego nos va a pedir el nombre de usuario del DockerHub, que es donde tenemos la imagen que hemos generado anteriormente.


I la versión de la imagen

Esperamos a que se vaya instalando todo

y esperamos a que finalice y aparezca el mensaje






Una vez esté todo instalado, copiamos la URL que nos aparece al completar la instalación y vamos a nuestro navegador y pegamos la URL





Task 5

Develop your REST API. 

Minimum requirements:
Route that lists every single item for each of your JSON data. 
Route that allows the user to pass an ID as a path parameter and it retrieves all the data for that ID.
Route with name search that allows the users to use some query parameters to filter results.
Route with name calculate that retrieves this example JSON introduced by the user and returns the following list ordered by surname.

Rutas
todos los animales del zoológico





buscar por  jaula


buscar por nombre





Optional requirements:
Clean code and project structure.
Data is validated. For example, if a user has mandatory fields and they don’t come on the JSON data, throw an exception.
Every request is logged at the console.


Task 6 (validation)

Explain in which tasks you have used IA. If the teacher has doubts on IA usage not contained in the following table, the project will be evaluated as 0 and the student will go to a recovery exam.


Task
IA questions
Why?
TASK 1
He utilizado IA para la generación del json de la api
Es más rápido que escribir yo todo el contenido del json con tanta variedad de animales
TASK 3
Explicar errores que iban surgiendo en los .js
Para ver exactamente donde estaba el fallo e intentar solucionarlo
TASK 4
Usé el script para la activacion del Caddy
Para ver exactamente donde estaba el fallo e intentar solucionarlo


