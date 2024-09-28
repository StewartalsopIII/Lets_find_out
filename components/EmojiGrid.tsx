import React from 'react';
import { EmojiItem } from './EmojiItem';

interface EmojiGridProps {
  emojis: Array<{ url: string; likes: number }>;
  onLike: (index: number, newLikes: number) => void;
}

export const EmojiGrid: React.FC<EmojiGridProps> = ({ emojis, onLike }) => {
  return (
    <div className="emoji-grid">
      {emojis.map((emoji, index) => (
        <EmojiItem
          key={index}
          emoji={emoji}
          onLike={(newLikes) => onLike(index, newLikes)}
        />
      ))}
    </div>
  );
};