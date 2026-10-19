#!/usr/bin/env bash
# Downloads imagery + fonts for the MASLOC website build.
# - Photos: Pexels CDN (free license), resized server-side, delivered as WebP.
# - Fonts: Google Fonts woff2, latin + latin-ext subsets, self-hosted.
set -euo pipefail
cd "$(dirname "$0")/.."

IMG_DIR="assets/img/photos"
FONT_DIR="assets/fonts"
mkdir -p "$IMG_DIR" "$FONT_DIR"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

# name:photo_id pairs — all IDs verified HTTP 200 image/* prior to this build.
IMAGES=(
  "hero-market:36537041"
  "couple-market:13571548"
  "onion-vendor:29116179"
  "fruit-vendor:38221118"
  "kumasi-craft:27946460"
  "portrait-man:33724021"
  "urban-youth:35844067"
  "cocoa-farmer:31283907"
  "cocoa-hands:31283915"
  "cocoa-drying:31283901"
  "fishing-beach:37470490"
  "fishing-harbor:37575632"
  "fishing-aerial:10228155"
  "fishing-senya:32368908"
  "market-wheelbarrow:36537194"
  "market-scene:38519872"
  "market-fruits:39597906"
  "seamstress:36534932"
  "tailors-workshop:30487814"
  "kumasi-tailor:28038435"
  "woman-entrepreneur:39680008"
  "two-women:34330968"
  "accra-aerial:30035716"
)

echo "== Downloading photos =="
for pair in "${IMAGES[@]}"; do
  name="${pair%%:*}"
  id="${pair##*:}"
  for w in 400 800 1600; do
    out="$IMG_DIR/${name}-${w}.webp"
    [ -f "$out" ] && continue
    url="https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=$w&fm=webp"
    code=$(curl -sL -A "$UA" -o "$out" -w '%{http_code}' "$url")
    if [ "$code" != "200" ] || [ ! -s "$out" ]; then
      echo "FAIL $name@$w ($code)" >&2; rm -f "$out"; exit 1
    fi
  done
done

echo "== Downloading fonts =="
fetch_family () {
  local query="$1" slug="$2"
  curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=$query&display=swap" -o "/tmp/$slug.css"
  # keep only latin / latin-ext blocks
  python3 - "$slug" <<'PY'
import re, sys, subprocess, pathlib
slug = sys.argv[1]
css = pathlib.Path(f"/tmp/{slug}.css").read_text()
blocks = re.split(r'/\*\s*([a-z-]+)\s*\*/', css)
out = []
for i in range(1, len(blocks), 2):
    subset, body = blocks[i], blocks[i+1]
    if subset not in ("latin", "latin-ext"):
        continue
    m = re.search(r'url\((https://[^)]+\.woff2)\)', body)
    if not m:
        continue
    url = m.group(1)
    fname = f"{slug}-{subset}.woff2"
    dest = pathlib.Path("assets/fonts") / fname
    if not dest.exists() or dest.stat().st_size == 0:
        subprocess.run(["curl", "-sL", "-o", str(dest), url], check=True)
    body = body.replace(url, f"../fonts/{fname}")
    out.append(body.strip())
pathlib.Path(f"/tmp/{slug}.final.css").write_text("\n".join(out))
print(f"{slug}: {len(out)} faces")
PY
}

fetch_family "Manrope:wght@400..800" "manrope"
fetch_family "Fraunces:opsz,wght@9..144,300..700" "fraunces"

cat /tmp/manrope.final.css /tmp/fraunces.final.css > assets/fonts/fonts.css
echo "== Done =="
du -sh "$IMG_DIR" "$FONT_DIR"
