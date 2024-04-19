import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';

import { of } from 'rxjs';

import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ProductsApiService } from '@services/http-services/products/products-api.service';
import { productsStub } from '@stubs/products.stub';

describe('ProductComponent', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;
    let productApiSpy: jasmine.SpyObj<ProductsApiService>;

    beforeEach(async () => {
        productApiSpy = jasmine.createSpyObj('ProductsApiService', ['getProduct']);
        productApiSpy.getProduct.and.returnValue(of(productsStub[0]));

        await TestBed.configureTestingModule({
            imports: [ProductComponent],
            providers: [
                {
                    provide: ProductsApiService,
                    useValue: productApiSpy,
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(convertToParamMap({ id: '33' })),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should request the product endpoint with given parameter id', () => {
        expect(productApiSpy.getProduct).toHaveBeenCalledOnceWith(33);
    });

    it('should fetch the product and store it in product', () => {
        expect(component.product).toEqual(productsStub[0]);
    });

    it('should cancel subscription', () => {
        // @ts-expect-error private property
        const nextSpy = spyOn(component._destroy$, 'next');
        // @ts-expect-error private property
        const completeSpy = spyOn(component._destroy$, 'complete');

        component.ngOnDestroy();

        expect(nextSpy).toHaveBeenCalled();
        expect(completeSpy).toHaveBeenCalled();
    });
});
