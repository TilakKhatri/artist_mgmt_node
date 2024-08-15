import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";

async function ExpressApp(app) {
  // @Desc importing routess

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
}

export default ExpressApp;
