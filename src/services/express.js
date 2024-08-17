import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import artistRoutes from "../routes/artist.route.js";
import musicRoutes from "../routes/music.route.js";
import { checkAuth } from "../middlewares/authHandler.js";
async function ExpressApp(app) {
  // logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // @Desc importing routess

  app.use("/api/v1/auth", authRoutes);
  app.use(checkAuth);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/artists", artistRoutes);
  app.use("/api/v1/music", musicRoutes);
}

export default ExpressApp;
