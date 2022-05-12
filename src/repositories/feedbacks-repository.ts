export interface FeedbackCreateData {
  type: string;
  commet: string;
  screenshot?: string;
}

export interface FeedbackRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}