"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DiceRollResult } from "../types";

const createPlayer = (src: string) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
};

const safePlay = (audio: HTMLAudioElement | null) => {
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
};

interface UseGameSoundsProps {
  lastRoll?: DiceRollResult;
}

export const useGameSounds = (props?: UseGameSoundsProps) => {
  const { lastRoll } = props || {};

  const [isBouncing, setIsBouncing] = useState(false);

  const scrollRef = useRef<HTMLAudioElement | null>(null);
  const winRef = useRef<HTMLAudioElement | null>(null);
  const moveRef = useRef<HTMLAudioElement | null>(null);

  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const scroll = createPlayer("/sounds/scroll.mp3");
    const win = createPlayer("/sounds/win.mp3");
    const move = createPlayer("/sounds/move.mp3");

    scrollRef.current = scroll;
    winRef.current = win;
    moveRef.current = move;

    return () => {
      [scroll, win, move].forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const playScroll = () => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < 80) return;
    lastScrollTimeRef.current = now;

    safePlay(scrollRef.current);
  };

  const playWin = () => safePlay(winRef.current);

  const playMove = () => safePlay(moveRef.current);

  const onMoveEnd = useCallback(() => {
    if (!lastRoll?.win) return;

    setIsBouncing(true);
    playWin();
  }, [lastRoll?.win, playWin]);

  const onMoveStart = () => {
    playMove();
  };

  const onBounceEnd = () => {
    setIsBouncing(false);
  };

  return { playScroll, onMoveEnd, onMoveStart, onBounceEnd, isBouncing };
};
