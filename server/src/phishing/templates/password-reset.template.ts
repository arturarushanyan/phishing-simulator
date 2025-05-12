export const passwordResetTemplate = {
  subject: 'Password Reset Request',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Password Reset Required</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the link below to proceed with the password reset:</p>
      <p style="margin: 20px 0;">
        <a href="http://localhost:5173/reset-password" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
      </p>
      <p>If you didn't request a password reset, please ignore this email.</p>
      <p>Best regards,<br>Account Security Team</p>
    </div>
  `
};
