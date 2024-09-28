import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Heart } from 'lucide-react';
import { downloadImage } from '@/lib/utils';

interface EmojiItemProps {
  emoji: { url: string; likes: number };
  onLike: (newLikes: number) => void;
}

export const EmojiItem: React.FC<EmojiItemProps> = ({ emoji, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(emoji.likes);

  const handleDownload = () => {
    const fileName = `emoji_${Date.now()}.png`;
    downloadImage(emoji.url, fileName);
  };

  const handleLike = () => {
    const newLikes = isLiked ? localLikes - 1 : localLikes + 1;
    setIsLiked(!isLiked);
    setLocalLikes(newLikes);
    onLike(newLikes);
  };

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
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`bg-white text-black hover:bg-gray-200 ${isLiked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
        </Button>
      </div>
      <div className="emoji-likes">{localLikes} likes</div>
    </div>
  );
};