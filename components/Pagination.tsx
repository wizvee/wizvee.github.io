import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  previous: string;
  next: string;
}

function NavButton({ path, text }: { path: string; text: string }) {
  return (
    <Link href={path} className={path ? "" : "cursor-not-allowed"}>
      {text}
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  previous,
  next,
}: Props) {
  return (
    <div>
      <NavButton path={previous} text="Previous" />
      <span>{`${currentPage} / ${totalPages}`}</span>
      <NavButton path={next} text="Next" />
    </div>
  );
}
