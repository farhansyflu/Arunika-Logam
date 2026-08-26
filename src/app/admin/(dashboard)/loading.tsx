import TopLoadingBar from "@/components/site/TopLoadingBar";

export default function AdminLoading() {
  return (
    <>
      <TopLoadingBar />
      <div className="animate-fade-in space-y-4">
        <div className="h-7 w-48 rounded-full bg-cream-200" />
        <div className="h-4 w-32 rounded-full bg-cream-200" />
        <div className="mt-8 h-64 w-full rounded-2xl border border-line bg-white" />
      </div>
    </>
  );
}
