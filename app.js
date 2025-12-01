import express from "express";
import { setupDependencies } from "./adapters/config/dependencies.js";
import { createArticleRouter } from "./adapters/inbound/http/routes/article.js";
import productRouter from "./routes/product.js";

const app = express();

app.use(express.json());

// Dependency Injection
const useCases = setupDependencies();

// 라우터 mount
app.use("/articles", createArticleRouter(useCases));
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({
    message: "API Server",
    endpoints: ["/articles", "/products"],
  });
});

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`영업시작 ${port}`);
});
