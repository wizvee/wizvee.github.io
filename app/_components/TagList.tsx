"use client";

import { useCallback, useMemo } from "react";
import { Tag } from "@/app/_lib/api";
import { useRouter } from "next/navigation";

interface TagProps {
  tag: string;
  isSelected: boolean;
  isSelectable: boolean;
  onToggle: (tag: string, isSelected: boolean) => void;
}

function Tag({ tag, isSelected, isSelectable, onToggle }: TagProps) {
  const disabled = !isSelected && !isSelectable;

  return (
    <button
      className={`m-1 px-2 py-1 button ${isSelected ? "bg-yellow-500" : ""} ${
        disabled
          ? "border-gray-500 text-gray-500 cursor-not-allowed"
          : "hover:box-shadow"
      }`}
      onClick={() => onToggle(tag, !isSelected)}
      disabled={disabled}
    >
      {tag}
    </button>
  );
}

interface TagListProps {
  tags: Tag[];
  selectedTags: string[];
}

export default function TagList({ tags, selectedTags }: TagListProps) {
  const selectableTags = useMemo(() => {
    return tags.reduce((acc: string[], { tag, relatedTags }) => {
      if (selectedTags.includes(tag)) {
        return acc.length === 0
          ? relatedTags
          : acc.filter((t) => relatedTags.includes(t));
      }
      return acc;
    }, []);
  }, [tags, selectedTags]);

  const isSelectable = useCallback(
    (tag: string) => {
      const notSelected =
        selectedTags.length === 0 && selectableTags.length === 0;
      return notSelected || selectableTags.includes(tag);
    },
    [selectedTags, selectableTags]
  );

  const isSelected = useCallback(
    (tag: string) => selectedTags.includes(tag),
    [selectedTags]
  );

  const router = useRouter();
  const toggleTag = useCallback(
    (tag: string, isSelected: boolean) => {
      const newTags = isSelected
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
      const newParams = new URLSearchParams(newTags.map((tag) => ["tag", tag]));
      router.push(`?${newParams}`);
    },
    [router, selectedTags]
  );

  return (
    <section className="flex justify-center">
      {tags.map(({ tag }) => (
        <Tag
          key={tag}
          tag={tag}
          isSelectable={isSelectable(tag)}
          isSelected={isSelected(tag)}
          onToggle={toggleTag}
        />
      ))}
    </section>
  );
}
