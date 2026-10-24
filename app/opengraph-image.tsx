import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Swarnim Mandal — AI / Software Engineer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Portfolio",
    title: "AI / Software Engineer",
    subtitle: "Voice agents, predictive models and full-stack apps — London, UK",
  });
}
