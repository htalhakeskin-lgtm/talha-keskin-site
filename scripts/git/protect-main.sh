#!/usr/bin/env bash
# Rejects pushes that target main directly (15-git-ve-ci §2). Reads git's pre-push stdin:
# <local ref> <local sha> <remote ref> <remote sha>, one line per ref being pushed.
# Single exception: the very first push that CREATES main on an empty remote (remote sha is all
# zeros). Every later push to main is rejected; the GitHub ruleset enforces the same on the server.
set -euo pipefail

while read -r _local_ref _local_sha remote_ref remote_sha; do
  if [[ "$remote_ref" == "refs/heads/main" ]]; then
    if [[ "$remote_sha" =~ ^0+$ ]]; then
      echo "ℹ main uzak depoda ilk kez oluşturuluyor; bundan sonra main'e doğrudan push reddedilir." >&2
      continue
    fi
    echo "✖ main dalına doğrudan push yapılamaz. Bir dal açın ve PR ile birleştirin." >&2
    exit 1
  fi
done

exit 0
