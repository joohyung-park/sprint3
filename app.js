import express from "express";
import articleRouter from "./routes/article.js";
import productRouter from "./routes/product.js";

const app = express();

app.use(express.json());

// 라우터 mount
app.use("/articles", articleRouter);
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
