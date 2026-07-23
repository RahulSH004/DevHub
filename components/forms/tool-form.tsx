"use client"

import { useState, useRef, useCallback } from "react"
import { ToolSchema, type ToolInput } from "@/lib/validators/tool"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Globe,
  ImageIcon,
  Tag,
  X,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react"

type ToolFormProps = {
  categories: { id: string; name: string }[]
  onSubmit: (data: ToolInput) => Promise<{ success: boolean; errors?: any; toolId?: string }>
  successMessage?: string
  successDescription?: string
}

export function ToolForm({
  categories,
  onSubmit,
  successMessage = "Submitted successfully!",
  successDescription = "Your submission has been received.",
}: ToolFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    logoUrl: "",
    categoryId: "",
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [toolId, setToolId] = useState<string | null>(null)
  const tagInputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      // Clear field error on change
      if (fieldErrors[name]) {
        setFieldErrors((prev) => {
          const next = { ...prev }
          delete next[name]
          return next
        })
      }
    },
    [fieldErrors]
  )

  const addTag = useCallback(
    (value: string) => {
      const trimmed = value.trim().toLowerCase()
      if (trimmed && !formData.tags.includes(trimmed) && formData.tags.length < 10) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }))
        // Clear tags error when adding
        if (fieldErrors.tags) {
          setFieldErrors((prev) => {
            const next = { ...prev }
            delete next.tags
            return next
          })
        }
      }
      setTagInput("")
    },
    [formData.tags, fieldErrors]
  )

  const removeTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }))
  }, [])

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        addTag(tagInput)
      }
      if (e.key === "Backspace" && tagInput === "" && formData.tags.length > 0) {
        removeTag(formData.tags[formData.tags.length - 1])
      }
    },
    [tagInput, formData.tags, addTag, removeTag]
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFieldErrors({})
    setServerError("")

    const parsed = ToolSchema.safeParse(formData)
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>)
      return
    }

    setLoading(true)
    try {
      const result = await onSubmit(parsed.data)
      if (result.success) {
        setSuccess(true)
        setToolId(result.toolId ?? null)
      } else if (result.errors) {
        setFieldErrors(result.errors)
      }
    } catch (err: any) {
      setServerError(err?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Success state
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-4">
          <Check className="size-6" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {successMessage}
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          {successDescription}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Server error banner */}
      {serverError && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Submission failed</p>
            <p className="text-xs text-destructive/80">{serverError}</p>
          </div>
        </div>
      )}

      {/* Tool name */}
      <div className="space-y-2">
        <Label htmlFor="tool-name" className="text-sm font-medium">
          Name
        </Label>
        <Input
          id="tool-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Prisma, Vercel, Supabase"
          maxLength={80}
          autoComplete="off"
          className={`h-11 bg-background/50 border-border/60 transition-all duration-200 focus:bg-background focus:border-primary/40 focus:shadow-[0_0_0_3px] focus:shadow-primary/10 placeholder:text-muted-foreground/40 ${
            fieldErrors.name ? "border-destructive/60 focus:border-destructive/60 focus:shadow-destructive/10" : ""
          }`}
        />
        {fieldErrors.name && (
          <p className="text-xs text-destructive font-medium animate-in fade-in-0 slide-in-from-top-1 duration-200">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="tool-description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="tool-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What does this tool do? Why should developers use it?"
          maxLength={500}
          rows={4}
          className={`bg-background/50 border-border/60 transition-all duration-200 resize-none focus:bg-background focus:border-primary/40 focus:shadow-[0_0_0_3px] focus:shadow-primary/10 placeholder:text-muted-foreground/40 ${
            fieldErrors.description ? "border-destructive/60 focus:border-destructive/60 focus:shadow-destructive/10" : ""
          }`}
        />
        <div className="flex items-center justify-between">
          {fieldErrors.description ? (
            <p className="text-xs text-destructive font-medium animate-in fade-in-0 slide-in-from-top-1 duration-200">
              {fieldErrors.description[0]}
            </p>
          ) : (
            <span />
          )}
          <span className="text-[11px] text-muted-foreground/60 tabular-nums">
            {formData.description.length}/500
          </span>
        </div>
      </div>

      {/* URL + Logo URL side by side on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* URL */}
        <div className="space-y-2">
          <Label htmlFor="tool-url" className="text-sm font-medium">
            URL
          </Label>
          <Input
            id="tool-url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com"
            autoComplete="url"
            className={`h-11 bg-background/50 border-border/60 transition-all duration-200 focus:bg-background focus:border-primary/40 focus:shadow-[0_0_0_3px] focus:shadow-primary/10 placeholder:text-muted-foreground/40 ${
              fieldErrors.url ? "border-destructive/60 focus:border-destructive/60 focus:shadow-destructive/10" : ""
            }`}
          />
          {fieldErrors.url && (
            <p className="text-xs text-destructive font-medium animate-in fade-in-0 slide-in-from-top-1 duration-200">
              {fieldErrors.url[0]}
            </p>
          )}
        </div>

        {/* Logo URL */}
        <div className="space-y-2">
          <Label htmlFor="tool-logo" className="text-sm font-medium">
            Logo URL
            <span className="text-[11px] text-muted-foreground/60 font-normal ml-1">(optional)</span>
          </Label>
          <Input
            id="tool-logo"
            name="logoUrl"
            type="url"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            autoComplete="off"
            className={`h-11 bg-background/50 border-border/60 transition-all duration-200 focus:bg-background focus:border-primary/40 focus:shadow-[0_0_0_3px] focus:shadow-primary/10 placeholder:text-muted-foreground/40 ${
              fieldErrors.logoUrl ? "border-destructive/60 focus:border-destructive/60 focus:shadow-destructive/10" : ""
            }`}
          />
          {fieldErrors.logoUrl && (
            <p className="text-xs text-destructive font-medium animate-in fade-in-0 slide-in-from-top-1 duration-200">
              {fieldErrors.logoUrl[0]}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="tool-category" className="text-sm font-medium">
          Category
        </Label>
        <Select
          value={formData.categoryId}
          onValueChange={(value) => {
            setFormData((prev) => ({ ...prev, categoryId: value }))
            if (fieldErrors.categoryId) {
              setFieldErrors((prev) => {
                const next = { ...prev }
                delete next.categoryId
                return next
              })
            }
          }}
        >
          <SelectTrigger
            id="tool-category"
            className={`h-11 bg-background/50 border-border/60 transition-all duration-200 focus:bg-background focus:border-primary/40 focus:shadow-[0_0_0_3px] focus:shadow-primary/10 ${
              fieldErrors.categoryId ? "border-destructive/60 focus:border-destructive/60 focus:shadow-destructive/10" : ""
            } ${!formData.categoryId ? "text-muted-foreground/40" : ""}`}
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors.categoryId && (
          <p className="text-xs text-destructive font-medium animate-in fade-in-0 slide-in-from-top-1 duration-200">
            {fieldErrors.categoryId[0]}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tool-tags" className="text-sm font-medium">
          Tags
          <span className="text-[11px] text-muted-foreground/60 font-normal ml-1">
            press Enter or comma to add
          </span>
        </Label>
        <div
          className={`flex flex-wrap items-center gap-1.5 p-2.5 min-h-[44px] rounded-lg border bg-background/50 border-border/60 transition-all duration-200 focus-within:bg-background focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px] focus-within:shadow-primary/10 ${
            fieldErrors.tags ? "border-destructive/60 focus-within:border-destructive/60 focus-within:shadow-destructive/10" : ""
          }`}
          onClick={() => tagInputRef.current?.focus()}
          role="button"
          tabIndex={-1}
        >
          {formData.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-2.5 py-1 text-xs font-medium gap-1 rounded-md bg-primary/8 text-primary border-primary/15 hover:bg-primary/12 transition-colors group animate-in fade-in-0 zoom-in-95 duration-200"
            >
              {tag}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(tag)
                }}
                className="ml-0.5 rounded-sm hover:bg-primary/20 p-0.5 transition-colors"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
          <input
            ref={tagInputRef}
            id="tool-tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={() => {
              if (tagInput.trim()) addTag(tagInput)
            }}
            placeholder={formData.tags.length === 0 ? "react, typescript, ..." : ""}
            className="flex-1 min-w-[120px] bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground/40 p-0.5"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center justify-between">
          {fieldErrors.tags ? (
            <p className="text-xs text-destructive font-medium animate-in fade-in-0 slide-in-from-top-1 duration-200">
              {fieldErrors.tags[0]}
            </p>
          ) : (
            <span />
          )}
          {formData.tags.length > 0 && (
            <span className="text-[11px] text-muted-foreground/60 tabular-nums">
              {formData.tags.length}/10 tags
            </span>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 text-sm font-medium gap-2 transition-all duration-150"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  )
}
