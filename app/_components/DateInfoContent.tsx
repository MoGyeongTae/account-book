"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DateInfoHeader from "./DateInfoHeader";
import {
  ExpenseCategory,
  IncomeCategory,
  getExpenseCategoryLabel,
  getIncomeCategoryLabel,
} from "../_constants/categories";

export type IncomeEntryRow = {
  date: string;
  category: IncomeCategory;
  amount: number;
  note: string;
};

export type ExpenseEntryRow = {
  date: string;
  category: ExpenseCategory;
  amount: number;
  note: string;
};

type DateInfoContentProps = {
  date: string;
  initialIncomeRows: IncomeEntryRow[];
  initialExpenseRows: ExpenseEntryRow[];
};

function formatAmount(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}

function sumAmount(rows: { amount: number }[]) {
  return rows.reduce((total, row) => total + row.amount, 0);
}

function InfoCard<T extends string>({
  title,
  rows,
  showDate = true,
  getCategoryLabel,
}: {
  title: string;
  rows: { date: string; category: T; amount: number; note: string }[];
  showDate?: boolean;
  getCategoryLabel: (category: T) => string;
}) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
        {title}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              {showDate && (
                <th className="pb-3 pr-3 font-medium">날짜</th>
              )}
              <th className="pb-3 pr-3 font-medium">카테고리</th>
              <th className="pb-3 pr-3 font-medium">금액</th>
              <th className="pb-3 font-medium">비고</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.category}-${index}`}
                className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800/80"
              >
                {showDate && (
                  <td className="py-3 pr-3 text-zinc-700 dark:text-zinc-300">
                    {row.date}
                  </td>
                )}
                <td className="py-3 pr-3 font-medium text-zinc-950 dark:text-zinc-50">
                  {getCategoryLabel(row.category)}
                </td>
                <td className="py-3 pr-3 text-zinc-700 dark:text-zinc-300">
                  {formatAmount(row.amount)}
                </td>
                <td className="py-3 text-zinc-600 dark:text-zinc-400">
                  {row.note || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export default function DateInfoContent({
  date,
  initialIncomeRows,
  initialExpenseRows,
}: DateInfoContentProps) {
  const router = useRouter();
  const [incomeRows, setIncomeRows] = useState(initialIncomeRows);
  const [expenseRows, setExpenseRows] = useState(initialExpenseRows);

  const totalIncome = sumAmount(incomeRows);
  const totalExpense = sumAmount(expenseRows);

  const handleAdd = () => {
    router.push(`/${date}/add`);
  };

  return (
    <div className="flex flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <DateInfoHeader
          date={date}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          onAdd={handleAdd}
        />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <InfoCard
            title="수입"
            rows={incomeRows}
            showDate={false}
            getCategoryLabel={getIncomeCategoryLabel}
          />
          <InfoCard
            title="지출"
            rows={expenseRows}
            showDate={false}
            getCategoryLabel={getExpenseCategoryLabel}
          />
        </div>

        <div className="mt-8">
          <Link
            href="/calendar"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← 캘린더로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
