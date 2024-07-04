"use client";

import EmptyState from "@/app/components/EmptyState";
import Searchbar from "@/app/components/Searchbar";
import TaleCard from "@/app/components/TaleCard";
import TaleCardSkeleton from "@/app/components/TaleCardSkeleton";
import { api } from "@/convex/_generated/api";
import { TalesData, PAGE_SIZE } from "@/Types/index";
import { useQuery } from "convex/react";
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

const Discover = ({
  searchParams: { search = "", page = "1" },
}: {
  searchParams: { search?: string; page?: string };
}) => {
  const router = useRouter();

  // Parse the page parameter to a number
  const parsedPage = parseInt(page, 10);
  const talesData = useQuery(api.tales.getTaleBySearch, {
    search,
    page: parsedPage,
  });

  const { results = [], totalCount = 0 } = (talesData as TalesData) || {};

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
    if (talesData && totalCount > 0) {
      pages.push(
        <PaginationItem key={parsedPage}>
          <PaginationLink isActive={true} href="">
            {parsedPage}
          </PaginationLink>
        </PaginationItem>
      );
      if (totalCount >= parsedPage * PAGE_SIZE + 1) {
        pages.push(
          <PaginationItem key={parsedPage + 1}>
            <PaginationLink href="" onClick={handleGoToPage(parsedPage + 1)}>
              {parsedPage + 1}
            </PaginationLink>
          </PaginationItem>
        );
        if (totalCount > parsedPage * PAGE_SIZE + PAGE_SIZE + 1) {
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

  const shouldShowPagination = talesData && totalCount > 0 && totalCount >= 2;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Discover</h1>
      <Searchbar />
      {talesData ? (
        <>
          {totalCount > 0 ? (
            <>
              <div className="tale_grid">
                {results.map(
                  ({ _id, taleTitle, taleDescription, imageUrl }) => (
                    <TaleCard
                      key={_id}
                      taleId={_id}
                      title={taleTitle}
                      description={taleDescription}
                      imgUrl={imageUrl ?? ""}
                    />
                  )
                )}
              </div>
              {shouldShowPagination && (
                <Pagination
                  className="absolute bottom-5 w-5/6 left-1/2"
                  style={{ transform: "translate(-50%, 0)" }}
                >
                  <PaginationContent>
                    {parsedPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href=""
                          onClick={handlePreviousPage}
                        />
                      </PaginationItem>
                    )}
                    {renderPaginationLinks()}
                    {totalCount >= parsedPage * PAGE_SIZE + 1 && (
                      <PaginationItem>
                        <PaginationNext href="" onClick={handleNextPage} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <EmptyState title="No results found" />
          )}
        </>
      ) : (
        <div className="tale_grid">
          <TaleCardSkeleton count={8} />
        </div>
      )}
    </div>
  );
};

export default Discover;
