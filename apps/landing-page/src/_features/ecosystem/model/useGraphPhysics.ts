// _features/ecosystem/model/useGraphPhysics.ts
import { useEffect, useRef, useState, type RefObject } from 'react';
import { seedPositions, stepSimulation, NODE_RADIUS, type NodeData, type EdgeData, type NodeId, type PhysicsPositions } from '../lib';

const CONFIG = { repulsion: 1800, springLength: 100, springStrength: 0.02, damping: 0.82, centerStrength: 0.0025 };
const SETTLE_EPSILON = 0.05;

export function useGraphPhysics(
  nodes: NodeData[],
  edges: EdgeData[],
  containerRef: RefObject<HTMLDivElement>,
  prefersReducedMotion: boolean,
  height: number,
) {
  const [width, setWidth] = useState(600);
  const [positions, setPositions] = useState<PhysicsPositions>({} as PhysicsPositions);
  const positionsRef = useRef<PhysicsPositions>({} as PhysicsPositions);
  const widthRef = useRef(600);
  const rafRef = useRef<number>();
  const draggingId = useRef<NodeId | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    const measuredWidth = el?.getBoundingClientRect().width || 600;
    widthRef.current = measuredWidth;
    setWidth(measuredWidth);

    const seeded = seedPositions(nodes, measuredWidth, height);
    positionsRef.current = seeded;
    setPositions(seeded);

    if (!prefersReducedMotion) startLoop();
    return () => stopLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startLoop() {
    if (rafRef.current) return;
    const tick = () => {
      const { positions: next, kineticEnergy } = stepSimulation(
        positionsRef.current,
        edges,
        NODE_RADIUS,
        { ...CONFIG, width: widthRef.current, height },
        draggingId.current,
      );
      positionsRef.current = next;
      setPositions(next);

      if (kineticEnergy > SETTLE_EPSILON || draggingId.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = undefined;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  function stopLoop() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = undefined;
  }

  function beginDrag(id: NodeId) {
    draggingId.current = id;
    if (!prefersReducedMotion) startLoop();
  }

  function updateDrag(id: NodeId, x: number, y: number) {
    if (draggingId.current !== id) return;
    const r = NODE_RADIUS[id];
    const clampedX = Math.min(Math.max(x, r), widthRef.current - r);
    const clampedY = Math.min(Math.max(y, r), height - r);
    positionsRef.current = { ...positionsRef.current, [id]: { x: clampedX, y: clampedY, vx: 0, vy: 0 } };
    setPositions(positionsRef.current);
  }

  function endDrag(id: NodeId) {
    if (draggingId.current === id) draggingId.current = null;
  }

  return { positions, width, beginDrag, updateDrag, endDrag };
}
