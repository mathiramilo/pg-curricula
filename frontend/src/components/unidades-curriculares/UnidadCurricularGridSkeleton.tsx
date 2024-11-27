import { Skeleton } from "../ui";
import { UnidadCurricularItemSkeleton } from "./UnidadCurricularItemSkeleton";

export const UnidadCurricularGridSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Skeleton className="w-48 h-6 rounded-full" />
      <div className="w-full grid grid-cols-3 gap-x-12 gap-y-2">
        {Array.from({ length: 42 }).map((_, index) => (
          <UnidadCurricularItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
