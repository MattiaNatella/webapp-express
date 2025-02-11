import express from 'express'
import 'dotenv/config';
import moviesRouter from './routers/movies.js'
import errorsHandler from './middlewares/errorsHandler.js';
import notFound from './middlewares/notFound.js';
import checkTime from './middlewares/checkTime.js';
import setImagePath from './middlewares/setImagePath.js';
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3001;


//middleware per l'apertura del server solo in determinati giorni ed orario
app.use(checkTime)

//middleware autorizzazione client

app.use(cors())

//serviamo ai client tutti i file dentro alla cartella public
app.use(express.static('public'))

//Middleware per il parsing della body-request
app.use(express.json())


//middleware gestione percorso dinamico immagini
app.use(setImagePath)

//Rotta risorsa server
app.get('/', (req, res) => {
    res.send('Sono la rotta del server movies')
})

//rotta per i film
app.use('/movies', moviesRouter)

//middleware per la gestione degli errori
app.use(errorsHandler)

//middleware per la gestione delle pagine non trovate
app.use(notFound)


//metto in ascolto la porta
app.listen(port, () => {
    console.log(`sono in ascolto alla porta http://${process.env.DB_HOST}:${port}/`)
})