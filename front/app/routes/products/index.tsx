import type { Route } from "../../+types/root";


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
    return <div>Products</div>
}