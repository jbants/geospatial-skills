# geospatial-skills

A collection of separately installable geospatial `SKILL.md` packages for AI coding agents.

Site: <https://isaac.earth/geospatial-skills/>

## Install

The recommended path is [`skills.sh`](https://skills.sh) — a single-line install that works across most agents:

```bash
# install everything
npx skills add isaaccorley/geospatial-skills

# or install one skill at a time
npx skills add isaaccorley/geospatial-skills/gdal
npx skills add isaaccorley/geospatial-skills/geoparquet-validation
npx skills add isaaccorley/geospatial-skills/geozarr
npx skills add isaaccorley/geospatial-skills/tessera
npx skills add isaaccorley/geospatial-skills/geospatial-viewers
npx skills add isaaccorley/geospatial-skills/geospatial-frontend
```

Other paths:

```bash
# Claude Code plugin
/plugin install <skill>@geospatial-skills

# Or copy a skill directly into your shared skills folder
cp -R skills/<skill> ~/.agent/skills/<skill>
```

## Skills

| Skill                   | What it does                                                                |
| ----------------------- | --------------------------------------------------------------------------- |
| `gdal`                  | GDAL command-line workflows for raster and vector data                      |
| `geoparquet-validation` | `gpio`-focused GeoParquet inspection, validation, and distribution          |
| `geozarr`               | GeoZarr metadata conventions for georeferenced Zarr stores                  |
| `tessera`               | TESSERA embedding downloads via the `geotessera` CLI / Python / R libraries |
| `geospatial-viewers`    | `viewtif` / `viewgeom` / `viewinline` quick-look CLIs (run via `uvx`)       |
| `geospatial-frontend`   | Map-centric demo webapps with MapLibre globe + DuckDB-WASM                  |

## Layout

```text
skills/
  gdal/                    SKILL.md  references/
  geoparquet-validation/   SKILL.md  references/
  geozarr/                 SKILL.md
  tessera/                 SKILL.md  references/
  geospatial-viewers/      SKILL.md  references/
  geospatial-frontend/     SKILL.md  references/
docs/
  ...
overrides/
  home.html  skill.html
```

## Docs

```bash
uv sync --group dev
uv run mkdocs serve   # local preview
uv run mkdocs build   # build to ./site
```

Contributor workflow, CI, and docs deploy notes live in `.github/CONTRIBUTING.md`.
