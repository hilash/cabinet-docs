"use client";

import { Check, Minus, X } from "lucide-react";

export type CompareValue = boolean | "partial";

export type CompareRow = {
  feature: string;
  values: CompareValue[];
};

export function CompareTable({
  columns,
  rows,
  primaryIndex = 0,
}: {
  columns: string[];
  rows: CompareRow[];
  primaryIndex?: number;
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border bg-card not-prose">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-warm bg-[var(--accent-bg-subtle)]">
            <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
              Feature
            </th>
            {columns.map((col, i) => (
              <th
                key={col}
                className={`px-4 py-3 text-center font-semibold ${
                  i === primaryIndex ? "text-[var(--accent-warm)]" : "text-muted-foreground"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-border last:border-b-0 hover:bg-[var(--bg-card-hover)]">
              <td className="px-4 py-3 text-foreground">{row.feature}</td>
              {row.values.map((v, i) => (
                <td key={i} className="px-4 py-3 text-center">
                  {renderIcon(v, i === primaryIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderIcon(v: CompareValue, primary: boolean) {
  if (v === true) {
    return (
      <Check
        className={`mx-auto h-4 w-4 ${
          primary ? "text-[var(--accent-warm)]" : "text-emerald-600 dark:text-emerald-400"
        }`}
      />
    );
  }
  if (v === "partial") {
    return <Minus className="mx-auto h-4 w-4 text-amber-500" />;
  }
  return <X className="mx-auto h-3.5 w-3.5 text-muted-foreground/60" />;
}
