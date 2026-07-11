import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

const SCALE = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function Swatch({
  prefix,
  step,
  label,
}: {
  prefix: "brand" | "leaf" | "ink";
  step: number;
  label?: string;
}) {
  // step >= 500 gets light text (dynamic Tailwind classes can't be JIT-scanned,
  // so colour comes from the theme CSS variable via inline style)
  const light = step >= 500;
  return (
    <div className="flex flex-col">
      <div
        className="flex h-16 items-end rounded-md border border-black/5 p-1.5"
        style={{ backgroundColor: `var(--color-${prefix}-${step})` }}
      >
        <span
          className={`font-mono text-[10px] ${light ? "text-white/90" : "text-black/60"}`}
        >
          {step}
        </span>
      </div>
      {label ? (
        <span className="mt-1 text-[10px] text-ink-500">{label}</span>
      ) : null}
    </div>
  );
}

function Row({
  name,
  prefix,
  note,
}: {
  name: string;
  prefix: "brand" | "leaf" | "ink";
  note: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-lg">{name}</h3>
        <span className="text-sm text-ink-500">{note}</span>
      </div>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
        {SCALE.map((s) => (
          <Swatch key={s} prefix={prefix} step={s} />
        ))}
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <div className="container-page py-12">
      {/* Masthead */}
      <header className="mb-12 border-b border-ink-200 pb-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="rounded-xl bg-leaf-50 p-4">
            <Image
              src="/deeppetrochemicalslogo.png"
              alt="Deep Petrochemicals Limited logo"
              width={180}
              height={144}
              className="h-24 w-auto object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Brand System
            </p>
            <h1 className="mt-1 text-4xl">Deep Petrochemicals — Style Guide</h1>
            <p className="mt-2 max-w-2xl text-ink-600">
              Colour, typography and component primitives derived from the logo.
              Orange leads (identity + CTAs), green supports (sustainability),
              neutral ink carries the credible industrial base.
            </p>
          </div>
        </div>
      </header>

      {/* Colour */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl">Colour</h2>
        <Row name="Brand — Orange" prefix="brand" note="Primary identity · CTAs" />
        <Row name="Leaf — Green" prefix="leaf" note="Sustainability · HSE · success" />
        <Row name="Ink — Neutral" prefix="ink" note="Text · surfaces · header/footer" />
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl">Typography</h2>
        <div className="space-y-6 rounded-xl border border-ink-200 p-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-ink-400">
              Display / Sora · fluid
            </span>
            <p
              className="font-display font-extrabold text-ink-900"
              style={{ fontSize: "var(--text-display)", lineHeight: 1.05 }}
            >
              Powering Progress Through Advanced Chemistry
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-ink-400">
              H1 · Sora 700
            </span>
            <h1 className="text-4xl">Methanol Supplier in Gujarat</h1>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-ink-400">
              H2 · Sora 700
            </span>
            <h2 className="text-3xl">AA &amp; Fuel Grade methanol</h2>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-ink-400">
              H3 · Sora 600
            </span>
            <h3 className="text-xl">Reliable bulk supply</h3>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-ink-400">
              Body · Inter · 16/1.6
            </span>
            <p className="max-w-2xl text-ink-700">
              We manufacture high-quality petrochemical products that serve as the
              building blocks for industry — from methanol and MTBE to
              high-purity isobutylene and made-to-order specialty chemicals,
              delivered with consistent quality and reliable supply.
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-ink-400">
              Small / meta · Inter
            </span>
            <p className="text-sm text-ink-500">
              Saykha GIDC, Bharuch, Gujarat · ISO 9001 · ISO 14001 · ISO 45001
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl">Buttons &amp; primitives</h2>
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-ink-200 p-8">
          <button className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-700">
            Request a Quote
          </button>
          <button className="rounded-lg bg-leaf-600 px-5 py-2.5 font-semibold text-white transition hover:bg-leaf-700">
            Download Portfolio
          </button>
          <button className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 font-semibold text-ink-800 transition hover:border-brand-500 hover:text-brand-600">
            Contact Sales
          </button>
          <button className="rounded-lg px-5 py-2.5 font-semibold text-brand-600 transition hover:bg-brand-50">
            Learn more →
          </button>
          <span className="inline-flex items-center rounded-full bg-leaf-100 px-3 py-1 text-sm font-medium text-leaf-800">
            High Purity &gt; 99.5%
          </span>
          <span className="inline-flex items-center rounded-full border border-ink-200 px-3 py-1 text-sm font-medium text-ink-600">
            AA Grade
          </span>
        </div>
      </section>

      {/* Surfaces */}
      <section>
        <h2 className="mb-6 text-2xl">Surfaces</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-ink-900 p-6 text-white">
            <p className="font-display text-lg font-bold">Dark section</p>
            <p className="mt-1 text-sm text-ink-300">
              Header / footer / stat bands — ink-900 with light text.
            </p>
          </div>
          <div className="rounded-xl bg-leaf-50 p-6">
            <p className="font-display text-lg font-bold text-leaf-800">
              Sustainability band
            </p>
            <p className="mt-1 text-sm text-leaf-900/70">
              leaf-50 surface for HSE / eco content.
            </p>
          </div>
          <div className="rounded-xl bg-brand-50 p-6">
            <p className="font-display text-lg font-bold text-brand-700">
              CTA band
            </p>
            <p className="mt-1 text-sm text-brand-900/70">
              brand-50 surface for quote / conversion prompts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
