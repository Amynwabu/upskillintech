#!/bin/bash
# Favicon Generation Script
# This script generates favicon files from icon-only.png with transparent backgrounds
# Requires ImageMagick to be installed: brew install imagemagick

# Generate 64x64 favicon
convert icon-only.png -resize 64x64 -background none -gravity center -extent 64x64 favicon-64x64.png

# Generate 48x48 favicon  
convert icon-only.png -resize 48x48 -background none -gravity center -extent 48x48 favicon-48x48.png

# Generate 256x256 Apple touch icon
convert icon-only.png -resize 256x256 -background none -gravity center -extent 256x256 apple-touch-icon-256.png

# Convert to ICO format
convert favicon-64x64.png favicon-48x48.png favicon.ico

echo "Favicon generation complete!"
echo "Generated files:"
echo "  - favicon-64x64.png (64x64 with transparent background)"
echo "  - favicon-48x48.png (48x48 with transparent background)"
echo "  - apple-touch-icon-256.png (256x256 with transparent background)"
echo "  - favicon.ico (multi-resolution ICO file)"
