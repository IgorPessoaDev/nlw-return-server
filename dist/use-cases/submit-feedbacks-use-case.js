"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUsecase = void 0;
class SubmitFeedbackUsecase {
    constructor(feedbackRepository, mailadapter) {
        this.feedbackRepository = feedbackRepository;
        this.mailadapter = mailadapter;
    }
    async execute({ type, commet, screenshot }) {
        if (!type) {
            throw new Error('type is required');
        }
        if (!commet) {
            throw new Error('Commet is required');
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenchot format');
        }
        await this.feedbackRepository.create({
            type,
            commet,
            screenshot,
        });
        await this.mailadapter.sendMail({
            subject: 'new Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo de Feedback: ${type}</>`,
                `<p>Comentario: ${commet}</p>`,
                screenshot ? `<img src="${screenshot}" />` : ``,
                `</div>`
            ].join('\n')
        });
    }
}
exports.SubmitFeedbackUsecase = SubmitFeedbackUsecase;
