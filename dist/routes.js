"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail-adapter");
const prisma_feedback_repository_1 = require("./repositories/prisma/prisma-feedback-repository");
const submit_feedbacks_use_case_1 = require("./use-cases/submit-feedbacks-use-case");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, commet, screenshot } = req.body;
    try {
        const prismaFeedbacksRepository = new prisma_feedback_repository_1.PrismaFeedbacksRepository();
        const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
        const submitFeedbackUsecase = new submit_feedbacks_use_case_1.SubmitFeedbackUsecase(prismaFeedbacksRepository, nodemailerMailAdapter);
        await submitFeedbackUsecase.execute({
            type,
            commet,
            screenshot
        });
        return res.status(201).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
});
