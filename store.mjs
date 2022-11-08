import dotenv from "dotenv";
dotenv.config();

export const store = {
  matrix: {
    baseUrl: process.env.MATRIX_BASE_URL,
    userId: process.env.MATRIX_USER_ID,
    accessToken: process.env.MATRIX_ACCESS_TOKEN,
  },
  taiga: {
    webhookSecret: process.env.TAIGA_WEBHOOK_SECRET,
  },
};
