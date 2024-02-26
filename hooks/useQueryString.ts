import { usePathname, useSearchParams } from "next/navigation";

export default function useQueryString(
  name: string,
  values: string[] | string
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const valuesArray = Array.isArray(values) ? values : [values];

  const params = new URLSearchParams(searchParams.toString());
  params.delete(name);
  valuesArray.forEach((value) => params.append(name, value));

  return `${pathname}?${params.toString()}`;
}
