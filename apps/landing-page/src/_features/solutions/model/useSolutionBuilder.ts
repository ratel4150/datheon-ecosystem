// _features/solutions/model/useSolutionBuilder.ts
import { useCallback, useState } from 'react';
import type { ArchitectureNode } from '../lib';

export type BuilderStatus = 'idle' | 'loading' | 'success' | 'error';

interface GenerateParams {
  pathId: string;
  pathLabel: string;
  subOptionId: string;
  subOptionLabel: string;
}

export function useSolutionBuilder() {
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [selectedSubOptionId, setSelectedSubOptionId] = useState<string | null>(null);
  const [status, setStatus] = useState<BuilderStatus>('idle');
  const [diagram, setDiagram] = useState<ArchitectureNode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectPath = useCallback((pathId: string) => {
    setSelectedPathId(pathId);
    setSelectedSubOptionId(null);
    setStatus('idle');
    setDiagram(null);
    setErrorMessage(null);
  }, []);

  const selectSubOption = useCallback((subOptionId: string) => {
    setSelectedSubOptionId(subOptionId);
  }, []);

  const reset = useCallback(() => {
    setSelectedPathId(null);
    setSelectedSubOptionId(null);
    setStatus('idle');
    setDiagram(null);
    setErrorMessage(null);
  }, []);

  const generate = useCallback(async (params: GenerateParams) => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/generate-architecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.root) {
        throw new Error(data?.error ?? 'No se pudo generar la arquitectura');
      }
      setDiagram(data.root as ArchitectureNode);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error desconocido');
      setStatus('error');
    }
  }, []);

  return { selectedPathId, selectedSubOptionId, status, diagram, errorMessage, selectPath, selectSubOption, reset, generate };
}
