import {
  ComputerDesktopIcon,
  ListBulletIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";

import GithubIcon from "@/components/icons/GithubIcon.astro";

type SectionInfo = {
  title: string;
  description: string;
  href: string;
  icon: any;
  onHomepage: boolean;
};

export const sections: SectionInfo[] = [
  {
    title: "Getting Started",
    description:
      "Learn how to get the UI editor up and running and editing your first app.",
    href: "getting-started",
    icon: RocketLaunchIcon,
    onHomepage: true,
  },
  {
    title: "How Tos",
    description:
      "Learn how to accomplish some common tasks with the UI editor.",
    href: "how-to",
    icon: ListBulletIcon,
    onHomepage: true,
  },
  {
    title: "FAQs",
    description: "Answers to some common questions about the UI editor.",
    href: "FAQs",
    icon: QuestionMarkCircleIcon,
    onHomepage: true,
  },
  {
    title: "Live Demo",
    description:
      "Use the UI editor directly in your browser. No install needed. Provides copyable code for your app.",
    href: "live-demo",
    icon: ComputerDesktopIcon,
    onHomepage: true,
  },
  {
    title: "Change Log",
    description: "View the change log for the UI editor.",
    href: "change-log",
    icon: InboxStackIcon,
    onHomepage: false,
  },
  {
    title: "",
    description: "View the source code for the UI editor.",
    href: "https://github.com/rstudio/shinyuieditor",
    icon: GithubIcon,
    onHomepage: false,
  },
].map((section) => ({
  ...section,
  href: processLink(section.href),
}));

function processLink(link: string): string {
  if (link.startsWith("http")) {
    return link;
  }

  // return `/sue-homebase/${link}`;
  return link;
}
