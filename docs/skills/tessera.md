---
template: skill.html
title: Tessera
slug: tessera
tag: EMBEDDINGS
install_skill: tessera
upstream:
  - label: ucam-eo/geotessera
    href: https://github.com/ucam-eo/geotessera
  - label: lassa-sentinel/GeoTessera (R)
    href: https://github.com/lassa-sentinel/GeoTessera
license: Apache-2.0 (skill); embeddings under the TESSERA project license
requires: Python 3.10+ or R &ge; 4.2
summary: >-
  Work with TESSERA satellite embeddings via the <code>geotessera</code> CLI,
  Python library, or R library. Covers coverage checks, point sampling, mosaic
  building, and downloads to GeoTIFF, NPY, or Zarr so an agent can jump
  straight to clustering, similarity search, or downstream fine-tuning.
features:
  - Download embeddings by bbox or region file (GeoJSON / Shapefile)
  - Output as GeoTIFF (default, georeferenced), NPY, or Zarr
  - Sample embeddings at point locations from the Python library
  - Build mosaics for dense per-pixel raster analysis
  - R bindings via <code>GeoTessera</code> (<code>geotessera()</code>, <code>get_tiles</code>, <code>export_embedding_geotiffs</code>)
  - Coverage checks and configurable registry / cache
example_html: |
  <span class="com"># download as GeoTIFF (default, with georeferencing)</span>
  <span class="dim">$</span> geotessera download \
      --bbox <span class="arg">"-0.2,51.4,0.1,51.6"</span> \
      --year <span class="arg">2024</span> \
      --output <span class="arg">./london_tiffs</span>

  <span class="com"># or stream raw NumPy arrays with sidecar metadata</span>
  <span class="dim">$</span> geotessera download \
      --bbox <span class="arg">"-0.2,51.4,0.1,51.6"</span> \
      --format <span class="arg">npy</span> --year <span class="arg">2024</span> \
      --output <span class="arg">./london_arrays</span>

  <span class="com"># clip to a region file and pick specific bands</span>
  <span class="dim">$</span> geotessera download \
      --region-file <span class="arg">cambridge.geojson</span> \
      --bands <span class="arg">"0,1,2"</span> --year <span class="arg">2024</span> \
      --output <span class="arg">./cambridge_rgb</span>
prev:
  slug: geozarr
  name: GeoZarr
next:
  slug: geospatial-viewers
  name: Geospatial Viewers
---
