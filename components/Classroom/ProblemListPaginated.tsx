import { Problem, ProblemTag } from "@prisma/client";
import React, { useState } from "react";
import useSWR from "swr";
import PaginationNav from "../Generic/PaginationNav";

type Props = {
  selectedTags: string[];
};

type PaginatedProblem = Problem & {
  tags: ProblemTag[];
};

const ProblemListPaginated: React.FC<Props> = ({ selectedTags }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const tagsQuery = selectedTags.reduce(
    (result, current) => result + `tags=${current}&`,
    ""
  );
  const { data: paginatedProblems } = useSWR<PaginatedProblem>(
    `/api/problem?${tagsQuery}`
  );

  console.log(paginatedProblems);

  return (
    <div>
      {/* <PaginationNav
        gotoPage={setPageIndex}
        canPreviousPage={pageIndex > 0}
        canNextPage={pageIndex < pageCount - 1}
        pageCount={pageCount}
        pageIndex={pageIndex}
      /> */}
    </div>
  );
};

export default ProblemListPaginated;
