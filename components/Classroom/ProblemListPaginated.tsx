import { Problem, ProblemTag } from "@prisma/client";
import React, { useState } from "react";
import useSWR from "swr";
import PaginationNav from "../Generic/PaginationNav";
import { Paginated } from "../../utils/api/paginate.utils";
import ProblemItem from "../Problem/ProblemItem";
import { ProblemWithTag } from "../../@types/problem.types";

type Props = {
  selectedTags: string[];
  selectedProblems: string[];
  onSelect: (problemId: string) => void;
};

type PaginatedProblem = Paginated<ProblemWithTag>;

const ProblemListPaginated: React.FC<Props> = ({
  selectedTags,
  selectedProblems,
  onSelect,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 4;
  const tagsQuery = selectedTags.reduce(
    (result, current) => result + `tags=${current}&`,
    ""
  );
  const { data: paginatedProblems } = useSWR<PaginatedProblem>(
    `/api/problem?page=${pageIndex + 1}&pageSize=${pageSize}&${tagsQuery}`
  );

  return (
    <div className="flex flex-col items-center w-full">
      {paginatedProblems && (
        <div className="flex flex-col items-center gap-1 w-full">
          <ul className="flex flex-col gap-2 w-full">
            {paginatedProblems.items.map((p) => (
              <div key={p.id} className="flex flex-row gap-1 items-center">
                <input
                  checked={selectedProblems.includes(p.id)}
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => onSelect(p.id)}
                />
                <div className="flex-grow">
                  <ProblemItem problem={p} />
                </div>
              </div>
            ))}
          </ul>
          <PaginationNav
            gotoPage={setPageIndex}
            canPreviousPage={pageIndex > 0}
            canNextPage={pageIndex < paginatedProblems.totalPages - 1}
            pageCount={paginatedProblems.totalPages}
            pageIndex={pageIndex}
          />
        </div>
      )}
    </div>
  );
};

export default ProblemListPaginated;
