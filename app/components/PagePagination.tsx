import React from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationComponentProps = {
  search: string;
  parsedPage: number;
  totalCount: number;
  pageSize: number;
};

const PagePagination: React.FC<PaginationComponentProps> = ({
  search,
  parsedPage,
  totalCount,
  pageSize,
}) => {
  const router = useRouter();

  const handleNextPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const nextPage = parsedPage + 1;
    router.push(`/discover?search=${search}&page=${nextPage}`);
  };

  const handlePreviousPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (parsedPage > 1) {
      const prevPage = parsedPage - 1;
      router.push(`/discover?search=${search}&page=${prevPage}`);
    }
  };

  const handleGoToPage =
    (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      router.push(`/discover?search=${search}&page=${page}`);
    };

  const renderPaginationLinks = () => {
    const pages = [];
    if (parsedPage > 2) {
      pages.push(
        <PaginationItem key="ellipsis-prev">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    if (parsedPage > 1) {
      pages.push(
        <PaginationItem key={parsedPage - 1}>
          <PaginationLink href="" onClick={handleGoToPage(parsedPage - 1)}>
            {parsedPage - 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (totalCount > 0) {
      pages.push(
        <PaginationItem key={parsedPage}>
          <PaginationLink isActive={true} href="">
            {parsedPage}
          </PaginationLink>
        </PaginationItem>
      );
      if (totalCount >= parsedPage * pageSize + 1) {
        pages.push(
          <PaginationItem key={parsedPage + 1}>
            <PaginationLink href="" onClick={handleGoToPage(parsedPage + 1)}>
              {parsedPage + 1}
            </PaginationLink>
          </PaginationItem>
        );
        if (totalCount > parsedPage * pageSize + pageSize + 1) {
          pages.push(
            <PaginationItem key="ellipsis-next">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
      }
    }
    return pages;
  };

  const shouldShowPagination = totalCount > 0 && totalCount >= 2;

  return (
    shouldShowPagination && (
      <Pagination
        className="absolute bottom-5 w-5/6 left-1/2"
        style={{ transform: "translate(-50%, 0)" }}
      >
        <PaginationContent>
          {parsedPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href="" onClick={handlePreviousPage} />
            </PaginationItem>
          )}
          {renderPaginationLinks()}
          {totalCount >= parsedPage * pageSize + 1 && (
            <PaginationItem>
              <PaginationNext href="" onClick={handleNextPage} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  );
};

export default PagePagination;
