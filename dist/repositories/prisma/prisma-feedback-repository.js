"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFeedbacksRepository = void 0;
const prisma_1 = require("../../prisma");
class PrismaFeedbacksRepository {
    async create({ type, commet, screenshot }) {
        await prisma_1.prisma.feedback.create({
            data: {
                type: type,
                commet: commet,
                screenshot: screenshot,
            }
        });
    }
    ;
}
exports.PrismaFeedbacksRepository = PrismaFeedbacksRepository;
