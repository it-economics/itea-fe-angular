import { ProductResponse } from '@services/http-services/products/product-response';
import { Product } from '@models';
import { ProductsResponse } from '@services/http-services/products/products-response';

export class ProductMapper {
    public static fromProductResponse(productResponse: ProductResponse): Product {
        return {
            id: productResponse.product.id.internalID,
            name: productResponse.product.name,
            imageName: productResponse.product.imageName,
            price: productResponse.product.price.cents / 100,
        };
    }

    public static fromProductsResponse(productsResponse: ProductsResponse): Product[] {
        return productsResponse.products.map((productResponse) => {
            return {
                id: productResponse.id.internalID,
                name: productResponse.name,
                imageName: productResponse.imageName,
                price: productResponse.price.cents / 100,
            };
        });
    }
}
