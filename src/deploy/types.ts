export interface CIInfo {
  isPR: boolean;

  /*
   * `true`/`false` for PRs, null otherwise
   */
  isMerged: boolean | null;

  /*
   * Direct push or PR resulted in merge
   */
  isCommitted: boolean | null;
  targetBranch: string | null;
  sourceBranch: string | null;
  currentBranch: string | null;
  stepSummaryFile: string | null;
}

export type ExtendedPageMata = P.PageMeta & {
  __create__?: boolean;
  __created__?: boolean;
  __update__?: boolean;
  __updated__?: boolean;
  __invalid__?: boolean;
  __content__: string;
  error?: string;
};
