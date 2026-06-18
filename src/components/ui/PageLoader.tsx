import { Spinner } from "./Spinner";

type PageLoaderProps = {
  label?: string;
};

export const PageLoader = ({ label = "Loading..." }: PageLoaderProps) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[var(--bg)] text-[var(--text)]">
      <Spinner size="lg" label={label} />
    </div>
  );
};

// import { PageLoader } from "@/components/ui/PageLoader";
// export default function Loading() {
//   return <PageLoader label="Loading dashboard..." />;
// }