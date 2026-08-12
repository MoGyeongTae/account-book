export const IncomeCategory = {
  SALARY: "SALARY",
  SIDE_INCOME: "SIDE_INCOME",
  INTEREST: "INTEREST",
  ALLOWANCE: "ALLOWANCE",
  REFUND: "REFUND",
} as const;

export type IncomeCategory =
  (typeof IncomeCategory)[keyof typeof IncomeCategory];

export const incomeCategoryLabel: Record<IncomeCategory, string> = {
  [IncomeCategory.SALARY]: "급여",
  [IncomeCategory.SIDE_INCOME]: "부수입",
  [IncomeCategory.INTEREST]: "이자",
  [IncomeCategory.ALLOWANCE]: "용돈",
  [IncomeCategory.REFUND]: "환불",
};

export const ExpenseCategory = {
  FOOD: "FOOD",
  TRANSPORT: "TRANSPORT",
  SHOPPING: "SHOPPING",
  SUBSCRIPTION: "SUBSCRIPTION",
  MEDICAL: "MEDICAL",
} as const;

export type ExpenseCategory =
  (typeof ExpenseCategory)[keyof typeof ExpenseCategory];

export const expenseCategoryLabel: Record<ExpenseCategory, string> = {
  [ExpenseCategory.FOOD]: "식비",
  [ExpenseCategory.TRANSPORT]: "교통",
  [ExpenseCategory.SHOPPING]: "쇼핑",
  [ExpenseCategory.SUBSCRIPTION]: "구독",
  [ExpenseCategory.MEDICAL]: "의료",
};

export function getIncomeCategoryLabel(category: IncomeCategory) {
  return incomeCategoryLabel[category];
}

export function getExpenseCategoryLabel(category: ExpenseCategory) {
  return expenseCategoryLabel[category];
}
