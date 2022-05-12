import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUsecaseRequest {
  type: string;
  commet: string,
  screenshot?: string;
}

export class SubmitFeedbackUsecase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailadapter: MailAdapter
  ) { }
  async execute({ type, commet, screenshot }: SubmitFeedbackUsecaseRequest) {
    if (!type) {
      throw new Error('type is required')
    }
    if (!commet) {
      throw new Error('Commet is required')
    }
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenchot format')
    }


    await this.feedbackRepository.create({
      type,
      commet,
      screenshot,
    })

    await this.mailadapter.sendMail({
      subject: 'new Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de Feedback: ${type}</>`,
        `<p>Comentario: ${commet}</p>`,
        screenshot ? `<img src="${screenshot}" />` : ``,
        `</div>`
      ].join('\n')
    })
  }
}