const express = require('express')
const router = express.Router()
const db = require('./db')

router.post('/ticket', async (req,res) => {
    let connection = null
    try {
        console.log("Il ticket creato è : " , req.body)
        connection = await db.getConnection()
        const [rows] = await connection.execute('insert into ticket (nome, azienda, motivo) values(?,?,?)', [req.body.nome, req.body.azienda, req.body.motivo ]  );
        res.status(200).json({nome: req.body.nome, azienda : req.body.azienda, motivo : req.body.motivo })
    } catch(error){
        console.error('Errore ', error)
        res.status(500).send('Errore interno del server')
    } finally{
        connection;
    }

})

router.get('/ticket', (req, res) => {
    res.send("Ticket creato" )
})


module.exports = router