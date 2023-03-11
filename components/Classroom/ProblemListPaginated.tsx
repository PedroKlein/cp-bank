import { Problem, ProblemTag } from "@prisma/client";
import React, { useState } from "react";
import useSWR from "swr";
import PaginationNav from "../Generic/PaginationNav";
import { Paginated } from "../../utils/api/paginate.utils";

type Props = {
  selectedTags: string[];
};

type PaginatedProblem = Paginated<
  Problem & {
    tags: ProblemTag[];
  }
>;

const ProblemListPaginated: React.FC<Props> = ({ selectedTags }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  const tagsQuery = selectedTags.reduce(
    (result, current) => result + `tags=${current}&`,
    ""
  );
  const { data: paginatedProblems } = useSWR<PaginatedProblem>(
    `/api/problem?page=${pageIndex + 1}&pageSize=${pageSize}&${tagsQuery}`
  );

  return (
    <div className="flex flex-col items-center">
      {paginatedProblems && (
        <PaginationNav
          gotoPage={setPageIndex}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < paginatedProblems.totalPages - 1}
          pageCount={paginatedProblems.totalPages}
          pageIndex={pageIndex}
        />
      )}
    </div>
  );
};

export default ProblemListPaginated;
