// // src/app/api/contact/route.ts
// // This route handles submissions from the contact form.

// import { NextResponse } from 'next/server';
// import { sendInquiryEmail } from '@app/lib/email';
// import { z } from 'zod';

// const contactFormSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email address'),
//   phone: z.string().optional(),
//   message: z.string().min(10, 'Message is too short'),
// });

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const validatedData = contactFormSchema.parse(body);

//     // Use the email utility to send the inquiry.
//     // This will log the email content to the console for now.
//     await sendInquiryEmail(validatedData);

//     return NextResponse.json({ message: 'Your inquiry has been sent successfully!' });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ message: 'Validation failed', errors: error?.message }, { status: 400 });
//     }
//     console.error('Failed to send inquiry:', error);
//     return NextResponse.json({ message: 'An error occurred while sending your message' }, { status: 500 });
//   }
// }

// src/app/api/contact/route.ts
// Handles submissions from the contact form.

import { NextResponse } from 'next/server';
import { sendInquiryEmail, contactFormSchema } from '@app/lib/email';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✅ Use the same schema from lib/email.ts
    const validatedData = contactFormSchema.parse(body);

    // ✅ Send the inquiry using our shared type-safe function
    await sendInquiryEmail(validatedData);

    return NextResponse.json({
      message: 'Your inquiry has been sent successfully!',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error('Failed to send inquiry:', error);
    return NextResponse.json(
      { message: 'An error occurred while sending your message' },
      { status: 500 }
    );
  }
}
