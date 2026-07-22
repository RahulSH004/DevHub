"use client"

import * as React from "react"
import { useTransition } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { addCategory } from "@/app/actions/tool_action"
import { FolderTree, Plus, Tag, Layers, ArrowUpRight } from "lucide-react"

interface CategoryWithCount {
  id: string
  name: string
  slug: string
  _count?: {
    tools: number
  }
}

interface AdminCategoriesTabProps {
  categories: CategoryWithCount[]
}

export function AdminCategoriesTab({ categories }: AdminCategoriesTabProps) {
  const [newCategoryName, setNewCategoryName] = React.useState("")
  const [newCategorySlug, setNewCategorySlug] = React.useState("")
  const [isPending, startTransition] = useTransition()

  function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!newCategoryName.trim()) {
      toast.error("Category name is required")
      return
    }

    startTransition(async () => {
      try {
        await addCategory(newCategoryName.trim(), newCategorySlug.trim())
        toast.success(`Category "${newCategoryName}" created!`)
        setNewCategoryName("")
        setNewCategorySlug("")
      } catch (err: any) {
        toast.error(err?.message || "Failed to create category")
      }
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Create Category Form */}
      <Card className="border border-border/60 bg-card/60 backdrop-blur-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Plus className="size-4 text-primary" />
            Add New Category
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Create a category to group developer tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="category-name" className="text-xs font-semibold">
                Category Name
              </Label>
              <Input
                id="category-name"
                placeholder="e.g. AI & Machine Learning"
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategoryName(e.target.value)
                  if (!newCategorySlug) {
                    setNewCategorySlug(
                      e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
                    )
                  }
                }}
                className="h-9 text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category-slug" className="text-xs font-semibold">
                Slug (URL Identifier)
              </Label>
              <Input
                id="category-slug"
                placeholder="e.g. ai-machine-learning"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
                className="h-9 text-xs font-mono"
              />
            </div>

            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="w-full h-9 text-xs font-semibold gap-1.5 shadow-xs active:scale-[0.98]"
            >
              <Plus className="size-4" />
              <span>Create Category</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Existing Categories Grid */}
      <Card className="lg:col-span-2 border border-border/60 bg-card/60 backdrop-blur-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FolderTree className="size-4 text-primary" />
              Active Categories
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              All categories currently available on DevHub
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-semibold">
            {categories.length} Total
          </Badge>
        </CardHeader>
        <CardContent className="pt-2">
          {categories.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No categories created yet. Add one using the form.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background/50 hover:border-primary/40 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Tag className="size-4" />
                    </div>
                    <div className="grid min-w-0">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono truncate">
                        /{cat.slug}
                      </span>
                    </div>
                  </div>

                  <Badge variant="secondary" className="text-[10px] font-bold tabular-nums px-2 py-0.5 ml-2">
                    {cat._count?.tools ?? 0} tools
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
