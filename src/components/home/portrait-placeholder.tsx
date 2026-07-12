import { ScanFace } from "lucide-react";

export function PortraitPlaceholder() {
  return (
    <div
      className="portrait-placeholder technical-grid relative aspect-[4/5] overflow-hidden"
      role="img"
      aria-label="Professional portrait placeholder for Rahul Singh"
    >
      <div className="signal-glow absolute inset-8" />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between font-technical text-[0.65rem] uppercase tracking-wider">
          <span>Portrait / pending</span>
          <span>RS-01</span>
        </div>
        <div className="mx-auto grid h-28 w-28 place-items-center border border-[var(--foreground)] bg-[var(--primary-soft)] sm:h-36 sm:w-36">
          <ScanFace className="h-12 w-12 sm:h-16 sm:w-16" strokeWidth={1.2} aria-hidden />
        </div>
        <div className="border-t soft-divider pt-4">
          <p className="font-display text-xl font-semibold tracking-[-0.035em]">Professional portrait</p>
          <p className="font-technical mt-2 text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">
            4:5 crop · 1200 × 1500 recommended
          </p>
        </div>
      </div>
    </div>
  );
}
