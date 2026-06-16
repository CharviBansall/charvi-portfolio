# SF Pro (Apple Developer fonts)

These files are **not** in git (Apple license). Add them locally so Next.js can bundle them.

## What to copy

From the **SF Pro** package you downloaded from [Apple Fonts for Apple Platforms](https://developer.apple.com/fonts/):

1. Open the installer / folder and find the **`.otf`** files (often under **SF Pro Text** and **SF Pro Display**, plus **SF Mono**).
2. Copy into this folder (`app/fonts/sf-pro/`) and **rename** to match exactly:

**SF Pro Text**

- `SFProText-Regular.otf`
- `SFProText-Medium.otf`
- `SFProText-Semibold.otf`

**SF Pro Display**

- `SFProDisplay-Regular.otf`
- `SFProDisplay-Medium.otf`
- `SFProDisplay-Semibold.otf`

**SF Mono**

- `SFMono-Regular.otf`

If your download uses different names (e.g. `SF Pro Text Regular.otf`), rename them to the names above.

## Quick install (optional)

If the fonts are in a folder on disk (e.g. after unzipping):

```bash
cd /path/to/charvi-portfolio
./scripts/copy-sf-pro-fonts.sh /path/to/your/SFProFontsFolder
```

Then run `npm run dev` again.

## License

Use only as allowed by Apple’s font license for your app / site.
