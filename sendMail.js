// Backend Node.js para envio automático de e-mails
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'contato@williancarvalho.com.br',
        pass: 'weppxldvfrqugrqe',
      },
    });
    await transporter.sendMail({
      from: email,
      to: 'contato@williancarvalho.com.br',
      subject: 'Contato do site',
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    });
    // E-mail de agradecimento para o usuário
    await transporter.sendMail({
      from: 'contato@williancarvalho.com.br',
      to: 'contato@williancarvalho.com.br',
      subject: 'Nova inscrição na lista de espera',
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
});

app.listen(3001, () => {
  console.log('Servidor de e-mail rodando na porta 3001');
});
