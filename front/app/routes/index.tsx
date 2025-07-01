import FeaturedProducts from "~/app/components/featured-products";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Store" },
    { name: "description", content: "Welcome to our Product Store!" },
  ];
}

export default function Home() {
  return (
    <FeaturedProducts />
  );
}
