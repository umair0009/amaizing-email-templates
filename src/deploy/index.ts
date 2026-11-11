import { getGitHubCIInfo } from "./github.js";
import type { CIInfo } from "./types.js";

export type * from "./types.js";

// Auto-detect and return appropriate CI info
export function getCIInfo(): CIInfo {
  if (process.env.GITHUB_ACTIONS) {
    return getGitHubCIInfo();
  }

  // Fallback for unknown/local environments
  return {
    isCommitted: null,
    isPR: false,
    isMerged: false,
    targetBranch: null,
    sourceBranch: null,
    currentBranch: null,
    stepSummaryFile: null,
  };
}
