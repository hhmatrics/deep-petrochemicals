import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/data/company";
import { IconMapPin, IconBadgeCheck } from "@/components/icons";

/**
 * Hero (brief §4.2). Branded gradient + abstract molecular graphic instead of
 * the unusable stock banner — text-free, no external image. Swap the background
 * for a real Saykha plant photo when available (see open items).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {/* Gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 82% 8%, rgba(224,99,42,0.30), transparent 60%)," +
            "radial-gradient(55% 65% at 8% 95%, rgba(124,179,66,0.22), transparent 60%)," +
            "linear-gradient(135deg, #16130f 0%, #1c1a18 45%, #12100c 100%)",
        }}
      />
      {/* Hex pattern overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hexes"
            width="56"
            height="48"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.4)"
          >
            <path
              d="M28 0 L42 8 V24 L28 32 L14 24 V8 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexes)" />
      </svg>

      <div className="container-page relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-32">
        {/* Copy */}
        <div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-ink-300">
            <span className="inline-flex items-center gap-1.5">
              <IconMapPin width={16} height={16} className="text-brand-400" />
              {COMPANY.address.area}, {COMPANY.address.district}, {COMPANY.address.state}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconBadgeCheck width={16} height={16} className="text-leaf-400" />
              ISO-certified processes
            </span>
          </div>

          <h1
            className="mt-6 max-w-2xl font-display font-extrabold leading-[1.05]"
            style={{ fontSize: "var(--text-display)" }}
          >
            Powering Progress Through{" "}
            <span className="text-brand-400">Advanced Chemistry</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
            {COMPANY.shortName} manufactures methanol, isobutylene, MTBE and
            specialty chemicals — the building blocks of industry — with
            consistent quality, reliable bulk supply and responsible operations.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/request-a-quote" size="lg">
              Request a Quote
            </Button>
            <Button
              href="/downloads"
              size="lg"
              variant="outline"
              className="border-ink-600 bg-transparent text-white hover:border-brand-400 hover:text-brand-400"
            >
              Download Product Portfolio
            </Button>
          </div>
        </div>

        {/* Abstract molecule graphic */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <MoleculeGraphic />
        </div>
      </div>

      {/* Accent seam into the page */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-500 via-brand-400 to-leaf-500" />
    </section>
  );
}

function MoleculeGraphic() {
  const nodes = [
    { x: 210, y: 60, r: 10, c: "#e0632a" },
    { x: 300, y: 130, r: 16, c: "#7cb342" },
    { x: 180, y: 180, r: 12, c: "#e0632a" },
    { x: 90, y: 110, r: 9, c: "#ffae70" },
    { x: 250, y: 240, r: 8, c: "#94c552" },
    { x: 120, y: 280, r: 14, c: "#e0632a" },
    { x: 330, y: 300, r: 10, c: "#7cb342" },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [4, 6],
    [2, 5],
    [1, 4],
  ];
  return (
    <svg viewBox="0 0 400 360" className="mx-auto w-full max-w-md">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="white"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 6} fill={n.c} opacity="0.15" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
        </g>
      ))}
    </svg>
  );
}
