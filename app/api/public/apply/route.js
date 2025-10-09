/* eslint-disable no-undef */
import JobApplicationEmail from "@/components/email/JobApplicationEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message, cv, job } = body;

    const response = await resend.emails.send({
      from: "Linkcon News Careers <onboarding@resend.dev>",
      to: process.env.HR_EMAIL,
      subject: `New Job Application: ${job}`,
      react: JobApplicationEmail({ name, email, message, cv, job }), // ✅ like this
    });

    return Response.json({ success: true, data: response });
  } catch (err) {
    console.error("Email send error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
