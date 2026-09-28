"use server";

import { headers } from "next/headers";

export type BookingState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const rateLimit = new Map<string, number>();
const WINDOW_MS = 60_000;

export async function submitBookingRequest(
  _prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  // Honeypot — real users never fill this hidden field.
  if (formData.get("company_website")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const project = String(formData.get("project") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const budget = String(formData.get("budget") || "").trim();

  if (!name || !email || !project) {
    return { status: "error", message: "Please fill in your name, email and project type." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const last = rateLimit.get(ip);
  if (last && now - last < WINDOW_MS) {
    return { status: "error", message: "Please wait a moment before submitting again." };
  }
  rateLimit.set(ip, now);

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.BOOKING_NOTIFY_EMAIL || "hello@irislabs.dev";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "IrisLabs Site <onboarding@resend.dev>",
          to: toAddress,
          reply_to: email,
          subject: `New discovery call request — ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nBudget tier: ${budget}\nProject: ${project}\n\n${message}`,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch {
      return {
        status: "error",
        message: "Something went wrong sending your request — email us directly at hello@irislabs.dev.",
      };
    }
  } else {
    console.log("[booking request received — RESEND_API_KEY not set]", {
      name,
      email,
      budget,
      project,
      message,
    });
  }

  return { status: "success" };
}
