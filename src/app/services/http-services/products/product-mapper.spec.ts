import { ProductMapper } from '@services/http-services/products/product-mapper';
import { environment } from 'src/environments/environment';

describe('ProductMapper', () => {
    const imageUrl = environment.CDN_IMAGE_URL;

    it('should map from productResponse', () => {
        expect(
            ProductMapper.fromProductResponse({
                product: {
                    id: { internalID: 1 },
                    name: 'name',
                    imageName: 'imageName',
                    price: { cents: 1499 },
                    description: 'description',
                },
            })
        ).toEqual({ id: 1, name: 'name', imageUrl: `${imageUrl}imageName`, price: 14.99, description: 'description' });
    });

    it('should map from productsResponse', () => {
        expect(
            ProductMapper.fromProductsResponse({
                products: [
                    {
                        id: { internalID: 1 },
                        name: 'name1',
                        imageName: 'imageName1',
                        price: { cents: 1111 },
                        description: 'description1',
                    },
                    {
                        id: { internalID: 2 },
                        name: 'name2',
                        imageName: 'imageName2',
                        price: { cents: 2222 },
                        description: 'description2',
                    },
                ],
            })
        ).toEqual([
            { id: 1, name: 'name1', imageUrl: `${imageUrl}imageName1`, price: 11.11, description: 'description1' },
            { id: 2, name: 'name2', imageUrl: `${imageUrl}imageName2`, price: 22.22, description: 'description2' },
        ]);
    });
});
