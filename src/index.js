//Expresss
const express = require("express");
const app = express();

//Cors
const cors = require("cors");

//Routes
const routerApi = require("./routes");

//Middlewares
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handle');

//Port
const port = process.env.PORT || 3001;

//Usamos el middelware para recibir información POST en formato JSON
app.use(express.json());

//WhiteList 
//Darle acceso a diferenctes dominios que incluya el arreglo
const whiteList = ["http://localhost:3001","http://localhost:3000"];
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error("No permitido D:"));
        }
    }
}

//Para darle acceso a todos los dominios
//app.use(cors())


app.get('/', (req, res) => {

    res.send("Hola revisa la documentación para obtener los resultados esperados :D <a>https://www.marsdev.com/docs/nodeApi/</a>");
});

/*
app.get('/nueva-ruta', (req, res) => {
    res.send("Hola soy una nueva ruta");
}); */

routerApi(app);
app.use(cors(options));

//Use middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Ingresa con la ruta: https://localhost:${port} `);
});
