import { Card } from "./card"

interface StatCardProps {
  value: string | number
  label: string
  unit?: string
  className?: string
}

export function StatCard({ value, label, unit, className }: StatCardProps) {
  return (
    <Card variant="stat" className={className}>
      <div className="font-mono text-3xl font-bold text-[var(--accent)]">
        {value}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </div>
      <div className="text-sm text-[var(--text-secondary)] mt-1">{label}</div>
    </Card>
  )
}
