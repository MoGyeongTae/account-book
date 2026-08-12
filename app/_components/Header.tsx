export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[75px] w-full border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Account Book
        </h1>
      </div>
    </header>
  );
}
