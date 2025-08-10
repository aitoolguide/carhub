"use client";
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@app/lib/utils';

interface ImageUploadProps {
  onImageChange: (base64Image: string | null) => void;
  className?: string;
}

/**
 * A component for uploading and previewing an image.
 * @param {(base64Image: string | null) => void} onImageChange - Callback function to get the base64 string of the uploaded image.
 * @param {string} className - Additional CSS classes for styling.
 */
const ImageUpload = ({ onImageChange, className }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onImageChange(null);
    }
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-6 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 transition-colors duration-200 hover:border-primary cursor-pointer",
      className
    )}>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center text-center cursor-pointer">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-auto rounded-lg object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Upload size={32} className="text-slate-500 mb-2" />
            <span className="text-slate-700 font-semibold">Click to upload an image</span>
            <p className="text-sm text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </label>
    </div>
  );
};

export { ImageUpload };
