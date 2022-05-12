import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRepository {
  async create({ type, commet, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type: type,
        commet: commet,
        screenshot: screenshot,
      }
    });
  };
}