import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { environment } from '~/configs/environment.js';

export default async function nodemailerSend({
  email,
  subject,
  templateName,
  data,
}) {
  try {
    // Leer la plantilla HTML desde archivos
    const templatePath = path.resolve(
      `src/resources/mail/${templateName}.html`
    );
    let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

    // Reemplazar placeholders con datos dinámicos
    Object.keys(data).forEach((key) => {
      const placeholder = `{{${key}}}`;
      htmlTemplate = htmlTemplate.replace(
        new RegExp(placeholder, 'g'),
        data[key]
      );
    });

    // Configurar transporte SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: environment.EMAIL,
        pass: environment.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: environment.EMAIL,
      to: email,
      subject,
      html: htmlTemplate,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error sending email: ' + error.message);
  }
}
