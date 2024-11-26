import { Progress } from '../components';

export const InicioScreen = () => {
  return (
    <section className="flex flex-col gap-y-4 flex-1 p-5 bg-white w-full">
      <h2 className="font-bold text-xl">Progreso de Carrera</h2>
      <div className="flex flex-col gap-y-1">
        <p className="font-medium">366 creditos</p>
        <Progress value={20} />
        <div className="flex gap-x-4">
          <p className="font-medium">
            Matemática: <span className="text-primary font-bold">87/86</span>
          </p>
          <p className="font-medium">
            Programacion: <span className="text-primary font-bold">25/60</span>
          </p>
          <p className="font-medium">
            Programacion: <span className="text-primary font-bold">12/24</span>
          </p>
        </div>
      </div>
    </section>
  );
};
