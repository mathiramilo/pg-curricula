import {
  UnidadCurricularGridSkeleton,
  UnidadCurricularListSkeleton,
} from "@/components";

export const TrayectoriaSugeridaLoading = () => {
  return (
    <section className="flex mt-8 flex-col gap-12">
      <div className="grid lg:grid-cols-3 gap-12">
        <UnidadCurricularListSkeleton />
        <UnidadCurricularListSkeleton />
        <UnidadCurricularListSkeleton />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <UnidadCurricularListSkeleton />
        <UnidadCurricularListSkeleton />
        <UnidadCurricularListSkeleton />
      </div>

      <UnidadCurricularGridSkeleton />
    </section>
  );
};
