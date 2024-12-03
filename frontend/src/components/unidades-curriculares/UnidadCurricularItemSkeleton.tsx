import { Skeleton } from "../ui";

export const UnidadCurricularItemSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <Skeleton className="w-36 h-5 rounded-full" />
      <Skeleton className="w-16 h-5 rounded-full" />
    </div>
  );
};
