import { useEffect } from "react";
import { Link } from "react-router";
import ProductCard from "~/app/components/product-card";
import type { Card } from '~/app/components/product-card/types.ts'
import useGetAllProducts from "~/app/hooks/api/useGetAllProducts";

export default function Products() {
    const { error, products, loading, getAll } = useGetAllProducts();

    useEffect(() => {
        if (!products.length) {
            getAll();
        }
    }, []);
    

    if (error) {
        return <div className="product-grid-error">Error: {error}</div>
    }

    if (loading) {
        return <div className="product-grid-loading">Loading...</div>
    }
    
    return (
        <>
            <Link to="/products/add-product" className="product-card-btn-primary mb-10">
                Add Product
            </Link>
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
        </>
    )
}