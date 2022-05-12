import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1296afdeabeb81",
    pass: "b258a0ff996acd"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: `Equipe Feedget <get@gmail.com>`,
      to: `igor Pessoa <igorpessoa.dev@gmail.com>`,
      subject: subject,
      html: body
    })
  };
}