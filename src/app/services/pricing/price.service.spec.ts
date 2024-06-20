import { TestBed } from '@angular/core/testing';
import { PriceService } from './price.service';
import { TaxType } from '@models/tax-type';
import { Product } from '@models/product';
import { productsStub } from '@stubs/products.stub';

describe('PriceService', () => {
    let service: PriceService;
    let product: Product;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PriceService);

        product = productsStub[0];
    });

    it('should calculate netPrice with standard tax', () => {
        product.price = 119;
        product.taxType = TaxType.STANDARD;

        expect(service.calculateNetPrice(product)).toEqual(100);
    });

    it('should calculate netPrice with reduced tax', () => {
        product.price = 107;
        product.taxType = TaxType.REDUCED;

        expect(service.calculateNetPrice(product)).toEqual(100);
    });

    it('should calculate netPrice with zero tax', () => {
        product.price = 100;
        product.taxType = TaxType.ZERO;

        expect(service.calculateNetPrice(product)).toEqual(100);
    });

    it('should calculate tax with not supported tax value', () => {
        // @ts-expect-error unknown type
        product.taxType = 'UNKNOWN';

        expect(() => service.calculateNetPrice(product)).toThrowError('Tax type not supported');
    });
});
