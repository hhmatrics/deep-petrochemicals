import { COMPANY, isKnown } from "@/data/company";
import { IconBadgeCheck, IconMapPin, IconTruck } from "@/components/icons";

/**
 * Trust bar (brief §4.3): certifications + location + capacity figure.
 * Capacity is TBD — until the owner confirms it we show a supply-mode signal
 * instead of inventing a number.
 */
export function TrustBar() {
  return (
    <section className="border-b border-ink-200 bg-paper">
      <div className="container-page grid gap-6 py-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <IconBadgeCheck className="shrink-0 text-brand-600" />
          <div>
            <p className="text-sm font-semibold text-ink-900">
              {COMPANY.certifications.join(" · ")}
            </p>
            <p className="text-xs text-ink-500">Quality, environment & safety</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:justify-center">
          <IconMapPin className="shrink-0 text-leaf-600" />
          <div>
            <p className="text-sm font-semibold text-ink-900">
              {COMPANY.address.area}, {COMPANY.address.district}
            </p>
            <p className="text-xs text-ink-500">
              {COMPANY.address.state}, {COMPANY.address.country}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:justify-end">
          <IconTruck className="shrink-0 text-brand-600" />
          <div>
            {isKnown(COMPANY.capacityMtpa) ? (
              <>
                <p className="text-sm font-semibold text-ink-900">
                  {COMPANY.capacityMtpa} MTPA capacity
                </p>
                <p className="text-xs text-ink-500">Integrated manufacturing</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-ink-900">
                  Bulk · ISO-tank · drum
                </p>
                <p className="text-xs text-ink-500">Export-ready logistics</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
