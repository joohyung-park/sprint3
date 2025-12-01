import express from "express";
import { createArticleRouter } from "./adapters/inbound/http/routes/article.js";

const app = express();

app.use(express.json());

// 라우터 mount
app.use("/articles", createArticleRouter());
// app.use("/products", productRouter);

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
