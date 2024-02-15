"use client";

import { useEffect, useState } from "react";
import styles from "./TypingText.module.css";

export default function TypeText() {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [emojiClass, setEmojiClass] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const TYPING_SPEED = 200; // ms
  const DELAY_TIME = 2000; // ms
  const DELETING_SPEED = 100; // ms

  useEffect(() => {
    const words = [
      { word: "JH!", emoji: "👋", emojiClass: "wave" },
      { word: "Developer", emoji: "⚡️", emojiClass: "" },
    ];
    const { word, emoji, emojiClass } = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (charIndex < word.length) {
        timeout = setTimeout(() => {
          setText((prev) => prev + word[charIndex]);
          setCharIndex((index) => index + 1);
        }, TYPING_SPEED);
      } else {
        setEmoji(emoji);
        setEmojiClass(emojiClass);
        timeout = setTimeout(() => {
          setEmoji("");
          setEmojiClass("");
          setIsTyping(false);
        }, DELAY_TIME);
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
        I&apos;m{" "}
        <span className="text-white">
          {text}
          <span className={`text-6xl ml-2 ${styles[emojiClass]}`}>{emoji}</span>
        </span>
      </p>
    </h1>
  );
}
