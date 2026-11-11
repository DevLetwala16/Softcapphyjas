// React Email Scaffold
export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export const EMAIL_TEMPLATES = {
  WELCOME: "welcome",
  ORDER_CONFIRMATION: "order_confirmation",
  EMI_REMINDER: "emi_reminder",
  PASSWORD_RESET: "password_reset",
} as const;
