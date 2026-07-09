import { Code2 as Github, Link as Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/content/site";

const contactMethods = [
  { title: "Email", href: `mailto:${site.email}`, label: site.email, Icon: Mail },
  { title: "LinkedIn", href: site.linkedin, label: "linkedin.com/in/-rahul-singh22", Icon: Linkedin },
  { title: "GitHub", href: site.github, label: "github.com/rahul2-byte", Icon: Github },
  { title: "Phone", href: site.phoneHref, label: site.phone, Icon: Phone },
];

export default function ContactPage() {
  return (
    <main className="section-shell py-20 md:py-24">
      <section className="mx-auto max-w-5xl text-center">
        <p className="section-label">Contact</p>
        <h1 className="font-display mt-4 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
          Get in Touch
        </h1>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
        {contactMethods.map(({ title, href, label, Icon }) => (
          <a
            key={title}
            aria-label={`${title} ${label}`}
            className="glass-panel flex min-h-56 flex-col items-center justify-center gap-2 p-7 text-center transition hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,0.12)]"
            href={href}
          >
            <Icon className="h-10 w-10 text-slate-950" strokeWidth={1.7} />
            <span className="text-2xl font-bold tracking-tight text-slate-950">{title}</span>
            <span className="break-all text-sm text-slate-700">{label}</span>
          </a>
        ))}
      </section>

      <div className="mt-12 flex justify-center">
        <a
          className="btn-primary bg-[#0b66d8] text-base hover:bg-[#0958ba]"
          download="Rahul-Singh-ML-Engineer-Resume.pdf"
          href={site.resume}
        >
          Download Technical Resume
        </a>
      </div>
    </main>
  );
}
