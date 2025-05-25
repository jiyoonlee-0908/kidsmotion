
"""build_data.py
Reads kids_cutoff_full.xlsx, computes relative power W/kg^exponent for each age/sex,
calculates P4,P20,P80,P96 percentiles, and writes cutoff_v2.json.

Usage:
    python build_data.py --exp 0.67 --out cutoff_v2.json
"""

import argparse, json, pandas as pd, numpy as np, pathlib, datetime, math, sys, os

def percentile(series, p):
    return float(np.percentile(series, p))

def process(file_path, exponent):
    xl = pd.ExcelFile(file_path)
    data = {}
    for sheet in xl.sheet_names:
        df = xl.parse(sheet)
        # Expect columns: Age, Sex(optional), Weight, Power_5s, Power_15s, Power_30s, Power_60s
        age_sex = sheet.strip()
        df['kg_exp'] = np.power(df['Weight'], exponent)
        for sec in ['5s','15s','30s','60s']:
            rel = df[f'Power_{sec}'] / df['kg_exp']
            if age_sex not in data:
                data[age_sex] = {}
            data[age_sex][sec] = {
                'P4': percentile(rel,4),
                'P20': percentile(rel,20),
                'P80': percentile(rel,80),
                'P96': percentile(rel,96)
            }
    return data

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--file', default='kids_cutoff_full.xlsx')
    parser.add_argument('--exp', type=float, default=0.67)
    parser.add_argument('--out', default='cutoff_v2.json')
    args = parser.parse_args()

    data = process(args.file, args.exp)
    meta = {
        'version': datetime.date.today().isoformat(),
        'powerExponent': args.exp,
        'source': args.file
    }
    with open(args.out,'w', encoding='utf-8') as f:
        json.dump({'meta':meta,'data':data}, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
