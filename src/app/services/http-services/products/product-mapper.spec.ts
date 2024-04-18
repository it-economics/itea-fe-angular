import { ProductMapper } from '@services/http-services/products/product-mapper';

describe('ProductMapper', () => {
    it('should map from productResponse', () => {
        expect(
            ProductMapper.fromProductResponse({
                product: {
                    id: { internalID: 1 },
                    name: 'name',
                    price: { cents: 1499 },
                },
            })
        ).toEqual({ id: 1, name: 'name', price: 14.99 });
    });

    it('should map from productsResponse', () => {
        expect(
            ProductMapper.fromProductsResponse({
                products: [
                    {
                        id: { internalID: 1 },
                        name: 'name1',
                        price: { cents: 1111 },
                    },
                    {
                        id: { internalID: 2 },
                        name: 'name2',
                        price: { cents: 2222 },
                    },
                ],
            })
        ).toEqual([
            { id: 1, name: 'name1', price: 11.11 },
            { id: 2, name: 'name2', price: 22.22 },
        ]);
    });
});
