"use client";

import { useEffect, useState } from "react";

export default function TypeText() {
  const [text, setText] = useState("");
  const [emojiData, setEmojiData] = useState({
    blink: true,
    emoji: "",
    emojiClass: "",
  });
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const TYPING_SPEED = 200;
  const DELETING_SPEED = 100;
  const DELAY_TIME = 2000;

  useEffect(() => {
    const texts = [
      { text: "JH!", emoji: "👋", emojiClass: "ml-3 mr-2 animate-wave" },
      {
        text: "Developer",
        emoji: "⚡️",
        emojiClass: "ml-1 -mr-2 animate-glitch",
      },
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
      timeout = setTimeout(
        () =>
          setEmojiData({
            blink: true,
            emoji: texts[wordIndex].emoji,
            emojiClass: texts[wordIndex].emojiClass,
          }),
        TYPING_SPEED
      );
      timeout = setTimeout(() => {
        setEmojiData({ blink: false, emoji: "", emojiClass: "" });
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

  const { blink, emoji, emojiClass } = emojiData;
  return (
    <div className="my-8">
      <h1 className="text-7xl font-black">
        Hello,
        <p>
          I&apos;m{" "}
          <span
            className={`relative after-cursor ${
              blink && "after:animate-blink"
            }`}
          >
            <span className="typing-text">{text}</span>
            <span className={`inline-block ${emojiClass}`}>{emoji}</span>
          </span>
        </p>
      </h1>
    </div>
  );
}
