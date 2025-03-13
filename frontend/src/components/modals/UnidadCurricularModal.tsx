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
import type { UnidadCurricular } from "@/models";
import { capitalizeWords, getSemestresDeDictado } from "@/utils";

interface UnidadCurricularModalProps {
  unidadCurricular: UnidadCurricular;
  open: boolean;
  onClose: () => void;
}

export const UnidadCurricularModal = ({
  unidadCurricular,
  open,
  onClose,
}: UnidadCurricularModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-50 gap-16 sm:gap-6">
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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
