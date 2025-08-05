import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';

import { of } from 'rxjs';

import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ProductsApiService } from '../../services/products-api.service';
import { productsStub } from 'src/assets/stubs/products.stub';

describe('ProductComponent', () => {
    let component: ProductDetailComponent;
    let fixture: ComponentFixture<ProductDetailComponent>;
    let productApiSpy: jasmine.SpyObj<ProductsApiService>;

    beforeEach(async () => {
        productApiSpy = jasmine.createSpyObj('ProductsApiService', ['getProduct']);
        productApiSpy.getProduct.and.returnValue(of(productsStub[0]));

        await TestBed.configureTestingModule({
            imports: [ProductDetailComponent],
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

        fixture = TestBed.createComponent(ProductDetailComponent);
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
