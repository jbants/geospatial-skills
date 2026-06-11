# Vector Formats and gpio

Reference for `gpio convert geoparquet` input support and edge cases.

## Supported input formats

`gpio` accepts any format readable by GeoPandas / Fiona:

| Format | Extension | Notes |
|--------|-----------|-------|
| GeoPackage | `.gpkg` | Preferred for multi-layer data |
| FlatGeobuf | `.fgb` | Already indexed; gpio re-sorts by Hilbert |
| GeoJSON | `.geojson` | Slow for large files; prefer FGB or GPKG |
| Shapefile | `.shp` | Pass the `.shp` path; sidecar files read automatically |
| CSV with WKT | `.csv` | Use `--geometry-column` if column is not named `geometry` |

## Edge cases

**Mixed geometry types:**
gpio writes a `GeometryCollection` column. Valid GeoParquet; check downstream tool support.

**Large files (> 1 GB):**
Partition first with `gpio partition kdtree` (geoparquet-validation skill), then convert each partition.

**CRS handling:**
gpio preserves source CRS. Do not reproject during conversion unless explicitly asked.

**No geometry column:**
gpio will fail. Verify with `ogrinfo INPUT -so` before converting.

## When to use GDAL instead

Use `ogr2ogr` when:
- The format is not supported by GeoPandas/Fiona (some proprietary formats)
- Reprojection or SQL filtering is needed during conversion

After `ogr2ogr` writes GeoPackage or FlatGeobuf, re-run `gpio convert geoparquet` to apply GeoParquet defaults.
