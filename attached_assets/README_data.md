
# KidsMotion Data Build

This repo stores the age–sex cutoff tables (P4/P20/P80/P96) used by the KidsMotion
web‑report.

* **Source file**: `kids_cutoff_full.xlsx`
* **Scaling exponent**: 0.67 (classic allometric scaling W ÷ kg^0.67)

## Files

| File | Purpose |
|------|---------|
| `cutoff_v2.json` | Ready‑to‑use lookup. Includes `meta` header. |
| `build_data.py` | Re‑generate `cutoff_v2.json` from the Excel raw data. |

## Regeneration

```bash
python build_data.py --exp 0.67 --out cutoff_v2.json
```

*Change `--exp` to 0.71 or 0.75 to test sensitivity.*

## Notes

* Percentiles are computed with `numpy.percentile` (linear interpolation).
* For rows with missing power values the script drops those records.
* If relative power appears to **decrease with age**, remember this is expected when body‑mass grows faster than absolute power.*

