import {
  Button,
  Card,
  CardContent,
  CardDetail,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components";
import { usePrevias } from "@/hooks";
import { useUnidadCurricularModalStore } from "@/store";
import { capitalizeWords, getSemestresDeDictado } from "@/utils";

export const UnidadCurricularModal = () => {
  const { unidadCurricular, show, close } = useUnidadCurricularModalStore();

  const { data: previas } = usePrevias(unidadCurricular?.codigoEnServicioUC);

  console.log(previas);

  if (!unidadCurricular) return null;

  return (
    <Dialog open={show} onOpenChange={close}>
      <DialogContent className="bg-slate-50 justify-start">
        <DialogHeader>
          <DialogTitle>
            {unidadCurricular.codigoEnServicioUC} -{" "}
            {capitalizeWords(unidadCurricular.nombreUC)}
          </DialogTitle>
          <DialogDescription>
            Información de la unidad curricular
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>Datos Generales</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDetail>
              <strong className="font-medium">Créditos:</strong>{" "}
              {unidadCurricular.creditosUC}
            </CardDetail>
            <CardDetail>
              <strong className="font-medium">Grupo:</strong>{" "}
              {capitalizeWords(unidadCurricular.nombreGrupoHijo)}
            </CardDetail>
            <CardDetail>
              <strong className="font-medium">Semestre:</strong>{" "}
              {getSemestresDeDictado(unidadCurricular.semestres)}
            </CardDetail>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Previaturas</CardTitle>
          </CardHeader>

          <CardContent>{/* Mostrar arbol de previaturas */}</CardContent>
        </Card>

        <DialogFooter className="mt-auto">
          <Button variant="outline" onClick={close}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
