"use client";

import { Icon } from "@iconify/react";
import React from "react";
import { Link, Spacer, Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";

import { siteConfig } from "@/config/site";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "System Status",
    href: "https://status.justlab.xyz/status/alertflow",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Privacy Policy",
    href: "/privacy",
  },
  {
    name: "Terms of Service",
    href: "/terms",
  },
  {
    name: "Legal Disclosure",
    href: "/legal",
  },
];

export default function Footer() {
  const { theme } = useTheme();
  const isSSR = useIsSSR();

  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="flex items-center justify-center">
          <Image
            alt="Logo"
            height={32}
            radius="none"
            shadow="none"
            src={`/images/af_logo_${theme === "light" || isSSR ? "black" : "white"}.png`}
            width={32}
          />
          <span className="text-medium font-medium">AlertFlow</span>
        </div>
        <Spacer y={4} />
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              isExternal
              className="text-default-500"
              href={item.href}
              size="sm"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Spacer y={4} />
        <p className="mt-1 text-center text-small text-default-400">
          &copy; 2024 AlertFlow. All rights reserved. Version{" "}
          {siteConfig.version}
        </p>
        <p className="flex gap-1 mt-1 text-center text-small text-default-400">
          Made with <Icon icon="solar:hand-heart-linear" width={16} /> in
          Germany
        </p>
      </div>
    </footer>
  );
}