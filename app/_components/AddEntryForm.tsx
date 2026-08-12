"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ExpenseCategory,
  IncomeCategory,
  expenseCategoryLabel,
  incomeCategoryLabel,
} from "../_constants/categories";

type EntryType = "income" | "expense";

type AddEntryFormProps = {
  date: string;
};

const inputClassName =
  "w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400";

export default function AddEntryForm({ date }: AddEntryFormProps) {
  const router = useRouter();
  const [entryType, setEntryType] = useState<EntryType>("income");
  const [category, setCategory] = useState<string>(IncomeCategory.SALARY);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const categoryOptions = useMemo(() => {
    if (entryType === "income") {
      return Object.entries(incomeCategoryLabel).map(([value, label]) => ({
        value,
        label,
      }));
    }

    return Object.entries(expenseCategoryLabel).map(([value, label]) => ({
      value,
      label,
    }));
  }, [entryType]);

  const handleTypeChange = (type: EntryType) => {
    setEntryType(type);
    setCategory(
      type === "income" ? IncomeCategory.SALARY : ExpenseCategory.FOOD,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      date,
      type: entryType,
      category,
      amount: Number(amount),
      note,
    });

    router.push(`/${date}/info`);
  };

  return (
    <div className="flex flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-lg px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/${date}/info`}
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← {date} 내역으로 돌아가기
          </Link>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            항목 추가
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {date}의 수입 또는 지출 내역을 등록합니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                유형
              </span>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex cursor-pointer items-center justify-center rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium transition-colors has-checked:border-emerald-500 has-checked:bg-emerald-50 has-checked:text-emerald-700 dark:border-zinc-700 dark:has-checked:border-emerald-500 dark:has-checked:bg-emerald-950/30 dark:has-checked:text-emerald-400">
                  <input
                    type="radio"
                    name="entryType"
                    value="income"
                    checked={entryType === "income"}
                    onChange={() => handleTypeChange("income")}
                    className="sr-only"
                  />
                  수입
                </label>
                <label className="flex cursor-pointer items-center justify-center rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium transition-colors has-checked:border-red-500 has-checked:bg-red-50 has-checked:text-red-700 dark:border-zinc-700 dark:has-checked:border-red-500 dark:has-checked:bg-red-950/30 dark:has-checked:text-red-400">
                  <input
                    type="radio"
                    name="entryType"
                    value="expense"
                    checked={entryType === "expense"}
                    onChange={() => handleTypeChange("expense")}
                    className="sr-only"
                  />
                  지출
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                날짜
              </label>
              <input
                id="date"
                name="date"
                type="text"
                value={date}
                readOnly
                className={`${inputClassName} bg-zinc-50 dark:bg-zinc-900/60`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                카테고리
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                className={inputClassName}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                금액
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="0"
                step="1"
                required
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0"
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="note"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                비고
              </label>
              <input
                id="note"
                name="note"
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="메모를 입력하세요"
                className={inputClassName}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-foreground px-5 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              >
                저장
              </button>
              <Link
                href={`/${date}/info`}
                className="flex h-12 flex-1 items-center justify-center rounded-full border border-zinc-200 px-5 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                취소
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
