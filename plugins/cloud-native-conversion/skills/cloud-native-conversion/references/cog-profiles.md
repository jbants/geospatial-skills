# COG Compression Profiles

Reference for `--cog-profile` in `rio cogeo create`.

## Profiles

| Profile | Algorithm | Best for |
|---------|-----------|----------|
| `deflate` | Deflate (zlib) | Continuous float: imagery, DEMs, climate grids |
| `lzw` | LZW | Byte/categorical: masks, land cover, binary |
| `zstd` | Zstandard | Maximum compression; requires GDAL ≥ 3.1 |
| `webp` | WebP | RGB/RGBA display tiles only; lossy |
| `raw` | None | When downstream tools cannot decode compressed GeoTIFF |

## Blocksize

Default 256. Use 512 for files > 500 MB or high-resolution imagery.

```bash
rio cogeo create INPUT.tif OUTPUT.tif --cog-profile deflate --blocksize 512
```

## Overview levels

`rio-cogeo` adds overviews automatically. For files > 2 GB, specify explicitly:

```bash
rio cogeo create INPUT.tif OUTPUT.tif --cog-profile deflate --overview-level 6
```

Level 6 produces overviews at factors 2, 4, 8, 16, 32, 64.

## Validation

```bash
rio cogeo validate OUTPUT.tif
```

Expected: `COG validation passed!`

A valid COG has tiled layout, overviews, and a ghost metadata block confirming COG structure.
