import { Skeleton } from "../ui";
import { UnidadCurricularItemSkeleton } from "./UnidadCurricularItemSkeleton";

export const UnidadCurricularListSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Skeleton className="w-48 h-6 rounded-full" />
      <div className="w-full flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <UnidadCurricularItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
