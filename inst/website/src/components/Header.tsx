"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import hexsticker from "../assets/shinyuieditor-hex.png";

export const navigation = [
  { name: "Getting Started", href: "/getting-started" },
  { name: "How To", href: "/how-to" },
  { name: "FAQs", href: "/FAQs" },
  { name: "Github", href: "https://github.com/rstudio/shinyuieditor" },
];

export default function Header({
  showBorder = true,
}: {
  showBorder?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`z-50 ${showBorder ? "border-b" : ""} mb-6`}>
      <nav
        className="flex items-center justify-between px-6 py-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <LogoLink />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={`/sue-homebase/${item.href}`}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <LogoLink />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={`/sue-homebase/${item.href}`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

function LogoLink() {
  return (
    <a href="/sue-homebase/" className="-m-1.5 p-1.5">
      <span className="sr-only">ShinyUiEditor | Posit</span>
      <img className="h-14 w-auto" src={hexsticker.src} alt="" />
    </a>
  );
}
