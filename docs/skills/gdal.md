---
template: skill.html
title: GDAL
slug: gdal
tag: RASTER+VECTOR
install_skill: gdal
upstream:
  - label: microsoft/ai4eutils geospatial recipes
    href: https://github.com/microsoft/ai4eutils/blob/master/geospatial/recipes_and_guides/geospatial_recipes.md
license: Apache-2.0
requires: GDAL on PATH
summary: >-
  Command-line workflows for raster and vector geospatial processing. Wraps the
  GDAL/OGR toolchain with conventions an agent can reliably reach for &mdash;
  reprojection, clipping, format translation, and metadata reads &mdash; without
  reinventing flags.
features:
  - "Inspect with <code>gdalinfo</code> / <code>ogrinfo</code>"
  - Reproject rasters and vectors between any CRS pair
  - "Clip rasters by cutline (<code>gdalwarp -cutline</code>) or vectors by bbox / geometry"
  - "Convert formats and band-subset (<code>gdal_translate</code>, <code>ogr2ogr</code>)"
  - "Build mosaics with <code>gdalbuildvrt</code> + <code>gdal_translate</code>"
  - "Rasterize vectors and tile rasters (<code>gdal_rasterize</code>, <code>gdal2tiles.py</code>)"
  - "Emit Cloud-Optimized GeoTIFFs with <code>-of COG</code>"
example_html: |
  <span class="com"># reproject a GeoTIFF</span>
  <span class="dim">$</span> gdalwarp -t_srs <span class="arg">epsg:4326</span> INPUT.tif OUTPUT.tif

  <span class="com"># build a mosaic and write a compressed GeoTIFF</span>
  <span class="dim">$</span> gdalbuildvrt OUTPUT.vrt <span class="arg">path/to/tiffs/*.tif</span>
  <span class="dim">$</span> gdal_translate -co COMPRESS=LZW -co PREDICTOR=2 \
      -co BIGTIFF=YES OUTPUT.vrt OUTPUT.tif

  <span class="com"># write a Cloud-Optimized GeoTIFF directly</span>
  <span class="dim">$</span> gdalwarp -of <span class="arg">COG</span> -co COMPRESS=LZW -co PREDICTOR=2 \
      INPUT.tif OUTPUT.tif
next:
  slug: geoparquet-validation
  name: GeoParquet Validation
---
