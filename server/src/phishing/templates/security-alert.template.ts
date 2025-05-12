export const securityAlertTemplate = {
  subject: 'Security Alert: Action Required',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Security Alert</h2>
      <p>Dear User,</p>
      <p>We have detected unusual activity on your account. To ensure your account's security, please verify your identity by clicking the link below:</p>
      <p style="margin: 20px 0;">
        <a href="http://localhost:5173/verify" 
           style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          Verify Account Now
        </a>
      </p>
      <p>If you did not request this verification, please ignore this email.</p>
      <p>Best regards,<br>Security Team</p>
    </div>
  `
};