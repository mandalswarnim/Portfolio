# Swarnim Mandal — Portfolio

Personal portfolio and professional site — **[swarnimmandal.me](https://swarnimmandal.me)**

Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Framer Motion. Deployed on Vercel.

## Pages

| Route              | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| `/`                | Hero, expertise areas, selected projects, testimonials                                  |
| `/about`           | Background, education, skills, experience                                               |
| `/work`            | All projects                                                                            |
| `/services`        | Services on offer (currently the AI Receptionist)                                       |
| `/blog`            | Technical writing — hidden until `BLOG_ENABLED` is set in `lib/blog.ts`                 |
| `/contact`         | Contact form and direct links                                                           |
| `/uav`             | UAV predictive-maintenance dashboard (armory, mission, diagnostics, model lab)          |
| `/ai-receptionist` | Sales landing page for the AI Receptionist product (Twilio + OpenAI call-answering app) |

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project structure

```
app/           # Next.js App Router pages
components/    # Header, Footer, animation wrappers (FadeIn, Stagger*), uav/ dashboard
lib/           # blog.ts — blog post data · uav/ — dashboard state + data fetchers
public/        # Static assets (uav/data/ baked model artifacts)
```

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Start dev server       |
| `npm run build` | Production build       |
| `npm start`     | Serve production build |
| `npm run lint`  | Run ESLint             |
