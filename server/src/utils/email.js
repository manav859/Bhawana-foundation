import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (!transporter && env.SMTP_HOST && env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT || 587,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Send order confirmation email to buyer.
 */
export async function sendOrderConfirmation(order, buyerEmail) {
  const mailer = getTransporter();
  if (!mailer) {
    console.warn('[Email] SMTP not configured — skipping order confirmation email.');
    return;
  }

  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.title}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">₹${(item.price * item.quantity).toLocaleString()}</td>
        </tr>`,
    )
    .join('');

  const html = `
    <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
      <div style="background:linear-gradient(135deg,#0B5ED7,#F59E0B);padding:32px;text-align:center;border-radius:12px 12px 0 0;">
        <h1 style="color:white;margin:0;font-size:24px;">Order Confirmed! 🎉</h1>
        <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;">Thank you for supporting Bhawna Foundation</p>
      </div>

      <div style="background:#fff;padding:24px;border:1px solid #e2e8f0;border-top:none;">
        <p style="margin:0 0 16px;">Hi there,</p>
        <p>Your order <strong>${order.orderNumber}</strong> has been confirmed.</p>

        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr style="background:#f8fafc;">
              <th style="padding:8px 12px;text-align:left;font-size:13px;">Item</th>
              <th style="padding:8px 12px;text-align:center;font-size:13px;">Qty</th>
              <th style="padding:8px 12px;text-align:right;font-size:13px;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>

        <div style="border-top:2px solid #e2e8f0;padding-top:12px;margin-top:8px;">
          <p style="display:flex;justify-content:space-between;margin:4px 0;"><span>Subtotal</span><span>₹${order.subtotal.toLocaleString()}</span></p>
          ${order.donationExtra > 0 ? `<p style="display:flex;justify-content:space-between;margin:4px 0;color:#10B981;"><span>Extra Donation ❤️</span><span>₹${order.donationExtra.toLocaleString()}</span></p>` : ''}
          <p style="display:flex;justify-content:space-between;margin:8px 0;font-size:18px;font-weight:700;"><span>Total</span><span>₹${order.total.toLocaleString()}</span></p>
        </div>

        <div style="background:#EAF2FF;padding:16px;border-radius:8px;margin:20px 0;text-align:center;">
          <p style="margin:0;color:#0B5ED7;font-weight:600;">🌟 Your purchase is making a difference!</p>
          <p style="margin:8px 0 0;font-size:14px;color:#64748B;">Every purchase supports a child's education and creative development.</p>
        </div>
      </div>

      <div style="text-align:center;padding:16px;color:#94A3B8;font-size:12px;">
        <p>Bhawna Foundation • Made with ❤️ for children</p>
      </div>
    </div>
  `;

  await mailer.sendMail({
    from: env.FROM_EMAIL || `"Bhawna Foundation" <${env.SMTP_USER}>`,
    to: buyerEmail,
    subject: `Order Confirmed — ${order.orderNumber} | Bhawna Foundation`,
    html,
  });
}
