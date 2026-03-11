import { useEffect, useRef } from 'react';
import { Button } from './Button'; // Assuming Button exists in shared
import { ImagePlus } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void;
  cloudName: string;
  uploadPreset: string;
  buttonText?: string;
  className?: string;
}

export const CloudinaryUploadWidget = ({
  onUploadSuccess,
  cloudName,
  uploadPreset,
  buttonText = 'Upload Image',
  className = ''
}: CloudinaryUploadWidgetProps) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Check if cloudinary is loaded globally
    if ('cloudinary' in window) {
      const cloudinary = (window as any).cloudinary;
      widgetRef.current = cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          sources: ['local', 'url', 'unsplash'], // Allowed sources
          multiple: false,
          maxFiles: 1,
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            console.log('Upload successful:', result.info);
            onUploadSuccess(result.info.secure_url);
          }
        }
      );
    }
  }, [cloudName, uploadPreset, onUploadSuccess]);

  const handleOpenWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      console.error('Cloudinary widget not initialized.');
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleOpenWidget} 
      className={`flex items-center gap-2 ${className}`}
    >
      <ImagePlus className="w-4 h-4" />
      {buttonText}
    </Button>
  );
};
