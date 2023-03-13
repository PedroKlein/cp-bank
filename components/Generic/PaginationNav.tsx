import React, { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PageButtonProps = {
  content: React.ReactNode;
  onClick: () => void;
  active: boolean;
  disabled: boolean;
};

const PageButton: React.FC<PageButtonProps> = ({
  content,
  onClick,
  active,
  disabled,
}: PageButtonProps) => {
  return (
    <button
      className={`flex flex-col text-default cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? "bg-secondary" : "bg-primary"}
      ${
        !disabled
          ? "bg-primary hover:bg-neutral"
          : "bg-primary cursor-not-allowed"
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

type Props = {
  gotoPage: (pageIndex: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
};

const PaginationNav: React.FC<Props> = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) => {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;

    const visiblePageButtonCount = 3;

    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;

    const pageIndices = [pageIndex];

    numberOfButtons--;

    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });

    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <PageButton
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
          disabled={false}
        />
      </li>
    ));
  }, [pageCount, pageIndex]);

  return (
    <ul className="flex gap-2">
      <li>
        <PageButton
          content={
            <div className="flex ml-1">
              <FaChevronLeft size="0.6rem" />
              <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(0)}
          active={false}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <PageButton
          content={
            <div className="flex ml-1">
              <FaChevronRight size="0.6rem" />
              <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(pageCount - 1)}
          active={false}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  );
};

export default PaginationNav;
