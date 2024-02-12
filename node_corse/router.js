const express = require('express');
const app = express();
const router = express.Router()
const db = require('./db');

router.post('/router', async (req, res) => {
    let connection; // Sposta la dichiarazione della variabile connection qui

    try {
        console.log("Il router creato è : ", req.body)
        connection = await db.getConnection();
        const [rows] = await connection.execute('insert into router (nome, tipo) values(?,?)', [req.body.nome, req.body.tipo]);
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

router.get('/router', async(req, res) =>{
    let connection = null;
    try {
        connection = await db.getConnection();
        // Eseguire una query per selezionare tutti i dati dalla tabella "switch"
        const query = 'SELECT * FROM router';
        const [rows] = await connection.execute(query);

        // Invia i dati come risposta
        res.json(rows);
    } catch (error) {
        console.error('Errore nel recupero dei dati dalla tabella switch:', error);
        // Invia una risposta di errore
        res.status(500).json({ error: 'Errore nel recupero dei dati dalla tabella switch' });
    }
});


router.put('/router', async (req, res) => {
    const { id } = req.params; // Ottieni l'ID del router dall'URL
    const newData = req.body; // Nuovi dati da aggiornare

    let connection;

    try {
        connection = await db.getConnection();
        // Esegui la query per aggiornare i dati del router con l'ID specificato
        const query = 'UPDATE router SET nome = ?, tipo = ? WHERE id = ?';
        await connection.execute(query, [newData.nome, newData.tipo, id]);

        res.status(200).json({ success: true, message: 'Dati del router aggiornati con successo' });
    } catch (error) {
        console.error('Errore durante l\'aggiornamento dei dati del router:', error);
        res.status(500).json({ success: false, error: 'Errore durante l\'aggiornamento dei dati del router' });
    } finally {
        if (connection) {
            connection; // Rilascia la connessione al pool dopo l'uso
        }
    }
});

router.delete('/router/:nome', async (req, res) => {
    const { nome } = req.params; // Ottieni il nome del router dall'URL

    let connection;

    try {
        connection = await db.getConnection();
        // Esegui la query per eliminare il router con il nome specificato
        const query = 'DELETE FROM router WHERE nome = ?';
        const [result] = await connection.execute(query, [nome]);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Router eliminato con successo' });
        } else {
            res.status(404).json({ success: false, message: 'Router non trovato' });
        }
    } catch (error) {
        console.error('Errore durante l\'eliminazione del router:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    } finally {
        if (connection) {
            connection; // Chiudi correttamente la connessione
        }
    }
});



module.exports = router