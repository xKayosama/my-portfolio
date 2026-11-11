import { useState } from "react";
import { motion } from "motion/react";
import { Download, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact Me", href: "#contact" },
];

const resumeHref = "#resume";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/90 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.04 }}
          className="inline-flex shrink-0"
        >
          <img
            src={`${import.meta.env.BASE_URL}michael-logo.svg`}
            alt="Michael"
            width={130}
            height={35}
            className="block"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex lg:gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              whileHover={{ y: -2 }}
              className="whitespace-nowrap text-sm text-slate-400 transition-colors hover:text-blue-400"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Desktop Resume Button */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="hidden md:block"
        >
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={resumeHref} />}
            className="border-blue-500 bg-transparent text-white hover:bg-blue-500/10 hover:text-white"
          >
            <Download aria-hidden="true" />
            Resume
          </Button>
        </motion.div>

        {/* Mobile Navigation */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:bg-white/10 hover:text-white md:hidden"
              />
            }
            aria-label="Open navigation menu"
          >
            <Menu className="size-6" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="border-white/10 bg-[#0B1120] text-white"
          >
            <SheetHeader className="pr-12">
              <SheetTitle className="text-white">Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 px-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="text-lg text-slate-300 transition-colors hover:text-blue-400"
                >
                  {link.label}
                </motion.a>
              ))}

              <Button
                variant="outline"
                nativeButton={false}
                render={<a href={resumeHref} />}
                onClick={() => setMenuOpen(false)}
                className="mt-2 border-blue-500 bg-transparent text-white hover:bg-blue-500/10 hover:text-white"
              >
                <Download aria-hidden="true" />
                Resume
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
