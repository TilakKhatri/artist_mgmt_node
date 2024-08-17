import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import artistRoutes from "../routes/artist.route.js";
import { checkAuth } from "../middlewares/authHandler.js";
async function ExpressApp(app) {
  // @Desc importing routess

  app.use("/api/v1/auth", authRoutes);
  app.use(checkAuth);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/artists", artistRoutes);
}

export default ExpressApp;
