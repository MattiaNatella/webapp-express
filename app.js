import express from 'express'
import 'dotenv/config';
import moviesRouter from './routers/movies.js'
const app = express()

const port = process.env.PORT || 3001;


//serviamo ai client tutti i file dentro alla cartella public
app.use(express.static('public'))

//Middleware per il parsing della body-request
app.use(express.json())

//Rotta risorsa server
app.get('/', (req, res) => {
    res.send('Sono la rotta del server movies')
})

//gestione rotte

app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`sono in ascolto alla porta http://${process.env.DB_HOST}:${port}/`)
})