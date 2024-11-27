import {
  UnidadCurricularGridSkeleton,
  UnidadCurricularListSkeleton,
} from "@/components";

export const UnidadesCurricularesLoading = () => {
  return (
    <section className="flex mt-8 flex-col gap-12">
      <div className="flex items-center justify-between gap-12">
        <UnidadCurricularListSkeleton />
        <UnidadCurricularListSkeleton />
        <UnidadCurricularListSkeleton />
      </div>

      <div className="flex items-center justify-between gap-12">
        <UnidadCurricularListSkeleton />
        <UnidadCurricularListSkeleton />
        <UnidadCurricularListSkeleton />
      </div>

      <div className="flex items-center justify-between gap-12">
        <UnidadCurricularGridSkeleton />
      </div>
    </section>
  );
};
