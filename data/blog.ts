export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date */
  date: string;
  readMinutes: number;
  category: string;
  metaTitle: string;
  metaDescription: string;
  sections: BlogSection[];
  /** related product slugs */
  related: string[];
}

/**
 * Starter articles targeting industry search intent (brief §7). Content is
 * general, factual industry knowledge — expand/replace with owner-reviewed copy.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "uses-of-methanol-in-industry",
    title: "Uses of Methanol in Industry",
    excerpt:
      "Methanol is one of the most versatile industrial chemicals — a feedstock for formaldehyde and acetic acid, a fuel component, and a building block for dozens of derivatives.",
    date: "2026-06-15",
    readMinutes: 5,
    category: "Products",
    metaTitle: "Uses of Methanol in Industry | Applications & Derivatives",
    metaDescription:
      "A practical overview of how methanol is used in industry: formaldehyde and acetic acid production, MTBE feedstock, solvents and fuel blending.",
    sections: [
      {
        paragraphs: [
          "Methanol (CH₃OH) is a colourless, water-soluble liquid and one of the highest-volume building blocks in the global chemical industry. Its value comes from being both a versatile feedstock and a clean-burning fuel component.",
        ],
      },
      {
        heading: "Chemical feedstock",
        paragraphs: [
          "The largest share of methanol demand goes into making other chemicals. The most important derivative is formaldehyde, which in turn feeds resins used in wood panels, coatings and moulding compounds.",
          "Methanol is also converted into acetic acid, a key input for polymers, adhesives and textiles, and is the primary feedstock for MTBE, a high-octane gasoline component.",
        ],
        bullets: [
          "Formaldehyde production",
          "Acetic acid manufacture",
          "MTBE and other fuel ethers",
          "Dimethyl ether (DME) and olefins",
        ],
      },
      {
        heading: "Solvents and intermediates",
        paragraphs: [
          "Because it dissolves a wide range of substances, methanol is used as an industrial solvent and as a reaction medium and intermediate in pharmaceutical and specialty-chemical synthesis.",
        ],
      },
      {
        heading: "Fuel and energy",
        paragraphs: [
          "Methanol burns cleanly and is used directly as a fuel, as a blending component, and increasingly as a lower-carbon marine fuel. Fuel-grade methanol is optimised for these energy applications.",
        ],
      },
      {
        heading: "Choosing the right grade",
        paragraphs: [
          "Chemical synthesis typically calls for high-purity AA-grade methanol, while blending and energy uses can use fuel-grade product. Matching grade to application avoids over-specifying and controls cost.",
        ],
      },
    ],
    related: ["methanol", "mtbe"],
  },
  {
    slug: "mtbe-vs-ethanol-fuel-oxygenate",
    title: "MTBE vs Ethanol as a Fuel Oxygenate",
    excerpt:
      "Both MTBE and ethanol raise octane and add oxygen to gasoline, but they differ in blending behaviour, energy content and handling. Here's how they compare.",
    date: "2026-06-28",
    readMinutes: 6,
    category: "Applications",
    metaTitle: "MTBE vs Ethanol as a Fuel Oxygenate | Comparison",
    metaDescription:
      "How MTBE and ethanol compare as gasoline oxygenates: octane, energy density, blending, water sensitivity and where each is typically used.",
    sections: [
      {
        paragraphs: [
          "Oxygenates are added to gasoline to raise octane and improve combustion. The two most common are MTBE (methyl tertiary-butyl ether) and ethanol. Each has trade-offs that make it better suited to different markets and blending systems.",
        ],
      },
      {
        heading: "Octane and energy content",
        paragraphs: [
          "Both raise the octane rating of the finished fuel. MTBE has an energy density closer to gasoline, so it has less impact on fuel economy per litre than ethanol, which is more oxygen-rich but lower in energy content.",
        ],
      },
      {
        heading: "Blending and handling",
        paragraphs: [
          "MTBE blends readily with gasoline and is not sensitive to water, so it can travel through conventional pipelines and storage. Ethanol is hygroscopic — it attracts water — which can cause phase separation and usually requires splash blending closer to the point of sale.",
        ],
        bullets: [
          "MTBE: low water sensitivity, pipeline-compatible",
          "Ethanol: renewable, but hygroscopic",
          "MTBE: stable vapour pressure behaviour",
        ],
      },
      {
        heading: "Where each is used",
        paragraphs: [
          "Regional policy is a major driver. Some markets favour ethanol for its renewable credentials, while others rely on MTBE for its blending and logistics advantages. Many refiners evaluate both against local regulation, feedstock cost and infrastructure.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "There is no single 'better' oxygenate — the right choice depends on octane targets, logistics, regulation and cost. Fuel-grade MTBE remains a practical, high-performance option where its handling advantages matter.",
        ],
      },
    ],
    related: ["mtbe", "methanol", "isobutylene"],
  },
  {
    slug: "isobutylene-in-butyl-rubber",
    title: "How Isobutylene Is Used in Butyl Rubber",
    excerpt:
      "High-purity isobutylene is the backbone of butyl rubber — the material behind airtight tyre inner liners, seals and pharmaceutical closures.",
    date: "2026-07-05",
    readMinutes: 5,
    category: "Applications",
    metaTitle: "How Isobutylene Is Used in Butyl Rubber | Explained",
    metaDescription:
      "Understand the role of high-purity isobutylene in butyl rubber production, why purity matters, and the end uses from tyre liners to pharma closures.",
    sections: [
      {
        paragraphs: [
          "Isobutylene (C₄H₈) is a reactive olefin best known as the main monomer in butyl rubber. Its structure gives the finished polymer an unusually low permeability to gases — the property that makes butyl rubber so useful.",
        ],
      },
      {
        heading: "From monomer to butyl rubber",
        paragraphs: [
          "Butyl rubber is made by copolymerising isobutylene with a small amount of isoprene. The result is an elastomer that is highly impermeable to air and moisture, chemically stable and resistant to ageing.",
          "Because polymerisation is sensitive to impurities, high-purity isobutylene (typically greater than 99.5%) is required for consistent, high-quality rubber.",
        ],
      },
      {
        heading: "Why purity matters",
        paragraphs: [
          "Trace contaminants can interfere with polymerisation, affecting molecular weight and the final material's performance. Tight isobutylene specifications translate directly into predictable, reproducible rubber properties.",
        ],
      },
      {
        heading: "End uses",
        paragraphs: [
          "The airtightness of butyl rubber makes it the standard for tyre inner liners and inner tubes. It is also used in seals, gaskets, adhesives and pharmaceutical stoppers.",
        ],
        bullets: [
          "Tyre inner liners and tubes",
          "Seals, gaskets and vibration damping",
          "Adhesives and sealants",
          "Pharmaceutical closures",
        ],
      },
      {
        heading: "Beyond rubber",
        paragraphs: [
          "Isobutylene is also used to produce MTBE, polyisobutylene and antioxidants — making it a versatile building block well beyond the tyre industry.",
        ],
      },
    ],
    related: ["isobutylene", "mtbe"],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);
