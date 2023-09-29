import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Make a routing-safe link robust to changes in the base url
 * @param url Base URL for page to be visited. Should not start with a slash
 * @returns Link to an internal page in the website. This is useful because the
 * base url may change and this way we don't have to update every link to match
 */
export function internalLink(url: string) {
  // Remove leading slash if it exists
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;

  return `${import.meta.env.BASE_URL}/${cleanUrl}`;
}
