import type { Metadata } from "next";
import DateInfoContent from "../../_components/DateInfoContent";
import { ExpenseCategory, IncomeCategory } from "../../_constants/categories";

type PageProps = {
  params: Promise<{ date: string }>;
};

const incomeDummyData = [
  { category: IncomeCategory.SALARY, amount: 3200000, note: "8월 급여" },
  { category: IncomeCategory.SIDE_INCOME, amount: 150000, note: "프리랜서 정산" },
  { category: IncomeCategory.INTEREST, amount: 12500, note: "적금 이자" },
  { category: IncomeCategory.ALLOWANCE, amount: 50000, note: "" },
  { category: IncomeCategory.REFUND, amount: 28900, note: "온라인 쇼핑 환불" },
];

const expenseDummyData = [
  { category: ExpenseCategory.FOOD, amount: 18500, note: "점심 식사" },
  { category: ExpenseCategory.TRANSPORT, amount: 1370, note: "지하철 왕복" },
  { category: ExpenseCategory.SHOPPING, amount: 45900, note: "생활용품" },
  { category: ExpenseCategory.SUBSCRIPTION, amount: 14900, note: "스트리밍" },
  { category: ExpenseCategory.MEDICAL, amount: 22000, note: "약국" },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;

  return {
    title: `${date} | Account Book`,
    description: `${date} 수입·지출 내역`,
  };
}

export default async function DateInfoPage({ params }: PageProps) {
  const { date } = await params;

  const initialIncomeRows = incomeDummyData.map((row) => ({ ...row, date }));
  const initialExpenseRows = expenseDummyData.map((row) => ({ ...row, date }));

  return (
    <DateInfoContent
      date={date}
      initialIncomeRows={initialIncomeRows}
      initialExpenseRows={initialExpenseRows}
    />
  );
}
