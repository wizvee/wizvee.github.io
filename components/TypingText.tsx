"use client";

import { useEffect, useState } from "react";

export default function TypeText() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const TYPING_SPEED = 200; // ms
  const DELAY_TIME = 1000; // ms
  const DELETING_SPEED = 100; // ms

  useEffect(() => {
    const words = ["JH!", "a developer"];
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (charIndex < word.length) {
        timeout = setTimeout(() => {
          setText((prev) => prev + word[charIndex]);
          setCharIndex((index) => index + 1);
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => setIsTyping(false), DELAY_TIME);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
          setCharIndex((index) => index - 1);
        }, DELETING_SPEED);
      } else {
        setWordIndex((index) => (index + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [wordIndex, charIndex, isTyping]);

  return (
    <h1 className="text-7xl font-black">
      Hello,
      <p>
        I&apos;m <span className="text-white">{text}</span>
      </p>
    </h1>
  );
}
