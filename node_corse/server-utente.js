const express = require('express');
const app = express();
const router = express.Router()
const db = require('./db');

router.post('/utente', async (req,res) => {
    try{
        const connection = await db.getConnection();
        console.log(req.body.password)
        if (req.body.password.lenght > 7){
            const [rows] = await connection.execute('insert into utenti (email, password) values(?,?)', [req.body.email, req.body.password ]  );
            res.json({email : req.body.email , password : req.body.password})
        }else {
            res.status(400).send()
            console.log('La password non è valida')
        }
   /* console.log("L'utente registrato è : " , req.body)
   // const connection = await db.getConnection();
        const [rows] = await connection.execute('insert into utenti (email, password) values(?,?)', [req.body.email, req.body.password ]  );*/
    //res.json({email : req.body.email , password : req.body.password})
    }catch(error){
        console.error('Errore ', error)
        res.status(500).send()
    }
})

router.get('/utente', (req, res) => {
    res.send("Si è registrato" )
})

router.get('/utente', (req, res) => {
    res.json({succes : true , email : req.body.email, password : req.body.password})
})


module.exports = router



