# Design: cloud-native-conversion skill

Date: 2026-06-11
Author: James Banting

## Problem

Agents working with geospatial data default to legacy formats (GeoTIFF, Shapefile, GeoJSON) even when the data will be served from object storage or consumed by cloud-native tools. There is no single skill that says "convert whatever you have to the cloud-native equivalent."

The existing `gdal` skill mentions COG as one command among many. The `geoparquet-validation` skill focuses on inspection and validation, not conversion. Neither covers the conversion-first workflow or enforces cloud-native defaults.

## Goal

A skill that an agent loads when asked to "convert to cloud-native", "make this COG", or "convert to GeoParquet". It routes by input type, applies best-practice defaults automatically, and defers post-conversion validation to the existing `geoparquet-validation` skill.

## Scope

- **Raster → COG** via `rio-cogeo`
- **Vector → GeoParquet** via `gpio`
- Out of scope: point clouds (COPC/PDAL), tile pyramids (PMTiles/tippecanoe), multidimensional arrays (GeoZarr — separate skill)

## Tool choices

| Format | Tool | Reason |
|--------|------|--------|
| COG | `rio-cogeo` | Purpose-built; enforces tiling, overviews, and valid COG layout by default |
| GeoParquet | `gpio` | Applies Hilbert ordering, ZSTD compression, and 100k row groups automatically |

GDAL is used only for initial format detection (`gdalinfo`/`ogrinfo`).

## Skill workflow (SKILL.md)

1. **Detect** — `gdalinfo INPUT` to distinguish raster from vector/unknown
2. **Raster path**
   - Default profile: `deflate` (continuous data) or `lzw` (categorical/byte)
   - `rio cogeo create INPUT.tif OUTPUT.tif --cog-profile deflate`
   - Float/multi-band data: add `--blocksize 512`
   - Validate: `rio cogeo validate OUTPUT.tif`
3. **Vector path**
   - `gpio convert INPUT OUTPUT.parquet` (all best-practice defaults applied automatically)
   - Quick inspect: `gpio inspect OUTPUT.parquet`
   - Deeper validation: defer to `geoparquet-validation` skill
4. **Decision rules** baked in:
   - Large rasters (>1 GB): add `--overview-level 6`
   - Already-projected CRS: preserve as-is, do not reproject
   - Non-GeoTIFF rasters: translate to GeoTIFF first with `gdal_translate`, then cogeo

## Reference docs

- `references/cog-profiles.md` — compression profiles by data type, blocksize guidance, overview levels
- `references/vector-formats.md` — gpio input format support, edge cases (large files, mixed geometry, CRS handling)

## Site catalog additions

- `skills/cloud-native-conversion/SKILL.md` — agent-facing skill
- `skills/cloud-native-conversion/references/cog-profiles.md`
- `skills/cloud-native-conversion/references/vector-formats.md`
- `docs/skills/cloud-native-conversion.md` — catalog page (tag: CLOUD-NATIVE, packaged_by: jbanting)
- `overrides/home.html` — new catalog row, count 06 → 07
- `mkdocs.yml` — nav entry under Skills
- `.claude-plugin/marketplace.json` — new plugin entry

## Boundaries with existing skills

- `gdal` skill: COG is still mentioned there as a quick recipe; this skill owns the conversion workflow
- `geoparquet-validation` skill: this skill calls out to it explicitly for post-conversion validation
- `geozarr` skill: out of scope here; refer users there for Zarr output
