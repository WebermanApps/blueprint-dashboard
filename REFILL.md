# Blueprint R66 deck request + refill

Kit: `style-swipe` commit 79aff73 (`kit/deck-launcher.js`).

## On deck-request (MWSubmit app=deck-launcher)
1. `bash /workspace/ops/submit/pull.sh blueprint`
2. Read newest non-test payload with `results.type == "deck-request"`.
3. From style-swipe root:
   ```
   python3 tools/build_blueprint_r66.py blueprint-r66-<stamp> "Blueprint: <cats>" <seed> <cat,cat,...>
   python3 tools/blueprint_r66_ready.py blueprint-r66-<stamp> "Blueprint: <cats>" <cat,cat,...>
   ```
4. Publish style-swipe (decks/) and blueprint-dashboard (launcher.json).

## After each real Style Swipe submit for Blueprint
1. Drop answered cards (R61). Reword skipped cards (R64); put unanswered first.
2. Rebuild a fresh 20-card deck in the **same categories**.
3. Set `ready` via `blueprint_r66_ready.py` so the launcher shows **Ready · Open**.

Existing Blueprint Swipe room decks keep their current card counts until an explicit resize.
