import styles from "./styles/Header.module.css";
import { useState } from "react";

function ModalSubirArchivo({ abrirModal, cerrarModal } : any) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const manejarCambioDeArchivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    console.log('entra fun')
    if (evento.target.files) {
      setArchivo(evento.target.files[0]);
    }
  };

  const manejarEnvio = (evento: React.FormEvent) => {
    console.log('entra 2')
    evento.preventDefault();
    if (archivo) {
      subirPDF(archivo);
      cerrarModal()
    }
  };

  const subirPDF = (archivo: File) => {
    const formData = new FormData();
    formData.append("pdf", archivo);
    console.log('archivo', archivo)
    fetch("http://localhost:8080/api/escolaridad/procesar-escolaridad", {
      method: "POST",
      body: formData,
    })
    .then((respuesta) => {
      console.log("Respuesta recibida:", respuesta);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    abrirModal && (
        <div className={styles.subirArchivoModal}>
          <div className={styles.modalContent}>
            <div onClick={cerrarModal} className={styles.closeButton}>X</div>
            <h2>Subir Escolaridad</h2>
            <div className={styles.form}>
              <form onSubmit={manejarEnvio}>
                <input className={styles.input} type="file" onChange={manejarCambioDeArchivo} accept="application/pdf" />
                <button className={styles.buttonSubir} type="submit">Subir</button>
              </form>
            </div>
          </div>
        </div>
      )
  );
}

export default ModalSubirArchivo;
