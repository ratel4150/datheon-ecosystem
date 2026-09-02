// File: apps/landing-page/src/_features/ecosystem/ui/EcosystemFlowDetail.tsx
// File: apps/landing-page/src/_features/ecosystem/ui/EcosystemFlowDetail.tsx
'use client';

import { useMemo } from 'react';
import { Box } from '@mui/material';
import ReactFlow, { Background, BackgroundVariant, type Node, type Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { NODES, EDGES, NODE_COLOR, type NodeId } from '../lib';
import { getIcon } from './nodeIcons';
import { EcosystemFlowNode } from './EcosystemFlowNode';

const nodeTypes = { ecoNode: EcosystemFlowNode };

interface Tokens {
  bg: string;
  surface: string;
  text: string;
  border: string;
}

interface EcosystemFlowDetailProps {
  nodeId: NodeId;
  T: Tokens;
}

const COL_GAP = 240;
const ROW_GAP = 74;

export function EcosystemFlowDetail({ nodeId, T }: EcosystemFlowDetailProps) {
  const { rfNodes, rfEdges, height } = useMemo(() => {
    const root = NODES.find((n) => n.id === nodeId);
    if (!root) return { rfNodes: [] as Node[], rfEdges: [] as Edge[], height: 160 };

    const children = NODES.filter((n) => EDGES.some((e) => e.source === nodeId && e.target === n.id));
    const parentId = EDGES.find((e) => e.target === nodeId)?.source;
    const parent = parentId ? NODES.find((n) => n.id === parentId) : undefined;

    const rootColor = NODE_COLOR[root.id];

    if (children.length > 0) {
      const rootNode: Node = {
        id: root.id,
        position: { x: 0, y: ((children.length - 1) * ROW_GAP) / 2 },
        data: { label: root.label, color: rootColor, Icon: getIcon(root), surface: T.surface, text: T.text, isRoot: true },
        type: 'ecoNode',
        draggable: false,
      };
      const childNodes: Node[] = children.map((c, i) => ({
        id: c.id,
        position: { x: COL_GAP, y: i * ROW_GAP },
        data: { label: c.label, color: NODE_COLOR[c.id], Icon: getIcon(c), surface: T.surface, text: T.text },
        type: 'ecoNode',
        draggable: false,
      }));
      const edges: Edge[] = children.map((c) => ({
        id: `${root.id}-${c.id}`,
        source: root.id,
        target: c.id,
        animated: true,
        style: { stroke: rootColor, strokeWidth: 1.5 },
      }));

      return { rfNodes: [rootNode, ...childNodes], rfEdges: edges, height: Math.max(180, children.length * ROW_GAP + 60) };
    }

    if (parent) {
      const parentNode: Node = {
        id: parent.id,
        position: { x: 0, y: 0 },
        data: { label: parent.label, color: NODE_COLOR[parent.id], Icon: getIcon(parent), surface: T.surface, text: T.text },
        type: 'ecoNode',
        draggable: false,
      };
      const rootNode: Node = {
        id: root.id,
        position: { x: COL_GAP, y: 0 },
        data: { label: root.label, color: rootColor, Icon: getIcon(root), surface: T.surface, text: T.text, isRoot: true },
        type: 'ecoNode',
        draggable: false,
      };
      const edge: Edge = { id: `${parent.id}-${root.id}`, source: parent.id, target: root.id, animated: true, style: { stroke: rootColor, strokeWidth: 1.5 } };

      return { rfNodes: [parentNode, rootNode], rfEdges: [edge], height: 160 };
    }

    return {
      rfNodes: [{ id: root.id, position: { x: 0, y: 0 }, data: { label: root.label, color: rootColor, Icon: getIcon(root), surface: T.surface, text: T.text, isRoot: true }, type: 'ecoNode', draggable: false }],
      rfEdges: [],
      height: 140,
    };
  }, [nodeId, T]);

  return (
    <Box sx={{ width: '100%', height, borderRadius: '12px', overflow: 'hidden', bgcolor: T.bg, transition: 'background-color 0.3s ease' }}>
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        style={{ background: 'transparent' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color={`${NODE_COLOR[nodeId] ?? T.border}22`} />
      </ReactFlow>
    </Box>
  );
}