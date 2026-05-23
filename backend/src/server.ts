import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    message: "Smart Factory Backend Running",
  };
});

const start = async () => {
  try {
    await app.listen({
      port: 5000,
    });

    console.log("Server running on port 5000");
  } catch (error) {
    app.log.error(error);

    process.exit(1);
  }
};

start();
