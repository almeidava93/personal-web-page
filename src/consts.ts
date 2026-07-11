// Global, non-content site configuration.

export const SITE = {
  title: "Vinicius Almeida",
  description:
    "Personal website of Vinicius Almeida — research projects, publications, and writing.",
  author: "Vinicius Almeida",
  url: "https://valmeida.com",
  lang: "en",
} as const;

// Primary navigation (order matters).
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Blog", href: "/blog" },
] as const;

// Footer / contact links. Fill in real handles/URLs.
// Set `href` to null to hide a link until you have the URL.
export const SOCIAL_LINKS = [
  { label: "Email", href: "mailto:vinicius.almeida@spesia.com.br" },
  { label: "GitHub", href: "https://github.com/almeidava93" },
  { label: "Google Scholar", href: null as string | null },
  { label: "ORCID", href: null as string | null },
  { label: "LinkedIn", href: null as string | null },
] as const;
