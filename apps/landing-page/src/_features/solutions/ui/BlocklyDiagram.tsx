'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MONO, blockGroupColor, type ArchitectureNode } from '../lib';

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

export function BlocklyDiagram({ tree, T, height = 440 }: BlocklyDiagramProps) {
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

      if (!Blockly.Blocks['arch_block']) {
        Blockly.Blocks['arch_block'] = {
          init(this: any) {
            this.appendDummyInput().appendField(new Blockly.FieldLabel(''), 'LABEL');
            this.appendStatementInput('CHILDREN').setCheck(null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setInputsInline(false);
          },
        };
      }

      let theme: any;
      try {
        theme = Blockly.Theme.defineTheme(`solutions-theme`, {
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
        zoom: { controls: true, wheel: true, startScale: 0.85, maxScale: 2, minScale: 0.4 },
        move: { scrollbars: true, drag: true, wheel: false },
        theme,
      });
      workspaceRef.current = workspace;

      function buildBlock(node: ArchitectureNode): any {
        const block = workspace.newBlock('arch_block');
        block.setFieldValue(node.label ?? node.blockType, 'LABEL');
        block.setColour(blockGroupColor(node.blockType));
        block.setTooltip(node.blockType);
        block.initSvg();
        block.render();

        if (Array.isArray(node.children) && node.children.length > 0) {
          let previous: any = null;
          node.children.forEach((child) => {
            const childBlock = buildBlock(child);
            if (!previous) {
              const input = block.getInput('CHILDREN');
              input?.connection?.connect(childBlock.previousConnection);
            } else {
              previous.nextConnection.connect(childBlock.previousConnection);
            }
            previous = childBlock;
          });
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
