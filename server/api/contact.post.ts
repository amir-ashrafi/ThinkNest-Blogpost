import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  await transporter.sendMail({
    from: `"${body.fullname}" <${body.email}>`,
    to: process.env.SMTP_USER,
    subject: `پیام جدید از ${body.fullname}`,
    text: body.message
  })

  return { success: true }
})
