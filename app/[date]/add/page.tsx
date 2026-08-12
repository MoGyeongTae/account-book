import type { Metadata } from "next";
import AddEntryForm from "../../_components/AddEntryForm";

type PageProps = {
  params: Promise<{ date: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;

  return {
    title: `${date} 항목 추가 | Account Book`,
    description: `${date} 수입·지출 항목 추가`,
  };
}

export default async function DateAddPage({ params }: PageProps) {
  const { date } = await params;

  return <AddEntryForm date={date} />;
}
