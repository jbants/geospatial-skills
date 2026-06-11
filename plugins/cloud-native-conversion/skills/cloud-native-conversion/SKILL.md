---
name: cloud-native-conversion
description: Convert raster or vector geospatial data to cloud-native formats. Use when converting to COG (Cloud-Optimized GeoTIFF), converting to GeoParquet, or asked to "make this cloud-optimized", "convert to cloud-native", or "optimize for object storage". Covers rio-cogeo for rasters and gpio for vectors.
---

# Cloud-Native Conversion Skill

Convert geospatial data to cloud-native formats: Cloud-Optimized GeoTIFF (COG) for rasters and GeoParquet for vectors.

## Tools

- `rio cogeo` (`rio-cogeo`) — raster → COG
- `gpio` (`geoparquet-io`) — vector → GeoParquet
- `gdalinfo` / `ogrinfo` — format detection

Install if missing:

```bash
# rio-cogeo
pip install rio-cogeo
# or
uv pip install rio-cogeo

# gpio
pip install --pre geoparquet-io
# or
uv pip install --pre geoparquet-io
```

## Workflow

### 1. Detect input type

```bash
gdalinfo INPUT_FILE
```

- Output shows bands / raster grid → **raster path**
- gdalinfo fails → try `ogrinfo INPUT_FILE -so` → **vector path**

### 2. Raster path — convert to COG

```bash
rio cogeo create INPUT.tif OUTPUT_cog.tif --cog-profile deflate
```

**Profile selection** (see `references/cog-profiles.md`):
- Continuous float (imagery, DEM, temperature): `--cog-profile deflate`
- Byte/categorical (masks, land cover): `--cog-profile lzw`
- Maximum compression: `--cog-profile zstd`

**Large or multi-band files:**
```bash
rio cogeo create INPUT.tif OUTPUT_cog.tif --cog-profile deflate --blocksize 512 --overview-level 6
```

**Non-GeoTIFF rasters:** translate first, then convert:
```bash
gdal_translate INPUT.nc TEMP.tif
rio cogeo create TEMP.tif OUTPUT_cog.tif --cog-profile deflate
```

**Validate:**
```bash
rio cogeo validate OUTPUT_cog.tif
```

### 3. Vector path — convert to GeoParquet

```bash
gpio convert geoparquet INPUT OUTPUT.parquet
```

`gpio` applies cloud-native defaults automatically:
- Hilbert spatial ordering
- ZSTD compression, level 15
- 100,000 row group size
- GeoParquet 1.1 metadata

**Quick inspect:**
```bash
gpio inspect OUTPUT.parquet
```

For deeper validation (spec requirements, auto-fix), defer to the `geoparquet-validation` skill.

## Decision rules

| Situation | Action |
|-----------|--------|
| Float32/Float64 raster | `--cog-profile deflate` |
| Byte/UInt8/Int16 raster | `--cog-profile lzw` |
| File > 1 GB | Add `--blocksize 512 --overview-level 6` |
| Non-GeoTIFF raster | `gdal_translate` first, then cogeo |
| Input already a COG | Run `rio cogeo validate`; skip reconversion |
| Input already GeoParquet | Run `gpio inspect`; defer to geoparquet-validation |
| CRS not EPSG:4326 | Preserve as-is unless user asks to reproject |

## References

- `references/cog-profiles.md` — compression profile guidance by data type
- `references/vector-formats.md` — gpio input format support and edge cases
