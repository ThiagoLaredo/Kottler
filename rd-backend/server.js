require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Função para renovar o access token
async function refreshAccessToken() {
    try {
        const response = await axios.post('https://api.rd.services/auth/token', {
            client_id: process.env.RD_CLIENT_ID,
            client_secret: process.env.RD_CLIENT_SECRET,
            refresh_token: process.env.RD_REFRESH_TOKEN,
        });

        // Armazene o novo access token na variável de ambiente ou onde preferir
        console.log('Novo Access Token:', response.data.access_token);

        // Atualize o access token na variável de ambiente (não é o ideal para produção, apenas exemplo)
        process.env.RD_PUBLIC_TOKEN = response.data.access_token;

        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao renovar o token:', error.response?.data || error.message);
        return null;
    }
}

// Rota para envio à RD Station
app.post('/send-to-rdstation', async (req, res) => {
    try {
        // Verifica se as variáveis de ambiente estão carregadas
        console.log('RD_API_URL:', process.env.RD_API_URL);
        console.log('RD_PUBLIC_TOKEN:', process.env.RD_PUBLIC_TOKEN);

        // Exibindo o payload recebido
        console.log('Payload recebido:', req.body);  // Isso vai imprimir no console o que está sendo enviado.

        // Verifica se o access_token é válido, caso contrário, renova o token
        if (!process.env.RD_PUBLIC_TOKEN) {
            console.log('Access token inválido ou expirado. Renovando...');
            const newToken = await refreshAccessToken();
            if (!newToken) {
                return res.status(500).json({ error: 'Não foi possível renovar o access token' });
            }
        }

        // Envia o evento para a RD Station
        const response = await axios.post(process.env.RD_API_URL, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RD_PUBLIC_TOKEN}`,
            },
        });

        // Exibe a resposta da RD Station
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
