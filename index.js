const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://localhost:3000/'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}


app.use(cors(options));

// Implementación de estrategias
require('./utils/auth/index');

app.get('/', (req, res) => {
  res.send('Servicio de API Node.js');
});


// protejemos la ruta, antes de responder debe de hacer la validación de "checkApiKey" y si no cumple con la validación, mostrara error de no autorizado
app.get('/nueva-ruta', checkApiKey , (req, res) => {
  res.send('Hola, se autentico de manera correcta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port ' +  port);
});
