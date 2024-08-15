import authRoutes from "../routes/auth.route.js";

async function ExpressApp(app) {
  // @Desc importing routess

  app.use("/api/v1/auth", authRoutes);
}

export default ExpressApp;
