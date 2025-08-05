import { environment } from 'src/environments/environment';
import { Product } from '../product.model';
import { ProductResponse } from './product-response';
import { ProductsResponse } from './products-response';

export class ProductMapper {
    public static fromProductResponse(productResponse: ProductResponse): Product {
        return {
            id: productResponse.product.id.internalID,
            name: productResponse.product.name,
            imageUrl: `${environment.CDN_IMAGE_URL}${productResponse.product.imageName}`,
            price: productResponse.product.price.cents / 100,
            description: productResponse.product.description,
        };
    }

    public static fromProductsResponse(productsResponse: ProductsResponse): Product[] {
        return productsResponse.products.map((productResponse) => {
            return {
                id: productResponse.id.internalID,
                name: productResponse.name,
                imageUrl: `${environment.CDN_IMAGE_URL}${productResponse.imageName}`,
                price: productResponse.price.cents / 100,
                description: productResponse.description,
            };
        });
    }
}
