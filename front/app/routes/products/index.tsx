import ProductCard from "~/app/components/product-card";
import type { Card } from '~/app/components/product-card/types.ts'
import useGetAllProducts from "~/app/hooks/api/useGetAllProducts";

export default function Products() {
    const { products, loading } = useGetAllProducts();

    if (loading) {
        return <div className="product-grid-loading">Loading...</div>
    }

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