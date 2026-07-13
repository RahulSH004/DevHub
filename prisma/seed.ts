// prisma/seed.ts
import  db  from "@/lib/prisma"

const categories = [
  { name: "AI & LLM Tools", slug: "ai-llm-tools" },
  { name: "Languages & Frameworks", slug: "languages-frameworks" },
  { name: "Databases & Storage", slug: "databases-storage" },
  { name: "DevOps & Infrastructure", slug: "devops-infrastructure" },
  { name: "APIs & Backend Services", slug: "apis-backend-services" },
  { name: "Testing, QA & Observability", slug: "testing-qa-observability" },
  { name: "Developer Productivity & Collaboration", slug: "dev-productivity-collaboration" },
  { name: "Design & UI Tools", slug: "design-ui-tools" },
]

const tools = [
  {
    name: "Prisma",
    description: "Next-generation ORM for Node.js and TypeScript.",
    url: "https://prisma.io",
    logoUrl: "https://prisma.io/logo.png",
    categorySlug: "databases-storage",
    tags: ["orm", "typescript", "open-source"],
  },
  {
    name: "Docker",
    description: "Platform for building, shipping, and running containerized apps.",
    url: "https://docker.com",
    logoUrl: "https://docker.com/logo.png",
    categorySlug: "devops-infrastructure",
    tags: ["containers", "devops"],
  },
  // ... add your remaining 18-28 tools here, same shape
]

async function main() {
  // Step 1: upsert categories (safe to re-run)
  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  // Step 2: create tools, linking category + tags
  for (const tool of tools) {
    const category = await db.category.findUnique({
      where: { slug: tool.categorySlug },
    })

    if (!category) {
      throw new Error(`Category not found: ${tool.categorySlug}`)
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
            set: [], // clear old tag links first
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
      })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })