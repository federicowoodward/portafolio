const { Resend } = require('resend');

const resend = new Resend(process.env['RESEND_API_KEY']);

module.exports = async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { from, subject, message } = req.body;

  if (!from || !subject || !message) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const data = await resend.emails.send({
      from: 'portafolio@fedewoodward.com',
      to: 'woodfederico@gmail.com',
      subject: `${subject}`,
      html: `
        <p><strong>De:</strong> ${from}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return res
      .status(500)
      .json({ success: false, error: 'No se pudo enviar el mensaje.' });
  }
};
