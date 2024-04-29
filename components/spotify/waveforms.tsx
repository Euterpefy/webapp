'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AudioWaveformProps {
  url: string;
  className?: string;
  barClassName?: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({
  url,
  className,
  barClassName,
}) => {
  const [barHeights, setBarHeights] = useState<number[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const audioContextRef = React.useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }
    const fetchAudio = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current?.decodeAudioData(
          arrayBuffer
        );
        if (audioBuffer) {
          const bars = extractBars(audioBuffer);
          setBarHeights(bars);
        }
      } catch (error) {
        console.error('Error fetching or decoding audio:', error);
      }
    };

    fetchAudio().catch((e) => {});

    return () => {
      audioContextRef.current?.close().catch((e) => {
        // console.log(e);
      }); // Clean up AudioContext to avoid memory leaks
    };
  }, [url]);

  const extractBars = (audioBuffer: AudioBuffer): number[][] => {
    const channelData = audioBuffer.getChannelData(0); // Use the first channel
    const sampleRate = audioBuffer.sampleRate;
    const durationInSeconds = audioBuffer.duration;
    const barsPerFrame = 100; // Number of bars per second
    const frameDuration = 1; // duration of each frame in seconds, which is typical for a "second" of audio
    const framesCount = Math.ceil(durationInSeconds / frameDuration);
    const totalBars = framesCount * barsPerFrame;

    // Calculate how many samples each bar should represent
    const samplesPerBar = Math.floor(
      (sampleRate * frameDuration) / barsPerFrame
    );
    const amp = 100; // Scale factor for visualization

    const bars: number[][] = [];
    for (let i = 0; i < totalBars; i++) {
      let sum = 0;
      for (let j = 0; j < samplesPerBar; j++) {
        const index = i * samplesPerBar + j;
        if (index < channelData.length) {
          sum += Math.abs(channelData[index]); // Sum absolute values for more visual variation
        }
      }
      const barHeight = (sum / samplesPerBar) * amp; // Average and scale
      const pageIndex = Math.floor(i / barsPerFrame);
      if (!bars[pageIndex]) bars[pageIndex] = [];
      bars[pageIndex].push(barHeight);
    }
    return bars;
  };

  const currentBars = barHeights[currentPage] || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % barHeights.length);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [barHeights.length]);

  return (
    <div
      className={cn('flex h-36 items-end gap-[2px] overflow-hidden', className)}
    >
      {currentBars.map((height, index) => (
        <div
          key={index}
          className={cn(
            'bg-primary/60 transition-all duration-1000',
            barClassName
          )}
          style={{
            height: `${height}%`,
            width: `calc(100% / ${currentBars.length})`, // Even distribution of bars
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
