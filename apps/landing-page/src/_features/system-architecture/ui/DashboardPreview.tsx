// File: apps/landing-page/src/_features/system-architecture/ui/DashboardPreview.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  alpha,
  GlobalStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Line,
  LineChart,
} from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiActivity,
  FiTrendingUp,
  FiUsers,
  FiZap,
  FiX,
  FiMinus,
  FiSquare,
  FiRefreshCw,
  FiShield,
} from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, MONO } from '../lib/constants';

const TICK_MS = 3000;
const HISTORY_LEN = 10;

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

const NODES = [
  { id: 'iot-hub', label: 'IoT Hub' },
  { id: 'ml-engine', label: 'ML Engine' },
  { id: 'edge-node', label: 'Edge Node' },
  { id: 'odoo', label: 'Odoo' },
  { id: 'iot-registry', label: 'IoT Registry' },
  { id: 'api-gateway', label: 'API Gateway' },
] as const;

const SOURCE_TO_NODE: Record<string, (typeof NODES)[number]['id']> = {
  'IoT Hub': 'iot-hub',
  'ML Engine': 'ml-engine',
  'Edge Node': 'edge-node',
  Odoo: 'odoo',
  'IoT Registry': 'iot-registry',
  'API Gateway': 'api-gateway',
};

const ACTIVITY_POOL: Array<{ event: string; source: string; status: 'success' | 'warning' | 'info' }> = [
  { event: 'Sensor activado', source: 'IoT Hub', status: 'success' },
  { event: 'Predicción IA completada', source: 'ML Engine', status: 'success' },
  { event: 'Alerta crítica', source: 'Edge Node', status: 'warning' },
  { event: 'Sync ERP completado', source: 'Odoo', status: 'success' },
  { event: 'Nuevo dispositivo registrado', source: 'IoT Registry', status: 'info' },
  { event: 'Umbral de temperatura superado', source: 'Edge Node', status: 'warning' },
  { event: 'Modelo reentrenado', source: 'ML Engine', status: 'success' },
  { event: 'Webhook entregado', source: 'API Gateway', status: 'info' },
];

function randomWalk(value: number, spread: number, min: number, max = Infinity) {
  const next = value + (Math.random() - 0.45) * spread;
  return Math.min(max, Math.max(min, Math.round(next)));
}

function seedChart() {
  return DAY_LABELS.map((name) => ({
    name,
    value: 1800 + Math.round(Math.random() * 2600),
    value2: 1600 + Math.round(Math.random() * 2600),
  }));
}

function seedArea() {
  return MONTH_LABELS.slice(0, 5).map((name) => ({
    name,
    uv: 1800 + Math.round(Math.random() * 3000),
    pv: 1400 + Math.round(Math.random() * 3000),
  }));
}

interface Metric {
  key: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  spread: number;
  min: number;
}

const INITIAL_METRICS: Metric[] = [
  { key: 'signals', icon: <FiActivity size={16} />, label: 'Señales Activas', value: 1284, spread: 40, min: 800 },
  { key: 'predictions', icon: <FiTrendingUp size={16} />, label: 'Predicciones IA', value: 8912, spread: 60, min: 5000 },
  { key: 'devices', icon: <FiUsers size={16} />, label: 'Dispositivos', value: 347, spread: 4, min: 200 },
  { key: 'automations', icon: <FiZap size={16} />, label: 'Automatizaciones', value: 56, spread: 2, min: 10 },
];

/** Anillo de salud del sistema — donut SVG con % de uptime en vivo. */
function HealthRing({
  score,
  color,
  trackColor,
  textPrimary,
  textMute,
}: {
  score: number;
  color: string;
  trackColor: string;
  textPrimary: string;
  textMute: string;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);

  return (
    <Box sx={{ position: 'relative', width: 108, height: 108, mx: 'auto' }}>
      <svg width="108" height="108" viewBox="0 0 108 108">
        <circle cx="54" cy="54" r={r} fill="none" stroke={trackColor} strokeWidth="8" />
        <motion.circle
          cx="54"
          cy="54"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          transform="rotate(-90 54 54)"
        />
      </svg>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '1.05rem', color: textPrimary, lineHeight: 1 }}>
          {score.toFixed(1)}%
        </Typography>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.55rem', color: textMute, mt: 0.3 }}>uptime</Typography>
      </Box>
    </Box>
  );
}

