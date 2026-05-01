---
template: skill.html
title: Geospatial Viewers
slug: geospatial-viewers
tag: VISUALIZATION
install_skill: geospatial-viewers
upstream:
  - label: nkeikon/tifviewer
    href: https://github.com/nkeikon/tifviewer
  - label: nkeikon/geomviewer
    href: https://github.com/nkeikon/geomviewer
  - label: nkeikon/inlineviewer
    href: https://github.com/nkeikon/inlineviewer
license: Apache-2.0
requires: <code>uv</code> / <code>uvx</code> on PATH; rasters/vectors via PyPI extras
summary: >-
  Three CLI tools for quick-look inspection of geospatial data, all run via
  <code>uvx</code> so nothing pollutes the project environment:
  <code>viewtif</code> (Qt raster viewer), <code>viewgeom</code> (Qt vector
  viewer), and <code>viewinline</code> (terminal-inline preview for rasters,
  vectors, CSV, and Parquet).
features:
  - Interactive Qt raster viewer (<code>viewtif</code>) &mdash; GeoTIFF, HDF, NetCDF, FileGDB
  - Interactive Qt vector viewer (<code>viewgeom</code>) &mdash; GeoJSON, Shapefile, GeoPackage, GeoParquet
  - Terminal-inline preview (<code>viewinline</code>) for rasters, vectors, CSV, and Parquet &mdash; works over SSH
  - 'DuckDB-backed filtering: <code>viewgeom --duckdb &quot;SELECT ...&quot;</code>'
  - 'CSV/Parquet stats and plots: <code>--describe</code>, <code>--hist</code>, <code>--scatter</code>, <code>--sql</code>'
  - Auto-installable via <code>uvx</code> &mdash; no env setup
example_html: |
  <span class="com"># interactive raster preview with an RGB band combo</span>
  <span class="dim">$</span> uvx viewtif <span class="arg">image.tif</span> --rgb <span class="arg">4 3 2</span>

  <span class="com"># filter a vector with DuckDB SQL and save the result</span>
  <span class="dim">$</span> uvx viewgeom <span class="arg">earthquake.geojson</span> \
      --duckdb <span class="arg">"SELECT * FROM data WHERE mag &gt; 5"</span> \
      --save <span class="arg">filtered.geojson</span>

  <span class="com"># inline terminal preview (no GUI, works over SSH)</span>
  <span class="dim">$</span> uvx viewinline <span class="arg">sentinel2.tif</span> --rgb <span class="arg">4 3 2</span>

  <span class="com"># quick CSV histogram</span>
  <span class="dim">$</span> uvx viewinline <span class="arg">data.csv</span> --hist <span class="arg">area_km2</span> --bins <span class="arg">30</span>
prev:
  slug: tessera
  name: Tessera
next:
  slug: geospatial-frontend
  name: Geospatial Frontend
---
