import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTestEmail = async (
  email: String,
  token: String
) => {
  const confirmLink = `http://localhost:3000/test-email/verify/${token}`;
}