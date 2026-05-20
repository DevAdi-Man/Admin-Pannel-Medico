import {
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type CSSProperties,
  type FC,
} from "react";

// ─── Built-in fallback icons (pure SVG, no deps) ─────────────────────────────
// These are only used when `icon` is a string key AND the key exists here.
// You can pass any ReactNode (Lucide, react-icons, heroicons, etc.) directly.

const BUILTIN_ICONS: Record<string, ReactNode> = {
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  hourglass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 22h14M5 2h14" />
      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
};

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * `icon` accepts:
 *  - A ReactNode: any component like <Heart size={14} /> from lucide-react,
 *    <FaDollarSign /> from react-icons, or your own SVG.
 *  - A string key: one of the built-in icons ("dollar" | "heart" | "hourglass"
 *    | "star" | "bolt" | "user" | "chart" | "bell").
 */
export interface ChartSegment {
  /** Unique identifier for this segment */
  key: string;
  /** ReactNode (Lucide, react-icons, etc.) OR a built-in string key */
  icon: ReactNode | string;
  /** Display label */
  label: string;
  /** Numeric value */
  value: number;
  /** Hex color string, e.g. "#A8C4E0" */
  color: string;
}

export interface CircularBarChartProps {
  segments: ChartSegment[];
  /** Key of the segment that should be active on first render */
  defaultSelected?: string | null;
  /** Diameter of the SVG in px (default: 220) */
  size?: number;
  /** Arc stroke thickness in px (default: 22) */
  strokeWidth?: number;
  /** Gap between arcs as a fraction of 360° (default: 0.04) */
  gapFraction?: number;
  /** Show the legend row below the chart (default: true) */
  showLegend?: boolean;
  /** Extra className on the root wrapper */
  className?: string;
  /** Extra style on the root wrapper */
  style?: CSSProperties;
  /** Called with the newly selected key, or null when deselected */
  onSelect?: (key: string | null) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function polarToXY(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const [x1, y1] = polarToXY(cx, cy, r, startDeg);
  const [x2, y2] = polarToXY(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

function formatValue(v: number): string {
  if (v >= 1_000_000)
    return (v / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(1).replace(".0", "") + "k";
  return String(v);
}

function darkenHex(hex: string, amount = 30): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${[r, g, b]
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;
}

function getTextColor(hex: string): string {
  // Strip alpha suffix if any (e.g. "#A8C4E0cc")
  const clean = hex.replace("#", "").slice(0, 6);
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 180
    ? `rgb(${Math.round(r * 0.4)},${Math.round(g * 0.4)},${Math.round(
        b * 0.4
      )})`
    : "#fff";
}

/**
 * Resolves `icon` to a renderable ReactNode.
 * - If it's already a ReactNode (object / element), return as-is.
 * - If it's a string, look it up in BUILTIN_ICONS.
 */
function resolveIcon(icon: ReactNode | string): ReactNode {
  if (typeof icon === "string") {
    return BUILTIN_ICONS[icon] ?? BUILTIN_ICONS["star"];
  }
  return icon;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CircularBarChart: FC<CircularBarChartProps> = ({
  segments = [],
  defaultSelected = null,
  size = 220,
  strokeWidth = 22,
  gapFraction = 0.04,
  showLegend = false,
  className = "",
  style = {},
  onSelect,
}) => {
  const [activeKey, setActiveKey] = useState<string | null>(defaultSelected);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveKey(defaultSelected ?? null);
  }, [defaultSelected]);

  const total = segments.reduce((s, d) => s + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - strokeWidth / 2 - 4;

  // Arc geometry
  const arcs = (() => {
    const result: Array<{
      seg: ChartSegment;
      start: number;
      end: number;
      mid: number;
    }> = [];
    let cursor = 0;
    segments.forEach((seg) => {
      const fraction = total > 0 ? seg.value / total : 1 / segments.length;
      const span = fraction * 360 - gapFraction * 360;
      const start = cursor;
      const end = cursor + span;
      result.push({ seg, start, end, mid: start + span / 2 });
      cursor = end + gapFraction * 360;
    });
    return result;
  })();

  const handleClick = useCallback(
    (key: string) => {
      const next = activeKey === key ? null : key;
      setActiveKey(next);
      onSelect?.(next);
    },
    [activeKey, onSelect]
  );

  const displayKey = hoveredKey ?? activeKey;
  const displaySeg = displayKey
    ? segments.find((s) => s.key === displayKey)
    : null;
  const displayValue = displaySeg
    ? formatValue(displaySeg.value)
    : formatValue(total);
  const displayLabel = displaySeg ? displaySeg.label : "total";

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        ...style,
      }}
    >
      {/* ── SVG chart ── */}
      <div style={{ position: "relative", width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ overflow: "visible" }}
          role="img"
          aria-label="Circular bar chart"
        >
          {/* Track ring */}
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth={strokeWidth}
          />

          {arcs.map(({ seg, start, end, mid }) => {
            const isActive = activeKey === seg.key;
            const isHovered = hoveredKey === seg.key;
            const isDimmed = !!activeKey && !isActive;
            const sw =
              isActive || isHovered ? strokeWidth + 5 : strokeWidth;
            const arcStroke = isHovered
              ? darkenHex(seg.color, 20)
              : seg.color;
            const opacity = isDimmed ? 0.3 : 1;
            const iconSize = strokeWidth * 1.15;
            const [ix, iy] = polarToXY(cx, cy, R, mid);
            const iconColor = getTextColor(seg.color);
            const resolvedIcon = resolveIcon(seg.icon);

            return (
              <g key={seg.key}>
                {/* Arc */}
                <path
                  d={describeArc(cx, cy, R, start, end)}
                  fill="none"
                  stroke={arcStroke}
                  strokeWidth={sw}
                  strokeLinecap="round"
                  opacity={opacity}
                  style={{
                    cursor: "pointer",
                    transition:
                      "stroke-width 0.2s, opacity 0.2s, stroke 0.2s",
                  }}
                  onClick={() => handleClick(seg.key)}
                  onMouseEnter={() => setHoveredKey(seg.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                />

                {/* Icon badge via foreignObject */}
                <foreignObject
                  x={ix - iconSize / 2}
                  y={iy - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  style={{ pointerEvents: "none", overflow: "visible" }}
                >
                  {/* xmlns required for SVG foreignObject in some renderers */}
                  <div
                    // @ts-expect-error — xmlns is valid in SVG foreignObject context
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      width: iconSize,
                      height: iconSize,
                      borderRadius: "50%",
                      background: isHovered
                        ? darkenHex(seg.color, 15)
                        : seg.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: iconColor,
                      opacity,
                      transition: "background 0.2s",
                    }}
                  >
                    {/*
                     * Wrapper span sizes the icon.
                     * Works for Lucide (<Heart size={n} />), react-icons,
                     * and the built-in SVG nodes (which fill the wrapper).
                     */}
                    <span
                      style={{
                        width: iconSize * 0.52,
                        height: iconSize * 0.52,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: iconSize * 0.52,
                        lineHeight: 1,
                      }}
                    >
                      {resolvedIcon}
                    </span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Center value */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
            minWidth: 80,
          }}
        >
          <div
            style={{
              fontSize: size * 0.13,
              fontWeight: 600,
              letterSpacing: "-0.5px",
              color: "inherit",
              lineHeight: 1.1,
              transition: "all 0.2s",
            }}
          >
            {displayValue}
          </div>
          <div
            style={{
              fontSize: size * 0.065,
              color: "gray",
              marginTop: 3,
              letterSpacing: "0.02em",
            }}
          >
            {displayLabel}
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      {showLegend && (
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {segments.map((seg) => {
            const isActive = activeKey === seg.key;
            const resolvedIcon = resolveIcon(seg.icon);
            return (
              <button
                key={seg.key}
                type="button"
                onClick={() => handleClick(seg.key)}
                onMouseEnter={() => setHoveredKey(seg.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: `1.5px solid ${
                    isActive ? seg.color : "rgba(0,0,0,0.1)"
                  }`,
                  background: isActive ? seg.color + "22" : "transparent",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: "inherit",
                  transition: "all 0.18s",
                  outline: "none",
                }}
              >
                {/* Color dot */}
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: seg.color,
                    flexShrink: 0,
                  }}
                />
                {/* Icon — sized via fontSize for icon-font libs, or via width/height for SVG */}
                <span
                  style={{
                    width: 15,
                    height: 15,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    color: getTextColor(seg.color),
                    flexShrink: 0,
                  }}
                >
                  {resolvedIcon}
                </span>
                {seg.label}
                <span style={{ fontWeight: 600, opacity: 0.7 }}>
                  {formatValue(seg.value)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CircularBarChart;