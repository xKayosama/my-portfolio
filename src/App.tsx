import { Fragment, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowUp, ArrowUpRight, Cable, Check, CircleAlert, Code, Copy, Ellipsis, GraduationCap, LockKeyhole, Mail, Phone, Server, Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import attendancePreview from "@/assets/projects/attendance-system.jpg";
import divvyMobilePreview from "@/assets/projects/divvy-mobile.jpg";
import divvyWebPreview from "@/assets/projects/divvy-web.jpg";
import reactLogo from "@/assets/react.svg";
import chartLogo from "@/assets/technology/chartdotjs.svg?no-inline";
import cssLogo from "@/assets/technology/css.svg?no-inline";
import dockerLogo from "@/assets/technology/docker.svg";
import expoRouterLogo from "@/assets/technology/expo-router.svg";
import expoLogo from "@/assets/technology/expo.svg";
import expressLogo from "@/assets/technology/express.svg";
import gitLogo from "@/assets/technology/git.svg?no-inline";
import githubLogo from "@/assets/technology/github.svg";
import graphqlLogo from "@/assets/technology/graphql.svg?no-inline";
import htmlLogo from "@/assets/technology/html5.svg?no-inline";
import javaScriptLogo from "@/assets/technology/javascript.svg?no-inline";
import jestLogo from "@/assets/technology/jest.svg?no-inline";
import mongoLogo from "@/assets/technology/mongodb.svg";
import nativeWindLogo from "@/assets/technology/nativewind.svg";
import nextLogo from "@/assets/technology/nextdotjs.svg?no-inline";
import nodeLogo from "@/assets/technology/nodedotjs.svg";
import nuxtLogo from "@/assets/technology/nuxt.svg?no-inline";
import primeVueLogo from "@/assets/technology/primevue.svg";
import reactRouterLogo from "@/assets/technology/reactrouter.svg?no-inline";
import reduxLogo from "@/assets/technology/redux.svg";
import shadcnLogo from "@/assets/technology/shadcnui.svg";
import tailwindLogo from "@/assets/technology/tailwindcss.svg";
import tesseractWordmark from "@/assets/technology/tesseractjs.png";
import typeScriptLogo from "@/assets/technology/typescript.svg";
import vueLogo from "@/assets/technology/vuedotjs.svg";
import viteLogo from "@/assets/vite.svg";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const githubProfile = "https://github.com/xKayosama";
const portfolioRepository = `${githubProfile}/my-portfolio`;
const contactEmail = "layosamikel@gmail.com";
const contactPhone = "+63 920 387 4079";

type ProjectStatus = "Personal" | "Private" | "Under construction";
const portfolioStatus: ProjectStatus = "Under construction";
const disabledProjectStatuses = new Set<ProjectStatus>(["Private", "Under construction"]);

type Tool = {
  name: string;
  icon: string | LucideIcon;
  wordmark?: boolean;
  docs?: string;
};

type Skill = {
  title: string;
  description: string;
  tools: (Tool & { docs: string })[];
  icon: LucideIcon;
};

const skills: Skill[] = [
  {
    title: "Front-end development",
    description: "Responsive interfaces and reusable components.",
    tools: [
      { name: "HTML", icon: htmlLogo, docs: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", icon: cssLogo, docs: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "JavaScript", icon: javaScriptLogo, docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TypeScript", icon: typeScriptLogo, docs: "https://www.typescriptlang.org/docs/" },
      { name: "React", icon: reactLogo, docs: "https://react.dev/learn" },
      { name: "Next.js", icon: nextLogo, docs: "https://nextjs.org/docs" },
      { name: "Vue", icon: vueLogo, docs: "https://vuejs.org/guide/introduction.html" },
      { name: "Nuxt", icon: nuxtLogo, docs: "https://nuxt.com/docs" },
      { name: "Tailwind CSS", icon: tailwindLogo, docs: "https://tailwindcss.com/docs" },
      { name: "shadcn/ui", icon: shadcnLogo, docs: "https://ui.shadcn.com/docs" },
    ],
    icon: Code,
  },
  {
    title: "Mobile development",
    description: "Cross-platform apps for iOS and Android.",
    tools: [
      { name: "React Native", icon: reactLogo, docs: "https://reactnative.dev/docs/getting-started" },
      { name: "Expo", icon: expoLogo, docs: "https://docs.expo.dev/" },
      { name: "Expo Router", icon: expoRouterLogo, docs: "https://docs.expo.dev/router/introduction/" },
      { name: "NativeWind", icon: nativeWindLogo, docs: "https://www.nativewind.dev/docs/getting-started/installation" },
    ],
    icon: Smartphone,
  },
  {
    title: "State and APIs",
    description: "Client state, data fetching, and API integration.",
    tools: [
      { name: "Redux Toolkit", icon: reduxLogo, docs: "https://redux.js.org/toolkit/introduction/getting-started" },
      { name: "RTK Query", icon: reduxLogo, docs: "https://redux.js.org/toolkit/rtk-query/overview" },
      { name: "REST APIs", icon: Cable, docs: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design" },
      { name: "GraphQL", icon: graphqlLogo, docs: "https://graphql.org/learn/" },
    ],
    icon: Cable,
  },
  {
    title: "Backend and workflow",
    description: "Server development, version control, and testing.",
    tools: [
      { name: "Node.js", icon: nodeLogo, docs: "https://nodejs.org/api/" },
      { name: "Express", icon: expressLogo, docs: "https://expressjs.com/en/starter/installing.html" },
      { name: "MongoDB", icon: mongoLogo, docs: "https://www.mongodb.com/docs/" },
      { name: "Git", icon: gitLogo, docs: "https://git-scm.com/docs" },
      { name: "GitHub", icon: githubLogo, docs: "https://docs.github.com/" },
      { name: "Docker", icon: dockerLogo, docs: "https://docs.docker.com/" },
      { name: "Jest", icon: jestLogo, docs: "https://jestjs.io/docs/getting-started" },
    ],
    icon: Server,
  },
];

const previewProjects: {
  title: string;
  status?: ProjectStatus;
  platform: string;
  preview: string;
  previewAlt: string;
  description: string;
  tools: Tool[];
}[] = [
  {
    title: "Divvy Web",
    platform: "Web application",
    preview: divvyWebPreview,
    previewAlt: "Divvy Web dashboard with sample expense data",
    description: "A web app for tracking group expenses, managing shared bills, and seeing who owes what.",
    tools: [
      { name: "React", icon: reactLogo },
      { name: "TypeScript", icon: typeScriptLogo },
      { name: "Vite", icon: viteLogo },
      { name: "React Router", icon: reactRouterLogo },
      { name: "Tailwind CSS", icon: tailwindLogo },
      { name: "shadcn/ui", icon: shadcnLogo },
      { name: "Redux Toolkit", icon: reduxLogo },
      { name: "RTK Query", icon: reduxLogo },
    ],
  },
  {
    title: "Divvy Mobile",
    platform: "Mobile application",
    preview: divvyMobilePreview,
    previewAlt: "Divvy Mobile dashboard with sample expense data",
    description: "An iOS and Android app for splitting expenses, recording repayments, and scanning receipts with Tesseract.js on the backend.",
    tools: [
      { name: "React Native", icon: reactLogo },
      { name: "Expo", icon: expoLogo },
      { name: "Expo Router", icon: expoRouterLogo },
      { name: "TypeScript", icon: typeScriptLogo },
      { name: "NativeWind", icon: nativeWindLogo },
      { name: "Redux Toolkit", icon: reduxLogo },
      { name: "RTK Query", icon: reduxLogo },
      { name: "Expo SecureStore", icon: expoLogo },
      { name: "Expo Notifications", icon: expoLogo },
      { name: "Tesseract.js", icon: tesseractWordmark, wordmark: true, docs: "https://github.com/naptha/tesseract.js/blob/master/docs/api.md" },
    ],
  },
  {
    title: "Attendance System",
    status: "Private",
    platform: "Web application",
    preview: attendancePreview,
    previewAlt: "Attendance System sign-in screen for iTimeHR",
    description: "An employee portal for managing attendance, daily time records, schedules, requests, and payroll reports.",
    tools: [
      { name: "Vue", icon: vueLogo },
      { name: "Nuxt", icon: nuxtLogo },
      { name: "Tailwind CSS", icon: tailwindLogo },
      { name: "PrimeVue", icon: primeVueLogo },
      { name: "REST APIs", icon: Cable },
      { name: "Chart.js", icon: chartLogo },
    ],
  },
];

const sectionClass = "mx-auto max-w-6xl px-6 py-20 sm:py-28";
const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.2em] text-blue-400";
const headingClass = "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl";
const cardClass = "rounded-xl border border-border bg-card p-6 text-card-foreground";
const highlightedCardClass = `${cardClass} transition-shadow hover:shadow-[inset_0_0_24px_#60a5fa33] focus-within:shadow-[inset_0_0_24px_#60a5fa33] motion-reduce:transition-none`;
const projectStatusClass = "rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground";
const footerLinkClass = "inline-flex items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-blue-400/10 hover:text-blue-300! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 motion-reduce:transition-none";
const toolBadgeClass = "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5";
const revealItemVariants = {
  hidden: { opacity: 0, y: 14, transition: { duration: 0 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

function FooterSocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<motion.a href={href} variants={revealItemVariants} className={`${footerLinkClass} max-md:bg-muted`} />}>
        {children}
        <span className="sr-only md:not-sr-only">{label}</span>
      </TooltipTrigger>
      <TooltipContent className="md:hidden">{label}</TooltipContent>
    </Tooltip>
  );
}

function CopyContactButton({ label, value }: { label: string; value: string }) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!feedback) return;
    const timeout = window.setTimeout(() => setFeedback(""), 2000);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  async function copyContact() {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback("Copied");
    } catch {
      setFeedback("Could not copy");
    }
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={<Button type="button" variant="ghost" size="icon" className="size-10 cursor-pointer bg-muted text-blue-300 hover:bg-blue-400/15" />}
          aria-label={label}
          closeOnClick={false}
          onClick={copyContact}
        >
          {feedback === "Copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </TooltipTrigger>
        <TooltipContent>{feedback || label}</TooltipContent>
      </Tooltip>
      <span role="status" className="sr-only">{feedback}</span>
    </>
  );
}

