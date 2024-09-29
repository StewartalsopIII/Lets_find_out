'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { EmojiGrid } from './EmojiGrid';

export function EmojiMaker() {
  const [prompt, setPrompt] = useState('');
  const [generatedEmojis, setGeneratedEmojis] = useState<Array<{ id: number; image_url: string; prompt: string; likes_count: number }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEmoji = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emoji');
      }

      const data = await response.json();
      if (data.success && data.emoji) {
        setGeneratedEmojis((prevEmojis) => [data.emoji, ...prevEmojis]);
      } else {
        throw new Error(data.error || 'Failed to generate emoji');
      }
    } catch (error) {
      console.error('Error generating emoji:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  const handleDownload = useCallback((url: string) => {
    // Implement download functionality
    console.log('Downloading:', url);
  }, []);

  const handleLike = useCallback((id: number, newLikes: number) => {
    setGeneratedEmojis((prevEmojis) =>
      prevEmojis.map((emoji) =>
        emoji.id === id ? { ...emoji, likes_count: newLikes } : emoji
      )
    );
  }, []);

  const latestEmoji = generatedEmojis[0];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2 mb-8">
        <Input
          type="text"
          placeholder="Enter a prompt to generate an emoji"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={generateEmoji} disabled={isGenerating || !prompt.trim()}>
          {isGenerating ? 'Generating...' : 'Generate'}
        </Button>
      </div>
      {latestEmoji && (
        <div className="mb-8">
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src={latestEmoji.image_url}
              alt={latestEmoji.prompt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
      <EmojiGrid
        emojis={generatedEmojis}
        onLike={handleLike}
      />
    </div>
  );
}