import { selectFromList } from "./listArticles.mjs";

const links = [
  { title: "Google", href: "https://www.google.com" },
  { title: "GitHub", href: "https://www.github.com" },
  { title: "NRK", href: "https://www.nrk.no" },
  { title: "VG", href: "https://www.vg.no" },
  { title: "Aftenposten", href: "https://www.aftenposten.no" },
  { title: "Dagbladet", href: "https://www.dagbladet.no" },
];

selectFromList(links);
