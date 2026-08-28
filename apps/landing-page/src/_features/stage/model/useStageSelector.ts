// _features/stage/model/useStageSelector.ts
import { useCallback, useState } from 'react';

export function useStageSelector(defaultStageId: string) {
  const [activeStageId, setActiveStageId] = useState<string>(defaultStageId);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const selectStage = useCallback((id: string) => {
    setActiveStageId(id);
  }, []);

  const toggleGoal = useCallback((goal: string) => {
    setSelectedGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  }, []);

  return { activeStageId, selectedGoals, selectStage, toggleGoal };
}
