import { index, route, prefix, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),

  route("about", "./routes/about/index.tsx"),
  route("basket", "./routes/basket/index.tsx"),

  ...prefix("products", [
    index("./routes/products/index.tsx"),
    route("add-product", "./routes/products/add-product/index.tsx"),
    route(":name", "./routes/products/[name]/index.tsx"),
    route(":name/edit", "./routes/products/[name]/edit-product/index.tsx"),
  ]),

] satisfies RouteConfig