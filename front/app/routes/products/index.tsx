import ProductCard from "~/app/components/product-card";
import type { Route } from "../../+types/root";
import type { Card } from '~/app/components/product-card/types.ts';
import './style.css'
import { useEffect, useState } from "react";
const dataUrl = 'http://localhost:3000/api/products'

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
    const [products, setProducts] = useState<Card[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(dataUrl);
                const data = await response.json();
                setProducts(data)
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();
    }, []);

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