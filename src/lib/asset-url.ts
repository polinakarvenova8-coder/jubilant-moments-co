// Absolute asset URLs so images still load when the page HTML is embedded on another domain (e.g. Tilda).
const ORIGIN = "https://jubilant-moments-co.lovable.app";
export const abs = (u: string) => (import.meta.env.PROD && u.startsWith("/") ? ORIGIN + u : u);
