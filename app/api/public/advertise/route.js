/* eslint-disable no-undef */
import AdvertisingEmail from "@/components/email/AdvertiseEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    const subject = `Advertising Inquiry from ${company}`;

    const response = await resend.emails.send({
      from: "Linkcon News <onboarding@resend.dev>",
      to: process.env.ADS_EMAIL,
      subject,
      react: AdvertisingEmail({ name, email, company, message }),
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
