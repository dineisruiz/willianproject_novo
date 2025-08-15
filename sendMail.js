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
        user: 'dineisruiz@gmail.com',
        pass: 'weppxldvfrqugrqe',
      },
    });
    await transporter.sendMail({
      from: email,
      to: 'dineisruiz@gmail.com',
      subject: 'Contato do site',
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    });
    // E-mail de agradecimento para o usuário
    await transporter.sendMail({
      from: 'dineisruiz@gmail.com',
      to: email,
      subject: 'Obrigado por entrar na lista de espera',
      text: 'Obrigado por entrar na lista de espera! Em breve você será avisado sobre o evento.'
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
});

app.listen(3001, () => {
  console.log('Servidor de e-mail rodando na porta 3001');
});
