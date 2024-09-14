/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  noOfCards: number;
  pageSize: number;
}

const PaginationComponent = ({ noOfCards, pageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("page");

  // Track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);
  const [page, setPage] = useState<number>(() => Number(pageQuery) || 1);

  useEffect(() => {
    setIsMounted(true); // Component has mounted on client side
  }, []);

  useEffect(() => {
    if (isMounted) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: page?.toString(),
      });
      router.push(newUrl, { scroll: false });
    }
  }, [page, pathname, router, searchParams, pageQuery, isMounted]);

  // Render only when the component has mounted
  if (!isMounted) {
    return null; // or a skeleton loader if preferred
  }

  return (
    <div className="text-light400_light500 mt-16 ">
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
            className={` ${page > 1 ? "cursor-pointer" : ""}`}
          >
            <PaginationPrevious />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink className="bg-primary-500 text-white">
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem
            onClick={() =>
              setPage((prev) =>
                prev + 1 <= Math.ceil(noOfCards / pageSize) ? prev + 1 : prev
              )
            }
            className={`${page + 1 <= Math.ceil(noOfCards / pageSize) ? "cursor-pointer" : ""}`}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
