'use client';

import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box, Typography } from '@mui/material';
import { MONO, blockGroupColor, type ArchitectureNode } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  border: string;
}

interface SolutionsTreeViewProps {
  tree: ArchitectureNode;
  T: Tokens;
  height?: number;
}

function renderItems(node: ArchitectureNode, itemId: string, T: Tokens) {
  const color = blockGroupColor(node.blockType);
  return (
    <TreeItem
      key={itemId}
      itemId={itemId}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: T.text }}>{node.label}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', color: T.textMute }}>{node.blockType}</Typography>
        </Box>
      }
    >
      {(node.children ?? []).map((child, i) => renderItems(child, `${itemId}-${i}`, T))}
    </TreeItem>
  );
}

export function SolutionsTreeView({ tree, T, height = 460 }: SolutionsTreeViewProps) {
  return (
    <Box sx={{ border: `1px solid ${T.border}`, borderRadius: '12px', p: 1.5, height, overflowY: 'auto', transition: 'border-color 0.3s ease' }}>
      <SimpleTreeView defaultExpandedItems={['root']} sx={{ '& .MuiTreeItem-content': { borderRadius: '6px' } }}>
        {renderItems(tree, 'root', T)}
      </SimpleTreeView>
    </Box>
  );
}
