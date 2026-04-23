import nodemailer from 'nodemailer';
import 'dotenv/config';

interface ISendEmail{
  to: string,
  subject: string;
  html: string;
}


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})


export const sendEmail = async ({to, subject, html}:ISendEmail) =>{
  const mailOptions ={
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }

};
