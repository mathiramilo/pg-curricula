import { REQUISITOS_TITULO } from "@/models";
import { calculatePercentage } from "@/utils";
import { Progress } from "./ui";

interface TotalProgressProps {
  creditos: number;
}

export const TotalProgress = ({ creditos }: TotalProgressProps) => {
  const progressPercentage = calculatePercentage(
    creditos,
    REQUISITOS_TITULO.CREDITOS_TOTALES,
  );

  const satisfaceCreditosTotales =
    creditos >= REQUISITOS_TITULO.CREDITOS_TOTALES;

  return (
    <div>
      <p className="text-sm text-fuente-principal">
        {creditos}/{REQUISITOS_TITULO.CREDITOS_TOTALES} creditos
      </p>
      <Progress
        value={progressPercentage}
        className={satisfaceCreditosTotales ? "[&>div]:bg-green-600" : ""}
      />
    </div>
  );
};
