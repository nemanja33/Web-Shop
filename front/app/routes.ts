import { index, route, prefix, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),

  ...prefix("products", [
    index("./routes/products/index.tsx"),
    route(":pid", "./routes/products/product/index.tsx"),
    route(":pid/edit", "./routes/products/product/edit-product/edit-product.tsx"),
    route("add-product", "./routes/products/add-product/add-product.tsx"),
  ]),

] satisfies RouteConfig