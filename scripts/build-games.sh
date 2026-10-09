#!/bin/sh
# Build the games (local projects in ~/workspace/games, or $GAMES_DIR) into public/games/<slug>/.
# They are plain static files; Cloudflare serves them with the site. Saves stay in the player's browser.
# Run after changing a game, then commit public/games and push.
set -e
G=${GAMES_DIR:-$HOME/workspace/games}
OUT=$(cd "$(dirname "$0")/.." && pwd)/public/games
(cd "$G/qucik-phone-game/web" && VITE_LOCAL_SAVES=1 npx vite build --base=/games/kasap/ --outDir "$OUT/kasap" --emptyOutDir)
(cd "$G/suprise" && npx vite build --outDir "$OUT/yorunge" --emptyOutDir)
(cd "$G/spaceGame" && npx vite build --base=/games/nebula/ --outDir "$OUT/nebula" --emptyOutDir)
