import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  total: number
  pending: number
  approved: number
  rejected: number
}

export function SectionCards({
  total,
  pending,
  approved,
  rejected,
}: SectionCardsProps) {
  const stats = [
    { label: "Total Tools", value: total },
    { label: "Pending Review", value: pending },
    { label: "Approved", value: approved },
    { label: "Rejected", value: rejected },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {stats.map((stat) => (
        <Card key={stat.label} className="@container/card">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stat.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}