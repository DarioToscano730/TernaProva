const express = require('express');
const { default: helmet } = require('helmet');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(helmet());
//const {persone} = require('./persone');
app.use(express.json());
const utente = require('./server-utente')
app.use('/', utente)
const ticket = require('./ticket')
app.use('/', ticket)
const router = require('./router')
app.use('/', router)
const switche = require('./switch')
app.use('/', switche)
const login = require('./login')
app.use('/', login)

const mysql = require('mysql2/promise');
//const { error } = require('console');

const dbConfig = {
    host : 'localhost',
    port : 3306,
    user : 'ternaprova',
    database : 'ternaprova',
    password : 'ciao'
};

app.get('/test-db', async(req, res) => {
    try{
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT 1+1 AS solution');
        res.json(rows);
    }catch(error){
        console.error('Errore MySql : ', error);
        res.status(500).send('Errore del server');
    }
});

async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connesso a mysql');
        return connection;
    } catch (error) {
        console.error('Errore di connessione a mysql:', error);
        throw error;
    }
}




app.get('/', (req, res) => {
    res.send("Questa è la homepage,  clicca per vedere le <a href = '/api/persone'>persone</a>")
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});

/*app.get('/api/persone/:id', (req, res) => {
    const {id} = req.params
    const persona = persone.find(
        (persona) => persona.id === id
    )
    res.json({succes : true , data : persona})
})

app.post('/api/persone', (req, res) => {
    console.log(req.body)
    const persona = req.body
    persone.push(persona)
    res.json({success : true, data : persone})
})

app.put('/api/persone/:id', (req, res) => {
    const {id} = req.params
    const persona = req.body
    persone[Number (id) -1] = persona
    res.json({success : true, data : persone})
})

app.delete('/api/persone/:id', (req, res) => {
    const {id} = req.params
    const index = persone.findIndex(persona => persona.id === id)
    persone.splice(index,1)
    res.json({data :persone})
})

app.post('/ticket', (req, res) => {
    console.log("Il ticket è :", req.body)
    res.json({nome : req.body.nome, azienda : req.body.azienda, motivo : req.body.motivo})
})







app.delete('/utente', (req, res) => [
    res.json({data : persone})
])*/


