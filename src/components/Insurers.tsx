import { existsSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import InsurersCarousel from "@/components/InsurersCarousel";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { INSURERS, type Insurer } from "@/data/insurers";
import { imageSize } from "@/lib/imageSize";

/**
 * Not the shared `Section`, for the same reason Testimonials is not: the track
 * runs past the page padding to the viewport edge, so the horizontal padding
 * has to sit on the header and the footer row rather than on the section.
 *
 * Ink, between sand in Clinics and white in Testimonials, which keeps the page
 * alternating — and the yellow rule that closes Clinics lands on it as a
 * boundary rather than a stray line between two light grounds.
 */
const CONTAINER = "mx-auto max-w-7xl px-6 md:px-12 lg:px-16";

const LOGO_DIR = join(process.cwd(), "public", "images", "convenios");
/** Best first: whichever a plan has furthest left wins. */
const LOGO_EXTENSIONS = [".svg", ".webp", ".png", ".jpg", ".jpeg"];

// Compared on letters and digits alone, so a file saved as `CDA.webp` or
// `redeunna.jpg` still finds `cda` and `rede-unna`. Whoever exports the artwork
// should not have to match punctuation exactly.
const flatten = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Adding a logo is dropping `public/images/convenios/<id>.<ext>` in, and
 * nothing else: no code edit, no list to keep in step with the folder. The ids
 * are in `@/data/insurers`.
 *
 * Reading the disk is safe here because this page is prerendered — the lookup
 * runs at build time, not per request. If the page ever turns dynamic, this has
 * to become a generated manifest instead, since `public/` is not traced into
 * the server bundle.
 */
function logosByPlan() {
  const found = new Map<string, string>();
  if (!existsSync(LOGO_DIR)) return found;

  for (const file of readdirSync(LOGO_DIR)) {
    const extension = extname(file).toLowerCase();
    const rank = LOGO_EXTENSIONS.indexOf(extension);
    if (rank < 0) continue;

    // Two files for one plan (a .png next to a .jpg) is a stale leftover more
    // often than a choice, so the better format wins rather than the later name.
    const key = flatten(basename(file, extname(file)));
    const taken = found.get(key);
    if (taken && LOGO_EXTENSIONS.indexOf(extname(taken).toLowerCase()) <= rank) continue;
    found.set(key, file);
  }

  return found;
}

// What an SVG gets instead of a measurement: it has no intrinsic size, and the
// ratio only has to be close enough for the box the card reserves.
const NOMINAL_SVG = { width: 480, height: 168 };

function withLogos(insurers: Insurer[]): Insurer[] {
  const logos = logosByPlan();

  return insurers.map((insurer) => {
    const file = logos.get(flatten(insurer.id));
    if (!file) return insurer;

    const size =
      extname(file).toLowerCase() === ".svg"
        ? NOMINAL_SVG
        : imageSize(join(LOGO_DIR, file)) || NOMINAL_SVG;

    return { ...insurer, logo: { src: `/images/convenios/${file}`, ...size } };
  });
}

export default function Insurers() {
  return (
    <section id="convenios" className="bg-roe-ink scroll-mt-32 py-16">
      <div className={CONTAINER}>
        <SectionHeader
          className="max-w-2xl"
          eyebrow="Convênios"
          title="Convênios Odontológicos Atendidos"
          description="Atendemos os principais planos odontológicos da região. A cobertura de cada exame varia conforme o plano, então vale confirmar no agendamento."
          titleClassName="text-roe-white"
          descriptionClassName="mt-3 text-sm text-white/70 sm:text-base"
        />
      </div>

      {/* Outside any Reveal: the carousel measures its cards to rewind the
          loop, and a translating ancestor would skew that. */}
      <InsurersCarousel insurers={withLogos(INSURERS)} />

      {/* The way out for anyone whose plan is not in the list, in the same shape
          the FAQ closes with — the answer it gives is the same one. */}
      <div className={CONTAINER}>
        <Reveal className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-white/55">
            Não encontrou o seu convênio? Mande uma mensagem — a equipe confirma a cobertura antes
            de você agendar.
          </p>
          <a
            href="#agendar"
            className="bg-roe-yellow hover:bg-roe-yellow-hover hover:shadow-roe-yellow/20 focus-visible:ring-roe-yellow focus-visible:ring-offset-roe-ink inline-flex shrink-0 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-gray-950 shadow-md shadow-black/20 transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-0 active:shadow-md sm:self-start"
          >
            Falar com a gente
          </a>
        </Reveal>
      </div>
    </section>
  );
}
