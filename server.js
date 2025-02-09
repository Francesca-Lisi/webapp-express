const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

//7. import router
const moviesRouter = require('./routes/movies')

//4. import middleware
const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');
const imagePathMiddleware = require('./middlewares/imagePath');

//1. middleware parsing del body
app.use(express.json());

//2. middleware asset statici
app.use(express.static('public'));

//.8 middleware per percorso immagini
app.use(imagePathMiddleware);

//3. prima rotta
app.get('/', (req, res) => {
  res.send('Entry point');
});

//8. usare il router
app.use('/api/movies', moviesRouter)

//5. richiamo i middleware importati
app.use(errorsHandler);
app.use(notFound);

//6. metto in ascolto sulla porta
app.listen(port, () => {
  console.log(`Server in ascolto alla porta ${port}`)
})



// start": "node --env-file=.env  server.js",
//     "dev": "node --env-file=.env --watch server.js"