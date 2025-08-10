// import React from 'react';
// import { cn } from '@app/lib/utils';
// import { MessageSquare } from 'lucide-react';
// import { Button } from '../ui/Button';

// interface WhatsAppButtonProps {
//   message: string;
//   phoneNumber?: string; // Optional for sharing a specific message
//   className?: string;
// }

// /**
//  * A shared component for a WhatsApp chat or share button.
//  *
//  * @param {string} message - The pre-filled message for the WhatsApp chat.
//  * @param {string} [phoneNumber] - The target phone number (e.g., "1234567890"). Optional.
//  * @param {string} className - Additional CSS classes for styling.
//  */
// const WhatsAppButton = ({ message, phoneNumber, className }: WhatsAppButtonProps) => {
//   const waLink = phoneNumber
//     ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
//     : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

//   return (
//     <a href={waLink} target="_blank" rel="noopener noreferrer" className={cn("inline-block", className)}>
//       <Button className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
//         <MessageSquare size={20} className="mr-2" />
//         Chat on WhatsApp
//       </Button>
//     </a>
//   );
// };

// export { WhatsAppButton };
"use client";

import { useOrigin } from '@app/hooks/useOrigin';
import React from 'react';

interface WhatsAppLinkProps {
  car: {
    whatsappNumber: string;
    title: string;
    id: string;
  };
}

export function WhatsAppLink({ car }: WhatsAppLinkProps) {
  const origin = useOrigin();

  if (!origin) return null; // or loading placeholder

  const url = `https://wa.me/${car.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in ${car.title} - ${origin}/cars/${car.id}`
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-colors duration-300"
      title="Contact on WhatsApp"
    >
      Contact on WhatsApp
    </a>
  );
}
