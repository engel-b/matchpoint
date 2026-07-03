# Deployment

The MatchPoint app is deployed through GitHub Actions to AWS S3 and CloudFront.

## App deployment

A push to `main` runs:

```text
format check
lint
build
S3 sync
CloudFront invalidation
Releases
```

Create a release tag:

```bash
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

This creates a GitHub Release with a ZIP artifact.
