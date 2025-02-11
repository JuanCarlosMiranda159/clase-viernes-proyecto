// importar todas libreberias necesarias.
const  express = require("express");
const  cors = require("cors");
const  morgan = require("morgan");
const  low = require("lowdb");
const articulosRouter = require("../routes/articulos")
//determinamos el puerto Enpoint
const PORT = process.env.PORT ||10801;

//obtenemos la libreria controlador de archivo
const FileSync = require("lowdb/adapters/FileSync");

//creamos el archivo db.json
const adapter = new FileSync("db.json")
const db = low(adapter);

//inicializamos LA DB
db.defaults({articulos:[]}).write();

const app =express(); //creamos el aplicativo
app.db = db;

//definimos las variables necesarias.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/articulos",articulosRouter)
//monstramos el log de ejecucion
app.listen(PORT, () => console.log(`el servidor esta corriendo el puerto ${PORT}`));

//rest
const option ={
    definition:{
        openapi:"3.0.0",
        info: {
            title:"librerias Apis- Certus",
            version:"1.0.0",
            description:"demo de librerias  de ventas api",
        },
        servers: [
            {
                url:"http://localhost:"+PORT,
            }
        ],
    },
    apis: ["./routes/*.js"],
};