function ToolBadges({ tools, collapsible = false }: { tools: Tool[]; collapsible?: boolean }) {
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowStart, setOverflowStart] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    if (!collapsible || !list) return;

    const badges = Array.from(list.querySelectorAll("[data-tool-badge]"));
    const observer = new ResizeObserver(() => {
      const available = list.getBoundingClientRect().width;
      const gap = Number.parseFloat(getComputedStyle(list).columnGap);
      const toggleWidth = 1.75 * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      const widths = badges.map((badge) => badge.getBoundingClientRect().width);
      let index = 0;
      let rowStart = 0;
      let remaining = available;

      for (let row = 0; row < 2; row += 1) {
        rowStart = index;
        remaining = available;
        while (index < widths.length && widths[index] <= remaining) {
          remaining -= widths[index] + gap;
          index += 1;
        }
      }

      if (index === widths.length) {
        setOverflowStart(-1);
        return;
      }

      while (index > rowStart && remaining < toggleWidth) {
        index -= 1;
        remaining += widths[index] + gap;
      }
      setOverflowStart(index);
    });

    observer.observe(list);
    badges.forEach((badge) => observer.observe(badge));
    return () => observer.disconnect();
  }, [collapsible, tools]);

  const collapsed = collapsible && !expanded;
  const toggleLabel = expanded ? "Show fewer tools" : "Show more tools";

  return (
    <div className="mt-5 w-full min-w-0 self-start">
      <ul
        id={listId}
        ref={listRef}
        className={`relative flex flex-wrap content-start gap-2 ${collapsed ? "max-h-16 overflow-hidden" : ""}`}
      >
        {tools.map(({ name, icon: ToolIcon, wordmark, docs }, index) => {
          const content = (
            <>
              {typeof ToolIcon === "string" ? (
                <img
                  src={ToolIcon}
                  alt={wordmark ? name : ""}
                  width={wordmark ? 80 : 16}
                  height={16}
                  className="h-4 shrink-0 object-contain"
                />
              ) : (
                <ToolIcon aria-hidden="true" className="size-4 shrink-0" />
              )}
              {!wordmark && name}
            </>
          );

          return (
            <Fragment key={name}>
              {index === overflowStart && (
                <li className="shrink-0">
                  <Tooltip>
                    <TooltipTrigger
                      render={<Button variant="ghost" size="icon-sm" className="cursor-pointer bg-muted text-blue-400 hover:bg-blue-500/15 hover:text-blue-300" />}
                      type="button"
                      aria-controls={listId}
                      aria-expanded={expanded}
                      aria-label={toggleLabel}
                      onClick={() => setExpanded((current) => !current)}
                    >
                      <Ellipsis aria-hidden="true" />
                    </TooltipTrigger>
                    <TooltipContent>{toggleLabel}</TooltipContent>
                  </Tooltip>
                </li>
              )}
              <li data-tool-badge className={`shrink-0 ${collapsed && overflowStart >= 0 && index >= overflowStart ? "invisible" : ""}`}>
                {docs ? (
                  <a
                    href={docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} documentation (opens in a new tab)`}
                    className={`${toolBadgeClass} ${collapsible ? "text-xs text-muted-foreground" : "text-base text-foreground"} transition-colors hover:bg-blue-500/15 hover:text-blue-300 focus-visible:bg-blue-500/15 focus-visible:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 motion-reduce:transition-none`}
                  >
                    {content}
                  </a>
                ) : (
                  <span className={`${toolBadgeClass} text-xs text-muted-foreground`}>{content}</span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

function App() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef);
  const portfolioDisabled = disabledProjectStatuses.has(portfolioStatus);
  const reduceMotion = useReducedMotion();
  const timelineDotDuration = reduceMotion ? 0 : 0.15;
  const timelineLineDuration = reduceMotion ? 0 : 0.75;
  const timelineDotVariants = {
    hidden: { opacity: 0.35, scale: 0.75, transition: { duration: 0 } },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay, duration: timelineDotDuration },
    }),
  };

  return (
    <>
      <Navbar />

      <main>
        <section
          ref={heroRef}
          id="home"
          aria-labelledby="home-title"
          className="relative isolate overflow-hidden border-b border-border"
        >
          <div
            aria-hidden="true"
            data-in-view={heroInView}
            className="hero-backdrop pointer-events-none absolute inset-0 -z-10"
          />
          <div className="mx-auto grid min-h-[min(42rem,80svh)] max-w-6xl place-items-center px-6 py-20 text-center md:py-24">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ amount: 0.25 }}
              variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            >
              <motion.p variants={revealItemVariants} className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-blue-300">
                <Code aria-hidden="true" className="size-4" />
                Software Developer
              </motion.p>
              <motion.h1 id="home-title" variants={revealItemVariants} className="mt-6 text-[clamp(1.625rem,7vw,2.5rem)] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Hi, I’m <span className="whitespace-nowrap">Michael <span className="text-blue-400">Layosa.</span></span>
              </motion.h1>
              <motion.p variants={revealItemVariants} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                I build web and mobile apps, from payroll and attendance tools to Divvy, an app for sharing group expenses.
              </motion.p>
              <motion.div variants={revealItemVariants} className="mt-8 flex flex-wrap justify-center gap-3">
                <Button nativeButton={false} render={<a href="#projects" />} size="lg" className="h-11 bg-blue-600 px-5 hover:bg-blue-500">
                  View projects <ArrowDown aria-hidden="true" />
                </Button>
                <Button nativeButton={false} render={<a href="#about" />} size="lg" variant="outline" className="h-11 px-5">
                  About me
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-title" className={sectionClass}>
          <motion.div
            className="grid items-center gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14"
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ amount: 0.25 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={revealItemVariants}>
              <p className={eyebrowClass}>01 / About</p>
              <h2 id="about-title" className={headingClass}>A little about me</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                I’m Michael Layosa, a software developer at Intelliseven. I build interfaces for HR teams, including tools for payroll, attendance, and reporting.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Outside work, I build Divvy, a web and mobile app that helps groups split expenses and keep track of who owes what.
              </p>
            </motion.div>
            <motion.aside
              aria-label="Work and education highlights"
              variants={revealItemVariants}
              className="min-w-0 divide-y divide-border rounded-2xl border border-blue-400/20 bg-card bg-[radial-gradient(ellipse_at_top_left,#1a3156,transparent_75%)] px-4 sm:px-5"
            >
              <a
                href="#experience"
                className="group flex items-center gap-3 rounded-md py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-400/10 text-blue-300">
                  <Code aria-hidden="true" className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">10+ HRIS modules</span>
                  <span className="mt-1 block text-sm text-muted-foreground">Software development at Intelliseven</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="ml-auto size-4 shrink-0 text-blue-400 group-hover:text-blue-200" />
              </a>
              <div className="flex items-center gap-3 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-400/10 text-blue-300">
                  <GraduationCap aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">BS in Information Technology</p>
                  <p className="mt-1 text-sm text-muted-foreground">Camarines Sur Polytechnic Colleges · 2019</p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </section>

        <div className="border-y border-border">
          <section id="skills" aria-labelledby="skills-title" className={sectionClass}>
            <p className={eyebrowClass}>02 / Skills</p>
            <h2 id="skills-title" className={headingClass}>Tools I build with</h2>
            <motion.div
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ margin: "0px 0px -40px 0px" }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              {skills.map(({ title, description, tools, icon: Icon }) => (
                <motion.article
                  key={title}
                  variants={revealItemVariants}
                  className={`${highlightedCardClass} min-w-0 lg:col-span-2 lg:first:col-span-3 lg:last:col-span-3`}
                >
                  <div className="grid size-10 place-items-center rounded-xl border border-blue-400/25 bg-blue-400/10 text-blue-400">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <ToolBadges tools={tools} />
                </motion.article>
              ))}
            </motion.div>
          </section>
        </div>

        <section id="projects" aria-labelledby="projects-title" className={sectionClass}>
          <Carousel aria-labelledby="projects-title" opts={{ align: "start" }}>
            <div className="mb-8 flex items-end justify-between gap-3">
              <div>
                <p className={eyebrowClass}>03 / Projects</p>
                <h2 id="projects-title" className={headingClass}>Selected work</h2>
              </div>
              <div className="flex shrink-0 gap-2">
                <CarouselPrevious aria-label="Previous project" className="static m-0 size-10" />
                <CarouselNext aria-label="Next project" className="static m-0 size-10" />
              </div>
            </div>
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ margin: "0px 0px -40px 0px" }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <CarouselContent className="touch-pan-y touch-pinch-zoom sm:grid sm:auto-cols-[50%] sm:grid-flow-col sm:grid-rows-[repeat(6,auto)]">
                {previewProjects.map(({ title, status = "Personal", platform, preview, previewAlt, description, tools }) => {
                  const projectDisabled = disabledProjectStatuses.has(status);
                  return (
                    <CarouselItem key={title} aria-label={title} className="sm:row-span-6 sm:grid sm:grid-rows-subgrid">
                      <motion.article variants={revealItemVariants} className={`${projectDisabled ? cardClass : highlightedCardClass} flex h-full flex-col sm:row-span-6 sm:grid sm:grid-rows-subgrid`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className={eyebrowClass}>{platform}</p>
                          <span className={projectStatusClass}>{status}</span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                        <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
                        <div className="mt-4 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
                          <img
                            src={preview}
                            alt={previewAlt}
                            loading="lazy"
                            className={`h-full w-full object-contain ${projectDisabled ? "opacity-50 saturate-50" : ""}`}
                          />
                        </div>
                        <ToolBadges tools={tools} collapsible />
                        <div className="mt-auto pt-5">
                          {projectDisabled ? (
                            <Button type="button" variant="outline" disabled>
                              <LockKeyhole aria-hidden="true" />
                              Full-size preview unavailable
                            </Button>
                          ) : (
                            <Button
                              nativeButton={false}
                              render={<a href={preview} target="_blank" rel="noopener" aria-label={`View ${title} project preview (opens in a new tab)`} />}
                              variant="outline"
                            >
                              View project preview <ArrowUpRight aria-hidden="true" />
                            </Button>
                          )}
                        </div>
                      </motion.article>
                    </CarouselItem>
                  );
                })}
                <CarouselItem aria-label="Personal portfolio" className="sm:row-span-6">
                  <motion.article variants={revealItemVariants} className={`${portfolioDisabled ? cardClass : highlightedCardClass} h-full`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className={eyebrowClass}>Web development</p>
                      <span className={projectStatusClass}>{portfolioStatus}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold">Personal portfolio</h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                      A responsive React site with a mobile navigation drawer and reusable shadcn/ui components.
                    </p>
                    {portfolioDisabled ? (
                      <Button type="button" variant="outline" disabled className="mt-5">
                        <LockKeyhole aria-hidden="true" /> View source on GitHub
                      </Button>
                    ) : (
                      <a href={portfolioRepository} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300">
                        View source on GitHub <ArrowUpRight aria-hidden="true" className="size-4" />
                      </a>
                    )}
                  </motion.article>
                </CarouselItem>
              </CarouselContent>
            </motion.div>
          </Carousel>
        </section>

        <div className="border-y border-border">
          <section id="experience" aria-labelledby="experience-title" className={sectionClass}>
            <p className={eyebrowClass}>04 / Experience</p>
            <h2 id="experience-title" className={headingClass}>Experience</h2>
            <motion.div
              className="relative mt-8 flex max-w-3xl flex-col gap-4 pl-7 sm:pl-9"
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ amount: 0.25 }}
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-2.5 left-1.5 w-px origin-bottom bg-blue-400/40"
                variants={{
                  hidden: { scaleY: 0, transition: { duration: 0 } },
                  visible: {
                    scaleY: 1,
                    transition: { delay: timelineDotDuration, duration: timelineLineDuration, ease: "easeOut" },
                  },
                }}
              />
              <p className="text-sm font-medium text-blue-400">
                <motion.span
                  aria-hidden="true"
                  className="absolute top-1 left-0 size-3 rounded-full border-2 border-blue-400 bg-background shadow-[0_0_12px_#60a5fa80]"
                  variants={{
                    hidden: { ...timelineDotVariants.hidden, boxShadow: "0 0 0 0 #60a5fa00" },
                    visible: reduceMotion ? {
                      ...timelineDotVariants.visible(0),
                      boxShadow: "0 0 8px 1px #60a5fa30",
                    } : {
                      opacity: 1,
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 6px 1px #60a5fa30",
                        "0 0 12px 3px #60a5fa26",
                        "0 0 6px 1px #60a5fa30",
                      ],
                      transition: {
                        opacity: { delay: timelineDotDuration + timelineLineDuration, duration: timelineDotDuration },
                        default: {
                          delay: timelineDotDuration + timelineLineDuration,
                          duration: 0.85,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 0.8,
                        },
                      },
                    },
                  }}
                />
                Present
              </p>
              <article className={cardClass}>
                <p className={eyebrowClass}>Intelliseven Inc.</p>
                <h3 className="mt-3 text-xl font-semibold">Software Developer</h3>
                <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-muted-foreground">
                  <li>Contribute to more than 10 HRIS modules, including attendance, payroll, scheduling, employee requests, and reporting.</li>
                  <li>Develop payroll and attendance workflows for multiple cut-off periods, overtime, holiday pay, deductions, and schedule exceptions.</li>
                  <li>Build automated Excel and PDF reports for payroll, daily time records, attendance summaries, and employee reporting.</li>
                  <li>Integrate Vue and Nuxt interfaces with REST APIs and real-time updates, build reusable responsive components, and troubleshoot state synchronization and data display issues.</li>
                </ul>
              </article>
              <p className="text-sm font-medium text-blue-400">
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 size-3 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa80]"
                  variants={timelineDotVariants}
                  custom={0}
                />
                <time dateTime="2024-06">June 2024</time>
              </p>
            </motion.div>
          </section>
        </div>
      </main>

      <motion.footer
        id="contact"
        aria-labelledby="contact-title"
        className="border-t border-border bg-[#0a1222] bg-[radial-gradient(ellipse_at_top_left,#1a3156,transparent_66%)]"
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ margin: "0px 0px -40px 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 pt-8 pb-5 sm:gap-8 sm:pt-16 sm:pb-12 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
            <div>
              <h2 id="contact-title" className="text-4xl leading-none font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Get in <span className="text-blue-400">touch.</span>
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                Reach out about work opportunities, collaborations, or a project you’d like to discuss.
              </p>
            </div>
            <div className="flex min-w-0 flex-col items-start gap-1 sm:gap-3 md:items-end">
              <motion.div variants={revealItemVariants} className="flex max-w-full items-center gap-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex min-w-0 items-center gap-2 rounded-full bg-blue-600 px-3 py-3 text-sm font-medium text-white! transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 motion-reduce:transition-none sm:gap-3 sm:px-5 sm:text-base"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  <span className="min-w-0 wrap-anywhere">{contactEmail}</span>
                  <ArrowUpRight aria-hidden="true" className="hidden size-4 shrink-0 sm:block" />
                </a>
                <CopyContactButton label="Copy email address" value={contactEmail} />
              </motion.div>
              <motion.div variants={revealItemVariants} className="flex items-center gap-2">
                <a href={`tel:${contactPhone.replaceAll(" ", "")}`} className={footerLinkClass}>
                  <Phone aria-hidden="true" className="size-4 text-blue-400" /> {contactPhone}
                </a>
                <CopyContactButton label="Copy phone number" value={contactPhone} />
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 border-t border-border py-2 text-sm text-muted-foreground md:grid-cols-[auto_1fr_auto] md:gap-3 md:py-4">
            <span className="col-span-2 col-start-1 row-start-2 text-center md:col-span-1 md:row-start-1 md:text-left">
              © {new Date().getFullYear()} Michael Layosa<span className="hidden md:inline"> · Personal portfolio</span>
            </span>
            <div className="col-start-1 row-start-1 -ml-2 flex gap-x-2 [&>a]:min-h-10 [&>a]:min-w-10 [&>a]:justify-center md:col-start-2 md:ml-0 md:flex-wrap md:justify-center md:[&>a]:min-h-0">
              <FooterSocialLink href="https://www.linkedin.com/in/michael-layosa-7b9138240" label="LinkedIn">
                <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.74H4.96V9.19h2.97v9.55ZM6.44 7.89a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.3 10.85h-2.96v-4.65c0-1.11-.02-2.53-1.54-2.53-1.55 0-1.79 1.21-1.79 2.45v4.73H9.49V9.19h2.84v1.3h.04a3.11 3.11 0 0 1 2.8-1.54c3 0 3.57 1.98 3.57 4.55v5.24Z" />
                </svg>
              </FooterSocialLink>
              <FooterSocialLink href={githubProfile} label="GitHub">
                <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.02-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22l-.01 3.31c0 .32.22.69.83.57A12 12 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
                </svg>
              </FooterSocialLink>
              <FooterSocialLink href={`${portfolioRepository}/issues`} label="Portfolio issues">
                <CircleAlert aria-hidden="true" className="size-4 md:hidden" />
                <ArrowUpRight aria-hidden="true" className="hidden size-3.5 md:block" />
              </FooterSocialLink>
            </div>
            <Tooltip>
              <TooltipTrigger
                render={<a href="#home" className={`${footerLinkClass} col-start-2 row-start-1 min-h-10 min-w-10 justify-center justify-self-end max-md:bg-muted md:col-start-3 md:min-h-0`} />}
              >
                <span className="sr-only md:not-sr-only">Back to top</span>
                <ArrowUp aria-hidden="true" className="size-4" />
              </TooltipTrigger>
              <TooltipContent className="md:hidden">Back to top</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </motion.footer>
    </>
  );
}

export default App;
