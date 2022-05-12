import express from "express";
import nodemailer from "nodemailer"
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedback-repository";
import { SubmitFeedbackUsecase } from "./use-cases/submit-feedbacks-use-case";

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, commet, screenshot } = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUsecase = new SubmitFeedbackUsecase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitFeedbackUsecase.execute({
      type,
      commet,
      screenshot
    })
    return res.status(201).send()
  } catch (error) {
    console.error(error);
    return res.status(500).send()
  }
})
