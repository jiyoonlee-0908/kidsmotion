import { useState, useEffect } from 'react';

export interface PrefillData {
  participantId: string;
  recentSession: {
    stage1: { maxPower: number; maxCadence: number };
    stage2: { maxPower: number; maxCadence: number };
    stage3: { maxPower: number; maxCadence: number };
    stage4: { maxPower: number; maxCadence: number };
    stage5: { maxPower: number; maxCadence: number };
    stage6: { maxPower: number; maxCadence: number };
  } | null;
  avgBalance: {
    left: number;
    right: number;
  };
}

export function usePrefill(name: string) {
  const [data, setData] = useState<PrefillData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name || name.length < 2) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/prefill?displayName=${encodeURIComponent(name)}`)
      .then(r => {
        if (!r.ok) {
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        }
        return r.json();
      })
      .then(result => {
        console.log('Prefill 데이터 수신:', result);
        setData(result);
      })
      .catch(err => {
        console.error('Prefill 데이터 조회 실패:', err);
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return { data, loading, error };
}