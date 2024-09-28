import React from 'react';
import { EmojiItem } from './EmojiItem';

interface EmojiGridProps {
  emojis: Array<{ url: string; likes: number }>;
  onDownload: (url: string) => void;
  onLike: (index: number) => void;
}

export const EmojiGrid: React.FC<EmojiGridProps> = ({ emojis, onDownload, onLike }) => {
  return (
    <div className="emoji-grid">
      {emojis.map((emoji, index) => (
        <EmojiItem
          key={index}
          emoji={emoji}
          onDownload={() => onDownload(emoji.url)}
          onLike={() => onLike(index)}
        />
      ))}
    </div>
  );
};