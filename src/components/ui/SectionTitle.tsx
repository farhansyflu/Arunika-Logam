import clsx from "@/lib/clsx";

export default function SectionTitle({
  children,
  className,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <h2
      className={clsx(
        "text-4xl sm:text-5xl font-normal text-ink-900",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {children}
    </h2>
  );
}
