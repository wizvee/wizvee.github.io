"use client";

import { useEffect, useState } from "react";
import styles from "./TypingText.module.css";

export default function TypeText() {
  const [text, setText] = useState("");
  const [emojiData, setEmojiData] = useState({ emoji: "", emojiClass: "" });
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const TYPING_SPEED = 200;
  const DELETING_SPEED = 100;
  const DELAY_TIME = 2000;

  useEffect(() => {
    const texts = [
      { text: "JH!", emoji: "👋", emojiClass: "wave" },
      { text: "Developer", emoji: "⚡️", emojiClass: "lighting" },
    ];
    const currentText = texts[wordIndex].text;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      setText(currentText.substring(0, text.length + 1));
    };

    const deleteText = () => {
      setText(currentText.substring(0, text.length - 1));
    };

    if (!isDeleting && text === currentText) {
      setEmojiData({
        emoji: texts[wordIndex].emoji,
        emojiClass: texts[wordIndex].emojiClass,
      });
      timeout = setTimeout(() => {
        setEmojiData({ emoji: "", emojiClass: "" });
        setIsDeleting(true);
      }, DELAY_TIME);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prevIndex) => (prevIndex + 1) % texts.length);
    } else if (isDeleting) {
      timeout = setTimeout(deleteText, DELETING_SPEED);
    } else {
      timeout = setTimeout(type, TYPING_SPEED);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  const { emoji, emojiClass } = emojiData;
  return (
    <h1 className="text-7xl font-black">
      Hello,
      <p>
        I&apos;m{" "}
        <span className="text-white">
          {text}
          <span
            className={`inline-block text-6xl ml-2 ${styles[emojiClass] || ""}`}
          >
            {emoji}
          </span>
        </span>
      </p>
    </h1>
  );
}
