import z from 'zod';

/**
 * Zod schema for contact form data
 */
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  phone: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Sends an email using a third-party service.
 * @param to The recipient's email address.
 * @param subject The subject of the email.
 * @param body The body of the email.
 */
export async function sendEmail(to: string, subject: string, body: string) {
  // Example placeholder for email sending logic
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  console.log('Email sent successfully!');
}

/**
 * Sends a contact form inquiry email to the admin.
 * @param formData The form data submitted by the user.
 */
export async function sendInquiryEmail(formData: ContactFormData) {
  const subject = `New Car Inquiry from ${formData.name}`;
  const body = `
    <h1>New Car Inquiry</h1>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
    <p><strong>Subject:</strong> ${formData.subject}</p>
    <p><strong>Message:</strong> ${formData.message}</p>
  `;

  // Replace with real email sending
  await sendEmail('admin@example.com', subject, body);
}
