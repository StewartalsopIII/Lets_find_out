import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Heart } from 'lucide-react';

interface EmojiItemProps {
  emoji: { url: string; likes: number };
  onDownload: () => void;
  onLike: () => void;
}

export const EmojiItem: React.FC<EmojiItemProps> = ({ emoji, onDownload, onLike }) => {
  return (
    <div className="emoji-item">
      <Image
        src={emoji.url}
        alt="Generated emoji"
        layout="fill"
        objectFit="cover"
      />
      <div className="emoji-overlay">
        <Button
          variant="secondary"
          size="icon"
          className="mr-2 bg-white text-black hover:bg-gray-200"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="bg-white text-black hover:bg-gray-200"
          onClick={onLike}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="emoji-likes">{emoji.likes} likes</div>
    </div>
  );
};