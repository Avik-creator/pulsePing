import { cn } from "@/lib/utils";
export const SectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("max-w-full mx-auto", className)}>{children}</div>;
};
