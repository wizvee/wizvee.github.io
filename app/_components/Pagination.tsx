import Link from "next/link";

function NavButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className={href ? "" : "cursor-not-allowed"}>
      {text}
    </Link>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  previousPage,
  nextPage,
}: PaginationProps) {
  return (
    <div>
      <NavButton href={previousPage} text="Previous" />
      <span>{`${currentPage} / ${totalPages}`}</span>
      <NavButton href={nextPage} text="Next" />
    </div>
  );
}
