import Image from "next/image";

export function PortraitCard() {
  return (
    <figure className="portrait-card technical-grid relative overflow-hidden">
      <div className="signal-glow pointer-events-none absolute inset-10 z-10" />
      <Image
        src="/images/portrait.png"
        alt="Professional portrait of Rahul Singh"
        width={1122}
        height={1402}
        priority
        sizes="(max-width: 1024px) min(82vw, 28rem), 26rem"
        className="block h-auto w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[color:color-mix(in_srgb,var(--foreground)_18%,transparent)] via-transparent to-[color:color-mix(in_srgb,var(--primary)_12%,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 font-technical text-[0.65rem] uppercase tracking-wider text-[color:color-mix(in_srgb,var(--background)_88%,var(--foreground))] sm:p-6">
        <span>Portrait / verified</span>
        <span>RS-01</span>
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 z-20 border-t border-white/20 bg-[color:color-mix(in_srgb,var(--foreground)_58%,transparent)] px-5 py-4 backdrop-blur-sm sm:px-6">
        <p className="font-display text-xl font-semibold tracking-[-0.035em] text-[var(--background)]">
          Rahul Singh
        </p>
        <p className="font-technical mt-2 text-[0.65rem] uppercase tracking-wider text-white/72">
          Machine Learning Engineer
        </p>
      </figcaption>
    </figure>
  );
}
