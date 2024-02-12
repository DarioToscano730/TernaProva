const express = require('express');
const app = express();
const router = express.Router()
const db = require('./db');

router.post('/switch', async (req, res) => {
    let connection; // Sposta la dichiarazione della variabile connection qui

    try {
        console.log("Lo Switch creato è : ", req.body)
        connection = await db.getConnection();
        const [rows] = await connection.execute('insert into switch (nome, tipo) values(?,?)', [req.body.nome, req.body.tipo]);
        res.status(200).json({ nome: req.body.nome, tipo: req.body.tipo });
    } catch (error) {
        console.error('Errore ', error);
        res.status(500).send('Errore interno del server');
    } finally {
        if (connection) {
            connection;
        }
    }
});

router.get('/switch', async(req, res) =>{
    let connection = null;
    try {
        connection = await db.getConnection();
        // Eseguire una query per selezionare tutti i dati dalla tabella "switch"
        const query = 'SELECT * FROM switch';
        const [rows] = await connection.execute(query);

        // Invia i dati come risposta
        res.json(rows);
    } catch (error) {
        console.error('Errore nel recupero dei dati dalla tabella switch:', error);
        // Invia una risposta di errore
        res.status(500).json({ error: 'Errore nel recupero dei dati dalla tabella switch' });
    }
});


router.put('/switch', async (req, res) => {
    const { nome } = req.params;
    const newData = req.body;

    try {
        // Esegui la query per aggiornare il record con il nome corrispondente
        const query = 'UPDATE switch SET tipo = ? WHERE nome = ?';
        await db.execute(query, [newData.tipo, nome]);

        // Invia una risposta di successo
        res.status(200).json({ success: true, message: 'Record aggiornato con successo' });
    } catch (error) {
        console.error('Errore durante l\'aggiornamento del record:', error);
        // Invia una risposta di errore
        res.status(500).json({ success: false, error: 'Errore durante l\'aggiornamento del record' });
    }
});


router.delete('/switch/:nome', async (req, res) => {
    const { nome } = req.params; // Ottieni il nome del router dall'URL

    let connection;

    try {
        connection = await db.getConnection();
        // Esegui la query per eliminare il router con il nome specificato
        const query = 'DELETE FROM switch WHERE nome = ?';
        const [result] = await connection.execute(query, [nome]);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Switch eliminato con successo' });
        } else {
            res.status(404).json({ success: false, message: 'Switch non trovato' });
        }
    } catch (error) {
        console.error('Errore durante l\'eliminazione dello Switch:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    } finally {
        if (connection) {
            connection; // Chiudi correttamente la connessione
        }
    }
});

module.exports = router