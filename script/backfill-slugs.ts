
import prisma from "@/lib/prisma"

function slugify(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
}

async function main() {
    const tools = await prisma.tool.findMany()
    const usedSlugs = new Set<string>()

    for (const tool of tools) {
        let baseSlug = slugify(tool.name)
        let finalSlug = baseSlug

        if (usedSlugs.has(finalSlug)) {
            finalSlug = `${baseSlug}-${tool.id.slice(-6)}`
        }

        usedSlugs.add(finalSlug)

        await prisma.tool.update({
            where: { id: tool.id },
            data: { slug: finalSlug },
        })

        console.log(`${tool.name} -> ${finalSlug}`)
    }

    console.log(`Done. Updated ${tools.length} tools.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())