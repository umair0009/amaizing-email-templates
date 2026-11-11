import type { CIInfo } from "./types.js";

export function getGitHubCIInfo(): CIInfo {
  const eventName = process.env.GITHUB_EVENT_NAME || "";
  const refName = process.env.GITHUB_REF_NAME || "";

  // 1. Determine if it's a PR context
  const isPR =
    eventName === "pull_request" || eventName === "pull_request_target";

  // 2. Determine isMerged logic:
  // - If it's a PR event, it's not merged yet (GitHub runs PRs on a preview merge ref).
  // - If it's a PUSH event, and we know it came from a PR (via GITHUB_REF), it's merged.
  // - Otherwise, if it's not a PR-related event at all, we return null.
  let isMerged: boolean | null = null;

  if (isPR) {
    isMerged = false;
  } else if (eventName === "push") {
    // In a push event, if it's the result of a PR, it's considered merged.
    // Note: Distinguishing a "direct push" from a "merge push" purely via env vars
    // is tricky, but in workflow terms, 'push' is the post-merge state.
    isMerged = true;
  }

  // 3. Determine isCommit:
  // This is true if the code has landed on a branch (direct push or PR merge).
  const isCommit = eventName === "push";

  return {
    isPR,
    isMerged,
    isCommitted: isCommit,
    targetBranch: process.env.GITHUB_BASE_REF || refName || null,
    sourceBranch: process.env.GITHUB_HEAD_REF || null,
    currentBranch: refName || null,
    stepSummaryFile: process.env.GITHUB_STEP_SUMMARY || null,
  };
}
