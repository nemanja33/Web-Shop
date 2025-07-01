import ProductCard from "~/app/components/product-card";
import type { Route } from "../../+types/root";
import products from "~/src/dummy-data.json";
import type { Card } from '~/app/components/product-card/types.ts';
import './style.css'


// export async function loader({ params }: Route.LoaderArgs) {
//     let product = await getProduct(params.pid);

//     if (!product) {
//         throw new Response("Not Found", { status: 404 });
//     }
//     return { product };
// }

// export default function Product({
//     loaderData
// }:Route.ComponentProps) {
//     return <div>{loaderData?.product.name}</div>
// }

export default function Products() {
    return (
        <div className="product-grid">
            {
                products.map((product: Card) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />
                ))
            }
        </div>
    )
}