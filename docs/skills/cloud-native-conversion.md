---
template: skill.html
title: Cloud-Native Conversion
slug: cloud-native-conversion
tag: CLOUD-NATIVE
install_skill: cloud-native-conversion
packaged_by: jbanting
upstream:
  - label: cogeotiff/rio-cogeo
    href: https://github.com/cogeotiff/rio-cogeo
  - label: geoparquet-io/geoparquet-io
    href: https://github.com/geoparquet-io/geoparquet-io
license: Apache-2.0
requires: <code>rio-cogeo</code> for rasters; <code>gpio</code> for vectors; GDAL on PATH for detection
summary: >-
  Convert raster and vector data to cloud-native formats with sensible defaults.
  Routes by input type &mdash; rasters become Cloud-Optimized GeoTIFFs via
  <code>rio-cogeo</code>, vectors become GeoParquet via <code>gpio</code> &mdash;
  with compression, tiling, and spatial ordering applied automatically.
features:
  - Detect raster vs vector automatically with <code>gdalinfo</code> / <code>ogrinfo</code>
  - 'Raster &rarr; COG: <code>rio cogeo create</code> with deflate / lzw / zstd profile selection'
  - Tiled layout, overviews, and COG ghost metadata applied automatically by rio-cogeo
  - 'Validate COG output: <code>rio cogeo validate</code>'
  - 'Vector &rarr; GeoParquet: <code>gpio convert geoparquet</code> with Hilbert ordering, ZSTD compression, 100k row groups'
  - Defers post-conversion validation to the geoparquet-validation skill
example_html: |
  <span class="com"># raster &rarr; Cloud-Optimized GeoTIFF</span>
  <span class="dim">$</span> rio cogeo create <span class="arg">input.tif</span> <span class="arg">output_cog.tif</span> --cog-profile <span class="arg">deflate</span>
  <span class="dim">$</span> rio cogeo validate <span class="arg">output_cog.tif</span>

  <span class="com"># vector &rarr; GeoParquet (Hilbert + ZSTD applied automatically)</span>
  <span class="dim">$</span> gpio convert geoparquet <span class="arg">input.gpkg</span> <span class="arg">output.parquet</span>
  <span class="dim">$</span> gpio inspect <span class="arg">output.parquet</span>
prev:
  slug: geospatial-frontend
  name: Geospatial Frontend
---
