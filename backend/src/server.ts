(async () => {
  if (process.env.NODE_ENV === "production") {
    import("module-alias/register");
  }

  const { app } = await import("./app");
  const { env } = await import("./config");

  const server = app.listen(env.PUERTO, () => {
    const { NODE_ENV, HOST, PUERTO } = env;
    console.log(`Servidor (${NODE_ENV}) corriendo en http://${HOST}:${PUERTO}`);
  });

  const onCloseSignal = () => {
    console.log("SIGINT/SIGTERM recibida, apagando...");
    server.close(() => {
      console.log("Servidor cerrado");
      process.exit();
    });
    setTimeout(() => process.exit(1), 10000).unref(); // Forzar apagado despues de 10s
  };

  process.on("SIGINT", onCloseSignal);
  process.on("SIGTERM", onCloseSignal);
})();
