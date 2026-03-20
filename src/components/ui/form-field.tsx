import { cn } from "@/lib/utils"
import React from "react"

type FormFieldBaseProps = {
  label: string
  id: string
  error?: string
  className?: string
}

type InputFieldProps = FormFieldBaseProps & {
  as?: never
} & React.InputHTMLAttributes<HTMLInputElement>

type SelectFieldProps = FormFieldBaseProps & {
  as: 'select'
  children: React.ReactNode
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>

type FormFieldProps = InputFieldProps | SelectFieldProps

const fieldStyles = "w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200 min-h-[44px]"

export function FormField(props: FormFieldProps) {
  const { label, id, error, className, ...rest } = props

  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text-secondary)]"
      >
        {label}
      </label>
      {props.as === 'select' ? (
        <select
          id={id}
          className={fieldStyles}
          {...(rest as Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>)}
        >
          {props.children}
        </select>
      ) : (
        <input
          id={id}
          className={fieldStyles}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p className="text-[var(--danger)] text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
