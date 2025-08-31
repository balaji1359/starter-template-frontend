import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import ContactEmail from '../emails/ContactEmail';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: 'Contact Form <contact@linklibrary.ai>',
      to: 'nagisetty.balaji@gmail.com', // <-- change to your destination
      subject: 'New Contact Form Submission',
      react: ContactEmail({ name, email, message }),
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
} 