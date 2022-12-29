import React from "react";

const usePagination = (list: any[] | undefined) => {
  const page_count = Math.ceil((list?.length ?? 0) / 5);
  const page_numbers = [...Array(page_count + 1).keys()].slice(1);

  return page_numbers;
};

export default usePagination;
