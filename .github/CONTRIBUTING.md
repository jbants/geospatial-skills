# Contributing

## Repo goals

- keep each skill self-contained under `skills/<name>/`
- publish calm, earth-forward docs
- keep install paths obvious for Codex, Claude, Cursor, Aider, and similar tooling

## Docs

This is a fork of [isaaccorley/geospatial-skills](https://github.com/isaaccorley/geospatial-skills) maintained by James Banting. Original upstream site: <https://isaac.earth/geospatial-skills/>

- canonical URL: `https://jbants.github.io/geospatial-skills/`
- local dev:

```bash
uv sync --group dev
uv run mkdocs serve
```

- strict build:

```bash
uv run mkdocs build --strict
```

## Quality gate

Run before handoff:

```bash
uv sync --group dev
uv run pre-commit run --all-files
uv run mkdocs build --strict
```

## CI

- `.github/workflows/ci.yaml`: pre-commit + strict docs build + skill layout validation on pushes to `main` and PRs
- `.github/workflows/universal-install.yaml`: manual `workflow_dispatch` smoke test for universal installs
- `.github/workflows/docs-pages.yaml`: GitHub Pages build/deploy on pushes to `main`

## Pages

Set repository Pages source to GitHub Actions. Published site should resolve at:

- `https://jbants.github.io/geospatial-skills/`
