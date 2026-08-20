import Calendar from "./_components/Calendar";
import MainDashboard from "./_components/MainDashboard";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <MainDashboard />
      <div className="flex flex-1 bg-zinc-50 dark:bg-black">
        <Calendar />
      </div>
    </div>
  );
}
