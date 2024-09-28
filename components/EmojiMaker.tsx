"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export function EmojiMaker() {
  const [prompt, setPrompt] = useState('');
  const [generatedEmojis, setGeneratedEmojis] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEmoji = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setGeneratedEmojis(prevEmojis => [...prevEmojis, data.output[0]]);
    } catch (error) {
      console.error('Error generating emoji:', error);
    }
    setIsGenerating(false);
  };

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
        <Button onClick={generateEmoji} disabled={isGenerating}>
          Generate
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {generatedEmojis.map((emoji, index) => (
          <div key={index} className="relative group">
            <Image
              src={emoji}
              alt={`Generated emoji ${index + 1}`}
              width={128}
              height={128}
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="icon" className="mr-2">
                <DownloadIcon className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <HeartIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { DownloadIcon, HeartIcon } from 'lucide-react';