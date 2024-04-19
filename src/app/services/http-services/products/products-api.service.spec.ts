import { TestBed } from '@angular/core/testing';

import { ProductsApiService } from './products-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductResponse } from '@services/http-services/products/product-response';
import { of } from 'rxjs';
import { ProductMapper } from '@services/http-services/products/product-mapper';
import { ProductsResponse } from '@services/http-services/products/products-response';
import { GatewayService } from '@services/http-services/gateway/gateway.service';

describe('ProductsApiService', () => {
    let service: ProductsApiService;
    let gatewayServiceSpy: jasmine.SpyObj<GatewayService<ProductResponse>>;

    const productMock = { id: 1, name: 'name', imageName: 'imagName', price: 14.99 };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        gatewayServiceSpy = jasmine.createSpyObj('GatewayService', ['get']);
        service = new ProductsApiService(gatewayServiceSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch product by id', (done) => {
        const productResponseMock: ProductResponse = {
            product: { id: { internalID: 1 }, imageName: 'imageName', name: 'name', price: { cents: 1499 } },
        };
        spyOn(ProductMapper, 'fromProductResponse').withArgs(productResponseMock).and.returnValue(productMock);
        gatewayServiceSpy.get.and.returnValue(of(productResponseMock));

        service.getProduct(1).subscribe((product) => {
            expect(gatewayServiceSpy.get).toHaveBeenCalledWith('product/1');
            expect(product).toEqual(productMock);
            done();
        });
    });

    it('should fetch all products', (done) => {
        const productsResponseMock: ProductsResponse = {
            products: [{ id: { internalID: 1 }, name: 'name', imageName: 'imagName', price: { cents: 1499 } }],
        };
        spyOn(ProductMapper, 'fromProductsResponse').withArgs(productsResponseMock).and.returnValue([productMock]);
        gatewayServiceSpy.get.and.returnValue(of(productsResponseMock));

        service.getProducts().subscribe((products) => {
            expect(gatewayServiceSpy.get).toHaveBeenCalledWith('products');
            expect(products).toEqual([productMock]);
            done();
        });
    });
});
