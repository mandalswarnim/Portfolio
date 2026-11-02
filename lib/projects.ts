import type { Screen } from "@/components/home/TravelCard";

/**
 * Every project, in display order. `/work` shows them all; the homepage shows
 * those without `homeHidden`, using `homeDesc` when set and the first three
 * `tech` tags. Facts must match the CV (public/Swarnim CV.pdf).
 */
export type Project = {
  category: string;
  title: string;
  desc: string;
  homeDesc?: string; // shorter homepage wording
  homeHidden?: boolean;
  result?: string; // one-line measured outcome
  tech: string[];
  link?: string;
  demo?: string;
  screen?: Screen; // homepage: featured as a full colour chapter with this screenshot
};

export const projects: Project[] = [
  {
    category: "Conversational AI",
    title: "AI Receptionist",
    desc: "A production-ready AI receptionist that answers business calls 24/7, captures customer and booking details through natural conversation, and emails structured leads the moment a call ends. Built on Twilio voice, OpenAI, Express, and Prisma — available to integrate into your business.",
    homeDesc:
      "A production-ready AI receptionist that answers business calls 24/7, captures booking details through natural conversation, and emails structured leads to the owner. Built on Twilio voice + OpenAI — available to integrate into your business.",
    result: "Live demo on this site, 100+ automated tests, now being demonstrated to prospective UK pub customers.",
    tech: ["TypeScript", "OpenAI", "Twilio", "Express", "Prisma"],
    link: "https://github.com/mandalswarnim/ai-receptionist",
    demo: "/ai-receptionist",
    screen: {
      src: "/home/receptionist.jpg",
      url: "swarnimmandal.me/ai-receptionist",
      alt: "AI Receptionist landing page",
    },
  },
  {
    category: "Aerospace Engineering",
    title: "Airfoil Selector for Wind Turbines",
    desc: "A tool that ranks airfoil designs for small vertical-axis wind turbines by annual energy production at a specific site — pairing real wind statistics with NeuralFoil surrogate aerodynamics and generating explainable reports on why one design outperforms another.",
    tech: ["Python", "NeuralFoil", "Gradio", "AeroSandbox"],
    link: "https://github.com/mandalswarnim/Airfoil-Selector-for-Wind-Turbines",
    demo: "https://huggingface.co/spaces/mswanrim1/VAWT-Airfoil-Selector",
  },
  {
    category: "Deep Learning",
    title: "UAV Predictive Maintenance Digital Twin",
    desc: "LSTM, Transformer, and 1D-CNN models forecasting Remaining Useful Life on the NASA C-MAPSS turbofan benchmark and a synthesized multirotor UAV fleet — served as an interactive digital twin with 3D fleet views, live telemetry, and explainable-AI diagnostics.",
    homeDesc:
      "LSTM, Transformer, and 1D-CNN models forecasting Remaining Useful Life on NASA C-MAPSS turbofans and a synthetic UAV fleet — with an interactive 3D dashboard and explainable-AI diagnostics.",
    result:
      "Transformer reached 14.12 RMSE on held-out NASA C-MAPSS engines and 97.4% fault-classification accuracy on the UAV fleet.",
    tech: ["PyTorch", "Next.js", "Three.js", "Transformers"],
    link: "https://github.com/mandalswarnim/uav-pdm-dashboard",
    demo: "/uav",
    screen: {
      src: "/home/uav.jpg",
      url: "swarnimmandal.me/uav/mission",
      alt: "UAV mission dashboard with radar and live telemetry",
    },
  },
  {
    category: "Deep Learning",
    title: "Guitar Tablature Generation",
    desc: "LSTM and feed-forward neural network that predicts optimal guitar tablatures for any input melody — modelling musical intention and fretting difficulty from training data probabilities.",
    homeDesc:
      "LSTM and feed-forward neural network that predicts optimal guitar tablatures for any input melody, modelling musical intention and fretting difficulty.",
    tech: ["Python", "TensorFlow", "Keras"],
    link: "https://github.com/mandalswarnim/Guitar-Tablature-Generation",
  },
  {
    category: "Machine Learning",
    title: "Heart Disease Prediction",
    desc: "Logistic regression model predicting heart disease likelihood in COVID-19 patients, using clinical and demographic factors including age, smoking status, and cholesterol levels.",
    homeHidden: true,
    tech: ["Python", "Scikit-Learn", "Seaborn", "Matplotlib"],
    link: "https://github.com/mandalswarnim/Heart_Disease_Prediction",
  },
  {
    category: "Deep Learning",
    title: "Music Genre Classification",
    desc: "CNN model classifying audio files into 10 genres using MFCC features extracted from the GTZAN dataset, with custom preprocessing and normalisation.",
    homeDesc:
      "CNN model classifying audio into 10 genres using MFCC features from the GTZAN dataset, with custom preprocessing.",
    result: "79% accuracy across 10 genres on GTZAN.",
    tech: ["Python", "PyTorch", "Librosa"],
  },
];

/** The homepage selection, with its shorter wording applied. */
export const homeProjects = projects
  .filter((p) => !p.homeHidden)
  .map((p) => ({ ...p, desc: p.homeDesc ?? p.desc, tech: p.tech.slice(0, 3) }));
