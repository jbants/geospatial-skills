---
template: skill.html
title: GeoParquet Validation
slug: geoparquet-validation
tag: CLOUD-NATIVE
install_skill: geoparquet-validation
upstream:
  - label: geoparquet-io/geoparquet-skill
    href: https://github.com/geoparquet-io/geoparquet-skill
version: "0.1.0"
license: Apache-2.0
requires: "<code>gpio</code> (geoparquet-io); DuckDB optional for SQL"
summary: >-
  Inspect, validate, optimize, and distribute GeoParquet data with
  <code>gpio</code>. Centered on the <code>gpio</code> toolchain &mdash;
  inspection, auto-fix validation, conversion with sane defaults, partitioning,
  and STAC publishing &mdash; with DuckDB available for heavier SQL.
features:
  - "Inspect metadata and stats: <code>gpio inspect</code>, <code>gpio inspect stats</code>"
  - "Validate &amp; auto-fix: <code>gpio check all</code> (with <code>--fix</code>)"
  - "Convert with GeoParquet defaults: <code>gpio convert geoparquet</code>"
  - "Extract by bbox or predicate: <code>gpio extract --bbox</code> / <code>--where</code>"
  - "Partition large datasets: <code>gpio partition kdtree</code>"
  - "Publish to STAC and upload: <code>gpio publish stac</code> / <code>publish upload</code>"
example_html: |
  <span class="com"># inspect, then validate-and-fix in place</span>
  <span class="dim">$</span> gpio inspect stats <span class="arg">data.parquet</span>
  <span class="dim">$</span> gpio check all <span class="arg">data.parquet</span> --fix --output <span class="arg">fixed.parquet</span>

  <span class="com"># convert to optimal GeoParquet defaults</span>
  <span class="dim">$</span> gpio convert geoparquet <span class="arg">input.fgb</span> <span class="arg">output.parquet</span> \
      --compression-level 15

  <span class="com"># partition a large dataset and publish a STAC summary</span>
  <span class="dim">$</span> gpio partition kdtree <span class="arg">big.parquet</span> <span class="arg">parts/</span> --max-rows-per-file 500000
  <span class="dim">$</span> gpio publish stac <span class="arg">parts/</span> <span class="arg">stac.json</span>
prev:
  slug: gdal
  name: GDAL
next:
  slug: geozarr
  name: GeoZarr
hide:
  - toc
  - navigation
  - footer
---
