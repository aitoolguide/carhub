import React from 'react';
import { cn } from '@app/lib/utils';
import { Facebook, Twitter, Linkedin, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

interface SocialShareProps {
  url: string;
  title: string;
  className?: string;
}

/**
 * A shared component for providing social media share buttons.
 *
 * @param {string} url - The URL to share.
 * @param {string} title - The title/text to accompany the share.
 * @param {string} className - Additional CSS classes for styling the container.
 */
const SocialShare = ({ url, title, className }: SocialShareProps) => {
  const socialMedia = [
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      name: "WhatsApp",
      icon: <MessageSquare size={20} />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
      color: "bg-green-500 hover:bg-green-600"
    }
  ];

  return (
    <div className={cn("flex space-x-2 items-center", className)}>
      <span className="text-sm font-medium text-gray-700">Share:</span>
      {socialMedia.map((platform) => (
        <a key={platform.name} href={platform.href} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className={cn("text-white", platform.color)}>
            {platform.icon}
          </Button>
        </a>
      ))}
    </div>
  );
};

export { SocialShare };
