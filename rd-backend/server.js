require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota para envio à RD Station
app.post('/send-to-rdstation', async (req, res) => {
    try {
        // Exibindo o payload recebido
        console.log('Payload recebido:', req.body);  // Isso vai imprimir no console o que está sendo enviado.

        // A parte onde o pedido é enviado para o RD Station
        const response = await axios.post(process.env.RD_API_URL, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RD_PUBLIC_TOKEN}`
            }
        });

        // Exibe a resposta do RD Station
        console.log('Resposta da RD Station:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao enviar para RD Station:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao enviar para RD Station' });
    }
});


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
