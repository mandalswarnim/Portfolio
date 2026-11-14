import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Swarnim Mandal - Portfolio",
    short_name: "Swarnim Mandal",
    description: "AI / software engineer in London building voice agents, predictive models and full-stack apps",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F4",
    theme_color: "#2D5FA3",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
