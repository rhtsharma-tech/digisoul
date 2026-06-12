#!/bin/bash
# scripts/ci-local.sh - Run this before pushing to catch CI errors locally
# Usage: npm run ci or bash scripts/ci-local.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Running local CI simulation...${NC}"
echo ""

# Track failures
FAILED=0

run_step() {
  local step_name="$1"
  local step_cmd="$2"
  
  echo -e "${YELLOW}▶ $step_name${NC}"
  if eval "$step_cmd"; then
    echo -e "${GREEN}✓ $step_name passed${NC}"
  else
    echo -e "${RED}✗ $step_name failed${NC}"
    FAILED=1
  fi
  echo ""
}

# 1. Install dependencies
run_step "Installing dependencies" "npm install --legacy-peer-deps"

# 2. Lint all packages
run_step "Linting all packages" "npm run lint"

# 3. Build shared package (required by web)
run_step "Building shared package" "npm run build --workspace=packages/shared"

# 4. Build web package
run_step "Building web package" "npm run build --workspace=packages/web"

# 5. Verify build output
run_step "Verifying web build output" '[ -d "packages/web/.next" ]'

# 6. Run tests (if foundry is available)
if command -v forge &> /dev/null; then
  run_step "Running contract tests" "cd packages/contracts && forge test"
else
  echo -e "${YELLOW}⚠ Skipping contract tests (forge not found)${NC}"
  echo ""
fi

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All checks passed! Safe to push.${NC}"
  exit 0
else
  echo -e "${RED}❌ Some checks failed. Fix errors before pushing.${NC}"
  exit 1
fi
