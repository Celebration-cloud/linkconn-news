/* eslint-disable no-undef */
import ContactEmail from "@/components/email/ContactEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    const response = await resend.emails.send({
      from: "Linkcon News Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      subject: `Contact Form: ${subject}`,
      react: ContactEmail({ name, email, subject, message }),
    });

    return Response.json({ success: true, data: response });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
