import { ArrowDown, ArrowUpRight, Code, Layers, Terminal } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const skills = [
  {
    title: "Interface development",
    description: "Component-based layouts with React and TypeScript.",
    tools: ["React", "TypeScript"],
    icon: Code,
  },
  {
    title: "Design systems",
    description: "Responsive layouts and reusable interface components.",
    tools: ["Tailwind CSS", "shadcn/ui"],
    icon: Layers,
  },
  {
    title: "Build tooling",
    description: "A fast feedback loop for developing and checking the site.",
    tools: ["Vite", "ESLint"],
    icon: Terminal,
  },
];

const sectionClass = "mx-auto max-w-6xl px-6 py-20 sm:py-28";
const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.2em] text-blue-400";
const headingClass = "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl";
const cardClass = "rounded-xl border border-border bg-card p-6 text-card-foreground";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <section
          id="home"
          aria-labelledby="home-title"
          className="relative isolate overflow-hidden border-b border-border"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#172e56,transparent_65%)]"
          />
          <div className="mx-auto flex min-h-[min(42rem,80svh)] max-w-6xl flex-col justify-center px-6 py-24">
            <p className={eyebrowClass}>Personal portfolio</p>
            <h1 id="home-title" className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
              Hi, I’m Michael<span className="text-blue-400">.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              This is where I share what I’m building and the tools I’m using along the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button nativeButton={false} render={<a href="#projects" />} size="lg" className="bg-blue-600 hover:bg-blue-500">
                View projects <ArrowDown aria-hidden="true" />
              </Button>
              <Button nativeButton={false} render={<a href="#about" />} size="lg" variant="outline">
                About me
              </Button>
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-title" className={sectionClass}>
          <p className={eyebrowClass}>01 / About</p>
          <h2 id="about-title" className={headingClass}>A little about me</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I’m Michael. I built this portfolio to bring my projects and the details behind them together in one place.
          </p>
        </section>

        <div className="border-y border-border">
          <section id="skills" aria-labelledby="skills-title" className={sectionClass}>
            <p className={eyebrowClass}>02 / Skills</p>
            <h2 id="skills-title" className={headingClass}>Tools I use on this site</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {skills.map(({ title, description, tools, icon: Icon }) => (
                <article key={title} className={cardClass}>
                  <Icon aria-hidden="true" className="size-5 text-blue-400" />
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <li key={tool} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section id="projects" aria-labelledby="projects-title" className={sectionClass}>
          <p className={eyebrowClass}>03 / Projects</p>
          <h2 id="projects-title" className={headingClass}>Selected work</h2>
          <article className={`${cardClass} mt-8 max-w-2xl`}>
            <p className={eyebrowClass}>Web development</p>
            <h3 className="mt-3 text-xl font-semibold">Personal portfolio</h3>
            <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
              A responsive React site with a mobile navigation drawer and reusable shadcn/ui components.
            </p>
            <a href="#home" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300">
              View portfolio <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </article>
        </section>

        <div className="border-y border-border">
          <section id="experience" aria-labelledby="experience-title" className={sectionClass}>
            <p className={eyebrowClass}>04 / Experience</p>
            <h2 id="experience-title" className={headingClass}>Experience</h2>
            <p className="mt-5 text-muted-foreground">Work history will be added here.</p>
          </section>
        </div>

        <section id="contact" aria-labelledby="contact-title" className={sectionClass}>
          <p className={eyebrowClass}>05 / Contact</p>
          <h2 id="contact-title" className={headingClass}>Get in touch</h2>
          <p className="mt-5 text-muted-foreground">Contact details will be added here.</p>
        </section>

        <div className="border-t border-border">
          <section id="resume" aria-labelledby="resume-title" className={sectionClass}>
            <p className={eyebrowClass}>06 / Resume</p>
            <h2 id="resume-title" className={headingClass}>Resume</h2>
            <p className="mt-5 text-muted-foreground">Resume coming soon.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground">
          <span>Michael · Personal portfolio</span>
          <a href="#home" className="hover:text-foreground">Back to top</a>
        </div>
      </footer>
    </>
  );
}

export default App;
