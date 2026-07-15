// prisma/seed.ts
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

const categories = [
  { name: "AI & LLM Tools", slug: "ai-llm-tools" },
  { name: "Languages & Frameworks", slug: "languages-frameworks" },
  { name: "Databases & Storage", slug: "databases-storage" },
  { name: "DevOps & Infrastructure", slug: "devops-infrastructure" },
  { name: "APIs & Backend Services", slug: "apis-backend-services" },
  { name: "Testing, QA & Observability", slug: "testing-qa-observability" },
  { name: "Developer Productivity & Collaboration", slug: "dev-productivity-collaboration" },
  { name: "Design & UI Tools", slug: "design-ui-tools" },
];

const tools = [
  // ── AI & LLM Tools ──
  {
    name: "OpenAI API",
    description: "Access GPT-4o, DALL·E, Whisper and more through a simple REST API for AI-powered apps.",
    url: "https://platform.openai.com",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
    categorySlug: "ai-llm-tools",
    tags: ["ai", "llm", "api"],
  },
  {
    name: "LangChain",
    description: "Framework for developing applications powered by language models with composable chains.",
    url: "https://langchain.com",
    logoUrl: "https://avatars.githubusercontent.com/u/126733545",
    categorySlug: "ai-llm-tools",
    tags: ["ai", "framework", "python"],
  },
  {
    name: "Hugging Face",
    description: "The AI community's platform for models, datasets, and ML apps. Host and share openly.",
    url: "https://huggingface.co",
    logoUrl: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
    categorySlug: "ai-llm-tools",
    tags: ["ai", "models", "open-source"],
  },
  {
    name: "Ollama",
    description: "Run large language models locally on your machine with a single command.",
    url: "https://ollama.com",
    logoUrl: "https://ollama.com/public/ollama.png",
    categorySlug: "ai-llm-tools",
    tags: ["ai", "local", "open-source"],
  },

  // ── Languages & Frameworks ──
  {
    name: "Next.js",
    description: "The React framework for the web — server components, routing, and full-stack power.",
    url: "https://nextjs.org",
    logoUrl: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
    categorySlug: "languages-frameworks",
    tags: ["react", "framework", "fullstack"],
  },
  {
    name: "Astro",
    description: "The web framework for content-driven websites. Ship zero JS by default.",
    url: "https://astro.build",
    logoUrl: "https://astro.build/assets/press/astro-icon-light.png",
    categorySlug: "languages-frameworks",
    tags: ["framework", "static-site", "performance"],
  },
  {
    name: "SvelteKit",
    description: "Full-stack framework built on Svelte — fast, elegant, and productive.",
    url: "https://svelte.dev",
    logoUrl: "https://svelte.dev/svelte-logo-horizontal.svg",
    categorySlug: "languages-frameworks",
    tags: ["svelte", "framework", "fullstack"],
  },
  {
    name: "Hono",
    description: "Ultrafast web framework for the Edges — runs on Cloudflare Workers, Deno, Bun, and Node.",
    url: "https://hono.dev",
    logoUrl: "https://hono.dev/images/logo.png",
    categorySlug: "languages-frameworks",
    tags: ["typescript", "edge", "backend"],
  },

  // ── Databases & Storage ──
  {
    name: "Prisma",
    description: "Next-generation ORM for Node.js and TypeScript with a declarative schema.",
    url: "https://prisma.io",
    logoUrl: "https://prisma.io/logo.png",
    categorySlug: "databases-storage",
    tags: ["orm", "typescript", "open-source"],
  },
  {
    name: "Supabase",
    description: "Open-source Firebase alternative with Postgres, auth, realtime, and storage.",
    url: "https://supabase.com",
    logoUrl: "https://supabase.com/brand-assets/supabase-logo-icon.png",
    categorySlug: "databases-storage",
    tags: ["postgres", "baas", "open-source"],
  },
  {
    name: "Drizzle ORM",
    description: "TypeScript ORM that feels like writing SQL — lightweight and type-safe.",
    url: "https://orm.drizzle.team",
    logoUrl: "https://orm.drizzle.team/drizzle-logo.svg",
    categorySlug: "databases-storage",
    tags: ["orm", "typescript", "sql"],
  },
  {
    name: "Neon",
    description: "Serverless Postgres with branching, autoscaling, and a generous free tier.",
    url: "https://neon.tech",
    logoUrl: "https://neon.tech/favicon.ico",
    categorySlug: "databases-storage",
    tags: ["postgres", "serverless", "database"],
  },

  // ── DevOps & Infrastructure ──
  {
    name: "Docker",
    description: "Platform for building, shipping, and running containerized applications.",
    url: "https://docker.com",
    logoUrl: "https://docker.com/logo.png",
    categorySlug: "devops-infrastructure",
    tags: ["containers", "devops"],
  },
  {
    name: "Vercel",
    description: "Frontend cloud platform for deploying web apps instantly with edge functions.",
    url: "https://vercel.com",
    logoUrl: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico",
    categorySlug: "devops-infrastructure",
    tags: ["hosting", "edge", "ci-cd"],
  },
  {
    name: "Terraform",
    description: "Infrastructure as code tool for provisioning cloud resources declaratively.",
    url: "https://terraform.io",
    logoUrl: "https://www.terraform.io/favicon.ico",
    categorySlug: "devops-infrastructure",
    tags: ["iac", "cloud", "devops"],
  },
  {
    name: "Coolify",
    description: "Open-source, self-hostable Heroku/Vercel alternative. Deploy anything on your own hardware.",
    url: "https://coolify.io",
    logoUrl: "https://coolify.io/favicon.ico",
    categorySlug: "devops-infrastructure",
    tags: ["self-hosted", "deployment", "open-source"],
  },

  // ── APIs & Backend Services ──
  {
    name: "Stripe",
    description: "Payment processing platform for internet businesses. Beautiful APIs and docs.",
    url: "https://stripe.com",
    logoUrl: "https://stripe.com/favicon.ico",
    categorySlug: "apis-backend-services",
    tags: ["payments", "api", "fintech"],
  },
  {
    name: "Resend",
    description: "Email API for developers — modern, fast, and built on React Email.",
    url: "https://resend.com",
    logoUrl: "https://resend.com/favicon.ico",
    categorySlug: "apis-backend-services",
    tags: ["email", "api", "developer-tools"],
  },
  {
    name: "Uploadthing",
    description: "File uploads for full-stack TypeScript apps. Simple, type-safe, and fast.",
    url: "https://uploadthing.com",
    logoUrl: "https://uploadthing.com/favicon.ico",
    categorySlug: "apis-backend-services",
    tags: ["file-upload", "typescript", "api"],
  },
  {
    name: "Clerk",
    description: "Drop-in authentication and user management for React, Next.js, and beyond.",
    url: "https://clerk.com",
    logoUrl: "https://clerk.com/favicon.ico",
    categorySlug: "apis-backend-services",
    tags: ["auth", "api", "react"],
  },

  // ── Testing, QA & Observability ──
  {
    name: "Playwright",
    description: "End-to-end testing framework by Microsoft for modern web apps across all browsers.",
    url: "https://playwright.dev",
    logoUrl: "https://playwright.dev/img/playwright-logo.svg",
    categorySlug: "testing-qa-observability",
    tags: ["testing", "e2e", "automation"],
  },
  {
    name: "Vitest",
    description: "Blazing fast unit test framework powered by Vite. Jest-compatible API.",
    url: "https://vitest.dev",
    logoUrl: "https://vitest.dev/logo.svg",
    categorySlug: "testing-qa-observability",
    tags: ["testing", "unit-test", "vite"],
  },
  {
    name: "Sentry",
    description: "Application monitoring and error tracking for every developer in your stack.",
    url: "https://sentry.io",
    logoUrl: "https://sentry.io/favicon.ico",
    categorySlug: "testing-qa-observability",
    tags: ["monitoring", "error-tracking", "observability"],
  },
  {
    name: "PostHog",
    description: "Open-source product analytics, feature flags, session replay, and A/B testing.",
    url: "https://posthog.com",
    logoUrl: "https://posthog.com/favicon.ico",
    categorySlug: "testing-qa-observability",
    tags: ["analytics", "open-source", "product"],
  },

  // ── Developer Productivity & Collaboration ──
  {
    name: "Linear",
    description: "Streamlined issue tracking and project management built for high-performance teams.",
    url: "https://linear.app",
    logoUrl: "https://linear.app/favicon.ico",
    categorySlug: "dev-productivity-collaboration",
    tags: ["project-management", "issues", "productivity"],
  },
  {
    name: "Raycast",
    description: "Blazingly fast launcher for macOS that lets you control your tools with a few keystrokes.",
    url: "https://raycast.com",
    logoUrl: "https://raycast.com/favicon.ico",
    categorySlug: "dev-productivity-collaboration",
    tags: ["productivity", "macos", "launcher"],
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, docs, wikis, and project management.",
    url: "https://notion.so",
    logoUrl: "https://notion.so/favicon.ico",
    categorySlug: "dev-productivity-collaboration",
    tags: ["docs", "productivity", "collaboration"],
  },
  {
    name: "Warp",
    description: "The terminal reimagined — AI-powered, blazing fast, with modern editing features.",
    url: "https://warp.dev",
    logoUrl: "https://warp.dev/favicon.ico",
    categorySlug: "dev-productivity-collaboration",
    tags: ["terminal", "ai", "productivity"],
  },

  // ── Design & UI Tools ──
  {
    name: "Figma",
    description: "Collaborative design tool for building meaningful products together.",
    url: "https://figma.com",
    logoUrl: "https://figma.com/favicon.ico",
    categorySlug: "design-ui-tools",
    tags: ["design", "collaboration", "prototyping"],
  },
  {
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS. Copy and paste.",
    url: "https://ui.shadcn.com",
    logoUrl: "https://ui.shadcn.com/favicon.ico",
    categorySlug: "design-ui-tools",
    tags: ["components", "tailwind", "react"],
  },
];

async function main() {
  console.log("🌱 Seeding database...\n");

  // Step 1: upsert categories
  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    console.log(`  ✓ Category: ${cat.name}`);
  }

  console.log("");

  // Step 2: create tools, linking category + tags
  for (const tool of tools) {
    const category = await db.category.findUnique({
      where: { slug: tool.categorySlug },
    });

    if (!category) {
      throw new Error(`Category not found: ${tool.categorySlug}`);
    }

    await db.tool.upsert({
      where: { url: tool.url },
      update: {
        name: tool.name,
        description: tool.description,
        logoUrl: tool.logoUrl,
        status: "APPROVED",
        category: { connect: { id: category.id } },
        tags: {
          set: [],
          connectOrCreate: tool.tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
      create: {
        name: tool.name,
        description: tool.description,
        url: tool.url,
        logoUrl: tool.logoUrl,
        status: "APPROVED",
        category: { connect: { id: category.id } },
        tags: {
          connectOrCreate: tool.tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
    });
    console.log(`  ✓ Tool: ${tool.name}`);
  }

  console.log(`\n✅ Seeded ${categories.length} categories and ${tools.length} tools.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });