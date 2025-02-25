const axios = require('axios');  // Usando o axios instalado localmente

export const handler = async (event) => {
    try {
        console.log("Função chamada para enviar dados para RD Station");

        const payload = JSON.parse(event.body);

        // Log para conferir as variáveis de ambiente
        console.log('RD_API_URL:', process.env.RD_API_URL);
        console.log('RD_PUBLIC_TOKEN:', process.env.RD_PUBLIC_TOKEN);

        const response = await axios.post(process.env.RD_API_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RD_PUBLIC_TOKEN}`,
            },
        });

        console.log("Resposta da RD Station:", response.data);

        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Erro ao enviar para RD Station:', error.response?.data || error.message);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao enviar para RD Station' }),
        };
    }
};