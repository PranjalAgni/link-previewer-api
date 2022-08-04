import initalizeApp from "./app";
import config from "./config/index";

const startServer = async () => {
  const app = await initalizeApp();
  app.listen(config.port, () => {
    console.log(
      `Server running at http://localhost:${config.port} in ${config.env} mode`
    );
  });
};

startServer();
