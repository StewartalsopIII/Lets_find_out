'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { EmojiGrid } from './EmojiGrid';

export function EmojiMaker() {
  const [prompt, setPrompt] = useState('');
  const [generatedEmojis, setGeneratedEmojis] = useState<Array<{ url: string; likes: number }>>([]);
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
      setGeneratedEmojis((prevEmojis) => [{ url: data.output[0], likes: 0 }, ...prevEmojis]);
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

  const handleLike = useCallback((index: number) => {
    setGeneratedEmojis((prevEmojis) =>
      prevEmojis.map((emoji, i) =>
        i === index ? { ...emoji, likes: emoji.likes + 1 } : emoji
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
              src={latestEmoji.url}
              alt="Latest generated emoji"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
      <EmojiGrid
        emojis={generatedEmojis}
        onDownload={handleDownload}
        onLike={handleLike}
      />
    </div>
  );
}