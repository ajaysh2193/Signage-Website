import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, email, projectType, message } = await request.json();
    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Please complete your name, phone number and project details." }, { status: 400 });
    }

    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!key || !to) {
      return NextResponse.json({ error: "Email is not configured yet. Please call us directly." }, { status: 503 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Signage Times Website <onboarding@resend.dev>",
        to: [to],
        reply_to: email || undefined,
        subject: `New website enquiry — ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email || "Not provided"}\nProject type: ${projectType || "Not specified"}\n\nProject brief:\n${message}`,
      }),
    });
    if (!response.ok) throw new Error("Resend rejected the message");
    return NextResponse.json({ message: "Thank you — your enquiry is on its way." });
  } catch {
    return NextResponse.json({ error: "We couldn’t send that right now. Please try again or call us." }, { status: 500 });
  }
}
