# RFA Form Filler

Fills the California DWC Request for Authorization (Form RFA) PDF, all 70 fields, entirely in the browser.

**Live demo:** https://siuu3p.github.io/rfa-form-filler/

## Why it runs offline

The first version used Zapier Forms and PDF.co. Both services keep submitted data for a period (Zapier run history for about 29 to 69 days plus backups; PDF.co output files and API logs), and the plans in use were not covered for HIPAA. This version never sends data anywhere: the blank form, the field map and the PDF library are all inside one HTML file, and the filled PDF is saved straight to your computer.

## Features

- All 70 RFA fields in 7 sections; the five treatment rows are laid out one per line, like the paper form
- Field length limits are read from the PDF itself (for example, State is 2 characters)
- **Save defaults** remembers the requesting physician and claims administrator sections in this browser only; patient fields are never saved
- Works offline: download `index.html` and double-click it

Please use fake data when trying the demo.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The built page (self-contained, about 600 KB) |
| `src.html` | Page source with placeholders |
| `build.cjs` | Inlines pdf-lib, the template and the field map into the page |
| `rfa_field_map.csv` | Form label to PDF field name, with field type (70 rows) |
| `rfa_template.pdf` | Blank DWC Form RFA |
| `lib/pdf-lib.min.js` | [pdf-lib](https://github.com/Hopding/pdf-lib) 1.17.1, MIT License |
| `lib/LICENSE-pdf-lib.txt` | pdf-lib license (also embedded in `index.html`) |

## Build

```bash
node build.cjs . . index.html
```

## Credits

- PDF filling: [pdf-lib](https://github.com/Hopding/pdf-lib) by Andrew Dillon, MIT License
- Form: DWC Form RFA, State of California Division of Workers' Compensation
- Built with AI assistance (Claude Code)
