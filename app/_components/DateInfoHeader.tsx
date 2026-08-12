"use client";

import { useEffect, useState } from "react";

type DateInfoHeaderProps = {
  date: string;
  totalIncome: number;
  totalExpense: number;
  onAdd?: () => void;
};

function formatAmount(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export default function DateInfoHeader({
  date,
  totalIncome,
  totalExpense,
  onAdd,
}: DateInfoHeaderProps) {
  const [balance, setBalance] = useState(totalIncome - totalExpense);

  useEffect(() => {
    setBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  const badgeStyle =
    balance === 0
      ? "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400"
      : balance > 0
        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
        : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400";

  const balanceLabel =
    balance === 0
      ? formatAmount(0)
      : `${balance > 0 ? "+" : "-"} ${formatAmount(Math.abs(balance))}`;

  return (
    <div className="mb-6 flex w-full items-center gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {date}
        </h1>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${badgeStyle}`}
        >
          {balanceLabel}
        </span>
      </div>
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="ml-auto shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          항목 추가
        </button>
      )}
    </div>
  );
}
