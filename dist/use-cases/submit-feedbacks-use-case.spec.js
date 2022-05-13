"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedbacks_use_case_1 = require("./submit-feedbacks-use-case");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new submit_feedbacks_use_case_1.SubmitFeedbackUsecase({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
describe('submit feedback', () => {
    it('should be able to submit feedback', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            commet: "teste",
            screenshot: "data:image/png;base64"
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should no be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: "",
            commet: "teste",
            screenshot: "data:image/png;base64"
        })).rejects.toThrow();
    });
    it('should no be able to submit feedback without commet', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            commet: "",
            screenshot: "data:image/png;base64"
        })).rejects.toThrow();
    });
    it('should no be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            commet: "teste",
            screenshot: "teste.jpg"
        })).rejects.toThrow();
    });
});
