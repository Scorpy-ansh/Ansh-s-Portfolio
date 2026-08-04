import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

function sanitizeInput(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    // Get client IP for basic rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many transmission requests. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot bot protection
    if (honeypot && String(honeypot).trim() !== "") {
      // Silently discard spam submission
      return NextResponse.json({ success: true, message: "Transmission encrypted and sent." });
    }

    // Input validation
    const rawName = String(name || "").trim();
    const rawEmail = String(email || "").trim();
    const rawMessage = String(message || "").trim();

    if (!rawName || rawName.length < 2) {
      return NextResponse.json({ error: "Please provide a valid full name (at least 2 characters)." }, { status: 400 });
    }

    if (!rawEmail || !isValidEmail(rawEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!rawMessage || rawMessage.length < 5) {
      return NextResponse.json({ error: "Please provide a message details with at least 5 characters." }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER || "anshumanp1006@gmail.com";
    const rawPass = process.env.EMAIL_PASS || "";
    const emailPass = rawPass.replace(/[\s_]/g, "").trim();

    // Check if App Password is set
    if (!emailPass || emailPass === "your_gmail_app_password_here") {
      return NextResponse.json(
        {
          error:
            "Email service is not fully configured. Please set your Gmail App Password in .env.local (EMAIL_PASS).",
        },
        { status: 503 }
      );
    }

    const cleanName = sanitizeInput(rawName);
    const cleanEmail = sanitizeInput(rawEmail);
    const cleanMessage = sanitizeInput(rawMessage);

    // Create Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"${cleanName}" <${emailUser}>`,
      to: "anshumanp1006@gmail.com",
      replyTo: cleanEmail,
      subject: `Portfolio Contact: Message from ${cleanName}`,
      text: `Name: ${rawName}\nEmail: ${rawEmail}\n\nMessage:\n${rawMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Portfolio Inquiry</h2>
          <p><strong>Sender Name:</strong> ${cleanName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h4 style="color: #555; margin-bottom: 8px;">Message Details:</h4>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 6px; line-height: 1.6;">${cleanMessage}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Transmission encrypted and sent successfully!",
    });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    const message = error instanceof Error ? error.message : "Failed to transmit message.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
