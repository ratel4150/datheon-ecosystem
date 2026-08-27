'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MONO, blockGroupColor, blockGroupOf, type ArchitectureNode } from '../lib';

interface Tokens {
  bg: string;
  surface: string;
  text: string;
  textMute: string;
  border: string;
}

interface BlocklyDiagramProps {
  tree: ArchitectureNode;
  T: Tokens;
  height?: number;
}

type BlockShape = 'infra' | 'data' | 'command';

function shapeFor(blockType: string): BlockShape {
  const group = blockGroupOf(blockType);
  if (group === 'infra') return 'infra';
  if (group === 'data') return 'data';
  return 'command';
}

const BLOCKLY_TYPE: Record<BlockShape, string> = {
  infra: 'arch_infra',
  data: 'arch_data',
  command: 'arch_command',
};

export function BlocklyDiagram({ tree, T, height = 460 }: BlocklyDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    setReady(false);
    setFailed(false);

    (async () => {
      let Blockly: any;
      try {
        Blockly = await import('blockly');
      } catch {
        if (!disposed) setFailed(true);
        return;
      }
      if (disposed || !containerRef.current) return;

      if (!Blockly.Blocks['arch_command']) {
        Blockly.defineBlocksWithJsonArray([
          {
            type: 'arch_command',
            message0: '%1',
            args0: [{ type: 'field_label', name: 'LABEL', text: '' }],
            message1: 'usa %1',
            args1: [{ type: 'input_value', name: 'USES' }],
            previousStatement: null,
            nextStatement: null,
            inputsInline: false,
          },
          {
            type: 'arch_infra',
            message0: '%1',
            args0: [{ type: 'field_label', name: 'LABEL', text: '' }],
            message1: 'usa %1',
            args1: [{ type: 'input_value', name: 'USES' }],
            message2: '%1',
            args2: [{ type: 'input_statement', name: 'CONTAINS' }],
            previousStatement: null,
            nextStatement: null,
            inputsInline: false,
          },
          {
            type: 'arch_data',
            message0: '%1',
            args0: [{ type: 'field_label', name: 'LABEL', text: '' }],
            output: null,
            inputsInline: true,
          },
        ]);
      }

      let theme: any;
      try {
        theme = Blockly.Theme.defineTheme('solutions-theme', {
          base: Blockly.Themes.Classic,
          componentStyles: {
            workspaceBackgroundColour: T.bg,
            toolboxBackgroundColour: T.surface,
            flyoutBackgroundColour: T.surface,
            scrollbarColour: T.border,
          },
        });
      } catch {
        theme = undefined;
      }

      const workspace = Blockly.inject(containerRef.current, {
        readOnly: false,
        trashcan: false,
        zoom: { controls: true, wheel: true, startScale: 0.8, maxScale: 2, minScale: 0.35 },
        move: { scrollbars: true, drag: true, wheel: false },
        theme,
      });
      workspaceRef.current = workspace;

      function buildBlock(node: ArchitectureNode): any {
        const shape = shapeFor(node.blockType);
        const block = workspace.newBlock(BLOCKLY_TYPE[shape]);
        block.setFieldValue(node.label ?? node.blockType, 'LABEL');
        block.setColour(blockGroupColor(node.blockType));
        block.setTooltip(node.blockType);
        block.initSvg();
        block.render();

        if (shape === 'data') return block;

        const children = Array.isArray(node.children) ? node.children : [];
        const dataChild = children.find((c) => shapeFor(c.blockType) === 'data');
        const structural = children.filter((c) => c !== dataChild && shapeFor(c.blockType) !== 'data');

        if (dataChild) {
          const dataBlock = buildBlock(dataChild);
          block.getInput('USES')?.connection?.connect(dataBlock.outputConnection);
        }

        if (structural.length > 0) {
          if (shape === 'infra') {
            let previous: any = null;
            structural.forEach((child) => {
              const childBlock = buildBlock(child);
              if (!previous) {
                block.getInput('CONTAINS')?.connection?.connect(childBlock.previousConnection);
              } else {
                previous.nextConnection.connect(childBlock.previousConnection);
              }
              previous = childBlock;
            });
          } else {
            let previous = block;
            structural.forEach((child) => {
              const childBlock = buildBlock(child);
              previous.nextConnection.connect(childBlock.previousConnection);
              previous = childBlock;
            });
          }
        }

        return block;
      }

      try {
        buildBlock(tree);
        workspace.cleanUp?.();
        Blockly.svgResize(workspace);
        setReady(true);
      } catch {
        setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      workspaceRef.current?.dispose?.();
      workspaceRef.current = null;
    };
  }, [tree, T.bg, T.surface, T.border]);

  return (
    <Box sx={{ position: 'relative', width: '100%', height, borderRadius: '12px', overflow: 'hidden', bgcolor: T.bg, transition: 'background-color 0.3s ease' }}>
      <Box ref={containerRef} sx={{ width: '100%', height: '100%' }} />
      {!ready && !failed && (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.75rem', color: T.textMute }}>Cargando diagrama…</Typography>
        </Box>
      )}
      {failed && (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 3, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.75rem', color: T.textMute }}>
            No se pudo cargar Blockly. Verifica que el paquete "blockly" esté instalado (`bun add blockly`).
          </Typography>
        </Box>
      )}
    </Box>
  );
}
