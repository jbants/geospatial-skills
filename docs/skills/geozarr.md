---
template: skill.html
title: GeoZarr
slug: geozarr
tag: ARRAYS
install_skill: geozarr
upstream:
  - label: zarr-developers/geozarr-spec
    href: https://github.com/zarr-developers/geozarr-spec
  - label: GDAL Zarr driver
    href: https://gdal.org/en/latest/drivers/raster/zarr.html
version: "0.1.0"
license: Apache-2.0
requires: "<code>zarr</code>, <code>xarray</code>, <code>rioxarray</code>; GDAL with Zarr driver for round-trip checks"
summary: >-
  Conventions guide for authoring, patching, and validating georeferenced Zarr
  stores so they round-trip as rasters through xarray, rioxarray, GDAL, and
  QGIS. Covers CF-1.8 grid_mapping, 1D coordinate arrays, Zarr v2/v3 dimension
  declarations, multiscales, and the optional <code>proj:</code> / <code>spatial:</code>
  namespaces.
features:
  - "Author from xarray/rioxarray with <code>rio.write_crs</code> &mdash; emits a compliant <code>spatial_ref</code> grid mapping variable"
  - "Patch existing stores in place: add <code>grid_mapping</code>, 1D coord arrays, and <code>Conventions</code> without rewriting chunks"
  - "Cell-center coords vs pixel-edge GeoTransform &mdash; the half-pixel offset rule that fixes the most common round-trip bug"
  - "Zarr v2 (<code>_ARRAY_DIMENSIONS</code>) and v3 (<code>dimension_names</code>) idioms"
  - "Optional layered conventions: <code>proj:</code>, <code>spatial:</code>, and multiscales pyramids"
  - "Validate via rioxarray <code>rio.crs</code> and <code>gdalinfo 'ZARR:&quot;...&quot;:/var'</code>"
example_html: |
  <span class="com"># verify the toolchain</span>
  <span class="dim">$</span> python -c <span class="arg">"import zarr, xarray; print(zarr.__version__, xarray.__version__)"</span>

  <span class="com"># round-trip CRS through rioxarray</span>
  <span class="dim">$</span> python -c <span class="arg">"import xarray as xr, rioxarray; print(xr.open_zarr('store.zarr').data_var.rio.crs)"</span>

  <span class="com"># GDAL view of a single Zarr array</span>
  <span class="dim">$</span> gdalinfo <span class="arg">'ZARR:"store.zarr":/data_var'</span>
prev:
  slug: geoparquet-validation
  name: GeoParquet Validation
next:
  slug: tessera
  name: Tessera
hide:
  - toc
  - navigation
  - footer
---
