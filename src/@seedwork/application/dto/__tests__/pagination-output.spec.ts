import { SearchResult } from "../../../../@seedwork/domain/repository/repository-contracts";
import { PaginationOutputMapper } from "../pagination-input";

describe("PaginationOutputMapper Unit Tests", () => {
  it("should convert a SearchResult in output", () => {
    const result = new SearchResult({
      items: ["fake"] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: "name",
      sortDir: "desc",
      filter: "fake",
    });

    const output = PaginationOutputMapper.toOutput(result);
    expect(output).toStrictEqual({
      total: 1,
      currentPage: 1,
      perPage: 1,
      lastPage: 1,
    });
  });
});
