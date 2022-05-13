"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1296afdeabeb81",
        pass: "b258a0ff996acd"
    }
});
class NodemailerMailAdapter {
    async sendMail({ body, subject }) {
        await transport.sendMail({
            from: `Equipe Feedget <get@gmail.com>`,
            to: `igor Pessoa <igorpessoa.dev@gmail.com>`,
            subject: subject,
            html: body
        });
    }
    ;
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