/** Mini sparkline por métrica — muestra la tendencia de las últimas lecturas. */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const points = data.map((v, i) => ({ i, v }));
  return (
    <Box sx={{ width: 56, height: 24, flexShrink: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.75} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

const DashboardPreview = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bgCard = isDark ? DARK.bg : '#FFFFFF';
  const borderColor = isDark ? DARK.border : C.border;
  const textPrimary = isDark ? DARK.text : C.text;
  const textSecondary = isDark ? DARK.textMid : C.textMid;
  const textMute = isDark ? DARK.textMute : C.textMute;
  const accent = isDark ? DARK.accent : C.accent;
  const accentDk = isDark ? DARK.accentDk : C.accentDk;
  const accentBg = isDark ? DARK.accentBg : C.accentBg;
  const accentLine = isDark ? DARK.accentLine : C.accentLine;

  const colors = {
    bar: isDark ? '#4A9EFF' : '#00AEEF',
    bar2: isDark ? '#7FBBFF' : '#33D4FF',
    areaStroke: isDark ? '#4A9EFF' : '#00AEEF',
    areaStroke2: isDark ? '#7FBBFF' : '#33D4FF',
  };

  // --- Estado reactivo ---------------------------------------------------
  const [metrics, setMetrics] = useState<Metric[]>(INITIAL_METRICS);
  const [metricHistory, setMetricHistory] = useState<Record<string, number[]>>(() =>
    Object.fromEntries(INITIAL_METRICS.map((m) => [m.key, Array(HISTORY_LEN).fill(m.value)])),
  );
  const [chartData, setChartData] = useState(seedChart);
  const [areaData, setAreaData] = useState(seedArea);
  const [activity, setActivity] = useState(() =>
    ACTIVITY_POOL.slice(0, 5).map((a, i) => ({ ...a, id: i + 1, time: `hace ${(i + 1) * 8} min` })),
  );
  const [healthScore, setHealthScore] = useState(99.4);
  const [latencyMs, setLatencyMs] = useState(18);
  const [nodeActivity, setNodeActivity] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NODES.map((n, i) => [n.id, i < 2])),
  );
  const [secondsToNext, setSecondsToNext] = useState(TICK_MS / 1000);
  const nextIdRef = useRef(activity.length + 1);

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const tick = () => {
      setMetrics((prev) => {
        const next = prev.map((m) => ({ ...m, value: randomWalk(m.value, m.spread, m.min) }));
        setMetricHistory((prevHist) => {
          const updated: Record<string, number[]> = {};
          next.forEach((m) => {
            const hist = prevHist[m.key] ?? [];
            updated[m.key] = [...hist.slice(1), m.value];
          });
          return updated;
        });
        return next;
      });

      setChartData((prev) => {
        const last = prev[prev.length - 1];
        const nextIndex = prev.length;
        return [
          ...prev.slice(1),
          {
            name: DAY_LABELS[nextIndex % DAY_LABELS.length],
            value: randomWalk(last.value, 700, 1200),
            value2: randomWalk(last.value2, 700, 1200),
          },
        ];
      });

      setAreaData((prev) => {
        const last = prev[prev.length - 1];
        const nextIndex = prev.length;
        return [
          ...prev.slice(1),
          {
            name: MONTH_LABELS[nextIndex % MONTH_LABELS.length],
            uv: randomWalk(last.uv, 900, 1000),
            pv: randomWalk(last.pv, 900, 1000),
          },
        ];
      });

      setHealthScore((prev) => Math.min(100, Math.max(96.5, prev + (Math.random() - 0.5) * 0.6)));
      setLatencyMs((prev) => randomWalk(prev, 10, 6, 60));

      let touchedNodeId: string | null = null;
      if (Math.random() > 0.35) {
        const pick = ACTIVITY_POOL[Math.floor(Math.random() * ACTIVITY_POOL.length)];
        const id = nextIdRef.current++;
        touchedNodeId = SOURCE_TO_NODE[pick.source];
        setActivity((prev) => [{ ...pick, id, time: 'ahora' }, ...prev.slice(0, 4)]);
      }

      setNodeActivity((prev) => {
        const next: Record<string, boolean> = {};
        NODES.forEach((n) => {
          if (n.id === touchedNodeId) {
            next[n.id] = true;
          } else {
            next[n.id] = Math.random() > 0.45 ? prev[n.id] : Math.random() > 0.6;
          }
        });
        return next;
      });

      setSecondsToNext(TICK_MS / 1000);
    };

    const dataInterval = setInterval(tick, TICK_MS);
    const countdownInterval = setInterval(() => {
      setSecondsToNext((s) => (s > 1 ? s - 1 : TICK_MS / 1000));
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const DotBackground = () => (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isDark ? 0.3 : 0.5,
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)',
      }}
    >
      <Box component="svg" width="100%" height="100%" sx={{ position: 'absolute', inset: 0, display: 'block' }}>
        <defs>
          <pattern id="dashPattern" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill={accent} opacity={isDark ? 0.2 : 0.15} />
            <circle cx="18" cy="18" r="1" fill={accent} opacity={isDark ? 0.15 : 0.1} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dashPattern)" />
      </Box>
    </Box>
  );

  const statusColor = (status: 'success' | 'warning' | 'info') =>
    status === 'success' ? '#28c840' : status === 'warning' ? '#ffbd2e' : accent;

  const statusPrefix = (status: 'success' | 'warning' | 'info') =>
    status === 'success' ? 'OK' : status === 'warning' ? 'WARN' : 'INFO';

  const healthColor = healthScore >= 99 ? '#28c840' : healthScore >= 97 ? '#ffbd2e' : '#ff5f57';
  const latencyColor = latencyMs <= 25 ? '#28c840' : latencyMs <= 45 ? '#ffbd2e' : '#ff5f57';

  // --- Geometría del mapa de topología ------------------------------------
  const hub = { x: 160, y: 92 };
  const radius = 66;
  const nodePositions = NODES.map((n, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / NODES.length;
    return { ...n, x: hub.x + radius * Math.cos(angle), y: hub.y + radius * Math.sin(angle) };
  });

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        width: '100%',
        maxWidth: 1080,
        mx: 'auto',
        my: 6,
        position: 'relative',
        borderRadius: '20px',
        border: `1px solid ${borderColor}`,
        bgcolor: isDark ? DARK.bg : '#F8F9FE',
        boxShadow: `0 32px 80px ${isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.04)'}`,
        overflow: 'hidden',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: -1,
          borderRadius: '20px',
          padding: '1px',
          background: `conic-gradient(from 0deg, ${accent}, ${accentDk}, ${accent})`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.4,
          pointerEvents: 'none',
        },
      }}
    >
      <GlobalStyles
        styles={{
          '@keyframes dpDash': { to: { strokeDashoffset: -60 } },
          '@keyframes dpCursorBlink': { '0%,49%': { opacity: 1 }, '50%,100%': { opacity: 0 } },
          '.dp-pulse-line': { animation: 'dpDash 1.4s linear infinite' },
          '@media (prefers-reduced-motion: reduce)': {
            '.dp-pulse-line': { animation: 'none' },
            '.dp-cursor': { animation: 'none' },
          },
        }}
      />
      <DotBackground />

      {/* Ventana: Header con botones */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.2,
          borderBottom: `1px solid ${borderColor}`,
          bgcolor: isDark ? '#0B0F2B' : '#FFFFFF',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', gap: 0.8 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f57' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28c840' }} />
          </Box>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: textSecondary, letterSpacing: '0.05em', ml: 1 }}>
            system-monitor.datheon.io
          </Typography>
          <Box
            component={motion.div}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.2,
              borderRadius: '12px',
              bgcolor: isDark ? 'rgba(74, 158, 255, 0.15)' : 'rgba(0, 174, 239, 0.08)',
              border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.3)' : 'rgba(0, 174, 239, 0.2)'}`,
            }}
          >
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#28c840' }} />
            <Typography sx={{ fontFamily: MONO, fontSize: '0.55rem', color: '#28c840', fontWeight: 600, letterSpacing: '0.04em' }}>
              LIVE
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.2,
              borderRadius: '12px',
              bgcolor: alpha(latencyColor, isDark ? 0.15 : 0.08),
              border: `1px solid ${alpha(latencyColor, 0.3)}`,
            }}
          >
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: latencyColor }} />
            <Typography sx={{ fontFamily: MONO, fontSize: '0.55rem', color: latencyColor, fontWeight: 600 }}>
              {latencyMs}ms
            </Typography>
          </Box>
          <Typography
            sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: MONO, fontSize: '0.62rem', color: textMute, letterSpacing: '0.03em' }}
          >
            próxima actualización · {secondsToNext}s
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" sx={{ color: textSecondary, '&:hover': { color: accent } }}>
            <FiRefreshCw size={14} />
          </IconButton>
          <IconButton size="small" sx={{ color: textSecondary }}>
            <FiMinus size={14} />
          </IconButton>
          <IconButton size="small" sx={{ color: textSecondary }}>
            <FiSquare size={14} />
          </IconButton>
          <IconButton size="small" sx={{ color: textSecondary }}>
            <FiX size={14} />
          </IconButton>
        </Box>
      </Box>

      {/* Dashboard Content */}
      <Box sx={{ p: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1 }}>
        {/* Metrics Cards — valor + sparkline de tendencia */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {metrics.map((metric) => (
            <Grid item xs={6} sm={3} key={metric.key}>
              <Box
                component={motion.div}
                variants={itemVariants}
                sx={{
                  bgcolor: bgCard,
                  borderRadius: '14px',
                  p: 2,
                  border: `1px solid ${borderColor}`,
                  transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 24px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.04)'}`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography sx={{ color: textSecondary, fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.02em' }}>
                    {metric.label}
                  </Typography>
                  <Box sx={{ color: accent }}>{metric.icon}</Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1 }}>
                  <Box sx={{ overflow: 'hidden', height: '1.6rem' }}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={metric.value}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: textPrimary, lineHeight: 1.2 }}>
                          {metric.value.toLocaleString('es-MX')}
                        </Typography>
                      </motion.div>
                    </AnimatePresence>
                  </Box>
                  <Sparkline data={metricHistory[metric.key] ?? []} color={accent} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Salud del sistema + Mapa de topología — signature element */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                bgcolor: bgCard,
                borderRadius: '14px',
                p: 2.5,
                border: `1px solid ${borderColor}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 1.5, alignSelf: 'flex-start' }}>
                <FiShield size={13} color={healthColor} />
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: textSecondary, letterSpacing: '0.03em' }}>
                  Salud del sistema
                </Typography>
              </Box>
              <HealthRing score={healthScore} color={healthColor} trackColor={borderColor} textPrimary={textPrimary} textMute={textMute} />
              <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', color: textMute, mt: 1.5, textAlign: 'center' }}>
                todos los servicios operando dentro de parámetros
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                bgcolor: bgCard,
                borderRadius: '14px',
                p: 2.5,
                border: `1px solid ${borderColor}`,
                height: '100%',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: textSecondary, mb: 1, letterSpacing: '0.03em' }}>
                Topología de red
              </Typography>
              <Box component="svg" viewBox="0 0 320 184" width="100%" height={184}>
                {nodePositions.map((n) => (
                  <line
                    key={`line-${n.id}`}
                    x1={hub.x}
                    y1={hub.y}
                    x2={n.x}
                    y2={n.y}
                    stroke={nodeActivity[n.id] ? accent : borderColor}
                    strokeWidth={nodeActivity[n.id] ? 1.5 : 1}
                    strokeDasharray={nodeActivity[n.id] ? '5 4' : undefined}
                    className={nodeActivity[n.id] ? 'dp-pulse-line' : undefined}
                    opacity={nodeActivity[n.id] ? 0.9 : 0.35}
                  />
                ))}

                {nodePositions.map((n) => (
                  <g key={n.id}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={nodeActivity[n.id] ? 8 : 6}
                      fill={nodeActivity[n.id] ? accent : bgCard}
                      stroke={nodeActivity[n.id] ? accent : borderColor}
                      strokeWidth={1.5}
                      style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
                    />
                    <text
                      x={n.x}
                      y={n.y + (n.y < hub.y ? -14 : 20)}
                      textAnchor="middle"
                      fontFamily={MONO}
                      fontSize="7.5"
                      fill={nodeActivity[n.id] ? textPrimary : textMute}
                    >
                      {n.label}
                    </text>
                  </g>
                ))}

                <circle cx={hub.x} cy={hub.y} r={17} fill={bgCard} stroke={accent} strokeWidth={2} />
                <text x={hub.x} y={hub.y + 3} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize="8" fill={accentDk}>
                  CORE
                </text>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Charts — series desplazándose en tiempo real */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={7}>
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                bgcolor: bgCard,
                borderRadius: '14px',
                p: 2.5,
                border: `1px solid ${borderColor}`,
                height: '100%',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: textSecondary, mb: 1, letterSpacing: '0.03em' }}>
                Señales por día
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                    vertical={false}
                  />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: textSecondary }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: textSecondary }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#121735' : '#FFFFFF',
                      borderColor: borderColor,
                      borderRadius: '8px',
                      boxShadow: `0 8px 24px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                    itemStyle={{ color: textPrimary }}
                  />
                  <Bar dataKey="value" fill={colors.bar} radius={[4, 4, 0, 0]} barSize={24} isAnimationActive animationDuration={500} />
                  <Bar dataKey="value2" fill={colors.bar2} radius={[4, 4, 0, 0]} barSize={24} isAnimationActive animationDuration={500} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                bgcolor: bgCard,
                borderRadius: '14px',
                p: 2.5,
                border: `1px solid ${borderColor}`,
                height: '100%',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: textSecondary, mb: 1, letterSpacing: '0.03em' }}>
                Actividad IA (ventana móvil)
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={areaData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                    vertical={false}
                  />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: textSecondary }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: textSecondary }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#121735' : '#FFFFFF',
                      borderColor: borderColor,
                      borderRadius: '8px',
                      boxShadow: `0 8px 24px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                    itemStyle={{ color: textPrimary }}
                  />
                  <defs>
                    <linearGradient id="gradUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.areaStroke} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={colors.areaStroke} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.areaStroke2} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={colors.areaStroke2} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="uv" stroke={colors.areaStroke} fill="url(#gradUv)" strokeWidth={2} isAnimationActive animationDuration={500} />
                  <Area type="monotone" dataKey="pv" stroke={colors.areaStroke2} fill="url(#gradPv)" strokeWidth={2} isAnimationActive animationDuration={500} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>

        {/* Log de terminal — reemplaza la tabla plana por un feed tipo consola */}
        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            bgcolor: isDark ? '#080B1F' : '#0B0F2B',
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            overflow: 'hidden',
            transition: 'border-color 0.3s ease',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2.5,
              py: 1.25,
              borderBottom: `1px solid ${alpha('#FFFFFF', 0.08)}`,
            }}
          >
            <Typography sx={{ fontFamily: MONO, fontSize: '0.72rem', fontWeight: 600, color: '#F5F5F5', letterSpacing: '0.03em' }}>
              activity.log
            </Typography>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.2, borderRadius: '10px', bgcolor: accentBg, border: `1px solid ${accentLine}` }}>
              <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', color: accentDk, fontWeight: 600 }}>stream activo</Typography>
            </Box>
          </Box>

          <Box sx={{ px: 2.5, py: 2, minHeight: 200 }}>
            <AnimatePresence initial={false}>
              {activity.map((row) => (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 8,
                    fontFamily: MONO,
                    fontSize: '0.75rem',
                    padding: '4px 0',
                    borderBottom: `1px solid ${alpha('#FFFFFF', 0.05)}`,
                    flexWrap: 'wrap',
                  }}
                >
                  <Box component="span" sx={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                    {row.time}
                  </Box>
                  <Box component="span" sx={{ color: statusColor(row.status), fontWeight: 700, flexShrink: 0 }}>
                    [{statusPrefix(row.status)}]
                  </Box>
                  <Box component="span" sx={{ color: '#7FBBFF', flexShrink: 0 }}>
                    {row.source}
                  </Box>
                  <Box component="span" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                    {row.event}
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, pt: 1, fontFamily: MONO, fontSize: '0.75rem' }}>
              <Box component="span" sx={{ color: accent }}>
                &gt;
              </Box>
              <Box className="dp-cursor" sx={{ width: 6, height: 12, bgcolor: accent, animation: 'dpCursorBlink 1s steps(1) infinite' }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPreview;