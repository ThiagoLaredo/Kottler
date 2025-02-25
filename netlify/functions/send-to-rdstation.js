const axios = require('axios');

exports.handler = async (event) => {
    try {
        const payload = JSON.parse(event.body);

        const response = await axios.post(process.env.RD_API_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RD_PUBLIC_TOKEN}`,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao enviar para RD Station' }),
        };
    }
};