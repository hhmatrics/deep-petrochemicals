import type { SVGProps } from "react";

/**
 * Minimal line-icon set (24×24, currentColor stroke) — avoids an icon-library
 * dependency. Consistent stroke width keeps them a family.
 */
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconDroplet = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 2.7 6.3 9.6a7.5 7.5 0 1 0 11.4 0L12 2.7Z" />
  </Icon>
);

export const IconAtom = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="1.6" />
    <ellipse cx="12" cy="12" rx="10" ry="4.3" />
    <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(120 12 12)" />
  </Icon>
);

export const IconFuel = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 22h12V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v18Z" />
    <path d="M15 8h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-3-3" />
    <path d="M3 10h12" />
  </Icon>
);

export const IconFlask = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.4 2h11.2A1.5 1.5 0 0 0 19 19l-5-10V3" />
    <path d="M7.5 14h9" />
  </Icon>
);

export const IconBadgeCheck = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const IconHandshake = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-1.7-.5l-2.2.3a2 2 0 0 1-1.6-.5L8 7" />
    <path d="M16 6 21 11" />
    <path d="M3 13 8 8l3 3-2 2a2 2 0 0 1-3 0l-3 3" />
  </Icon>
);

export const IconClock = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);

export const IconTruck = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M14 16V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10h13Z" />
    <path d="M14 8h4l3 3v5h-7" />
    <circle cx="5.5" cy="18.5" r="1.6" />
    <circle cx="17.5" cy="18.5" r="1.6" />
  </Icon>
);

export const IconLeaf = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 8-4 12-9 12" />
    <path d="M4 20c3-4 6-6 12-8" />
  </Icon>
);

export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3 4.5 6v5c0 4.5 3 8.3 7.5 10 4.5-1.7 7.5-5.5 7.5-10V6L12 3Z" />
  </Icon>
);

export const IconArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const IconMapPin = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

/* Industry icons */
export const IconLayers = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </Icon>
);

export const IconCar = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M5 12 6.5 7A2 2 0 0 1 8.4 5.6h7.2A2 2 0 0 1 17.5 7L19 12" />
    <path d="M3 12h18v5H3zM3 17v2M21 17v2" />
    <circle cx="7" cy="14.5" r="1" />
    <circle cx="17" cy="14.5" r="1" />
  </Icon>
);

export const IconBuilding = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" />
    <path d="M15 9h3a1 1 0 0 1 1 1v11M3 21h18" />
    <path d="M8 7h2M8 11h2M8 15h2" />
  </Icon>
);

export const IconShirt = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 3 4 6l2 3 2-1v10h8V8l2 1 2-3-4-3-2 2a2 2 0 0 1-4 0L8 3Z" />
  </Icon>
);

export const IconPill = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-45 12 12)" />
    <path d="M8.5 8.5 15.5 15.5" />
  </Icon>
);

export const IconFlame = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-1.5.6-2.7 1.3-3.6C9 10 10 9 10 7c1.5 1 2 2.5 2 4 1-1 0-4 0-8Z" />
  </Icon>
);

export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);

export const IconPhone = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L18 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 0-2Z" />
  </Icon>
);

export const IconRecycle = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 19H5a2 2 0 0 1-1.7-3l1.3-2.2" />
    <path d="m9 5 1.8-3a2 2 0 0 1 3.4 0L16 5" />
    <path d="M19 12l1.7 2.9a2 2 0 0 1-1.7 3H15" />
    <path d="m7 19 2 2m-2-2 2-2M4.8 9 3 12m5-7L6 6.5M17 5l-1 3 3-.5" />
  </Icon>
);

export const IconUsers = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M21 20a6 6 0 0 0-4-5.6" />
  </Icon>
);

export const IconGlobe = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </Icon>
);

export const IconTarget = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </Icon>
);

export const IconGauge = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 15a8 8 0 1 1 16 0" />
    <path d="m13 13-3-2M4 15h2m12 0h2M12 4v2" />
  </Icon>
);

export const IconFactory = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 21V10l6 4V10l6 4V7l3-2v16H3Z" />
    <path d="M7 21v-4M12 21v-4M17 21v-4" />
  </Icon>
);

/** WhatsApp brand glyph (filled, not part of the line-icon family). */
export const IconWhatsapp = (p: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...p}
  >
    <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.12.82.83-3.04-.19-.31a8.02 8.02 0 0 1-1.24-4.29c0-4.46 3.63-8.1 8.1-8.1Zm4.68 11.44c-.08-.13-.29-.2-.6-.36-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.7.16-.21.31-.8 1-.98 1.21-.18.2-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.54a9.4 9.4 0 0 1-1.73-2.15c-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.53-.7-.54h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.06-1.09 2.59s1.12 3 1.27 3.21c.16.2 2.2 3.36 5.33 4.71.74.32 1.32.51 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48Z" />
  </svg>
);
