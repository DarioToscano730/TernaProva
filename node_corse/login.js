const express = require('express');
const router = express.Router();
const db = require('./db');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');


// Route per il login
router.post('/login', async (req, res) => {
    const { email } = req.body;
    let connection;
    try {
        // Cerca l'utente nel database
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM utenti WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            
            // Utente non trovato
            return res.status(401).json({ success: false, message: 'Credenziali non valide' });
        }else {
            return res.json(rows[0])
        }

        /*// Confronta la password fornita con quella nel database usando bcrypt
        const isPasswordValid = bcrypt.compareSync(password, rows[0].password);
        if (!isPasswordValid) {
            console.log('body :', JSON.stringify(req.body), ' rows : ', JSON.stringify(rows) )
            // Password non corretta
            return res.status(401).json({ success: false, message: 'Credenziali non valide' });
        }

        // Genera il token JWT
        const token = jwt.sign({ userId: rows[0].id, email }, 'your_secret_key', { expiresIn: '1h' });

        // Invia il token JWT come risposta
        res.json({ success: true, token });*/
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ success: false, message: 'Errore durante il login' });
    } finally {
        if (connection) {
            connection.release(); // Rilascia la connessione al pool dopo l'uso
        }
    }
});


module.exports = router;
