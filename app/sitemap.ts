import type { MetadataRoute } from "next";
import { brand } from "../lib/brand";
import { resultItems } from "../lib/results";
import { services } from "../lib/services";
import { projectTypes } from "../lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.siteUrl;
  const lastModified = new Date();

  const statics = ["", "/services", "/work", "/about", "/results", "/contact", "/privacy", "/legal"].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamic = [
    ...services.map((service) => `/services/${service.slug}`),
    ...projectTypes.map((item) => `/work/${item.slug}`),
    ...resultItems.map((item) => `/results/${item.slug}`),
  ].map((path) => ({ url: `${base}${path}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 }));

  return [...statics, ...dynamic];
}
