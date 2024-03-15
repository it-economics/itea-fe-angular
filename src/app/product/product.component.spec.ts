import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductsApiService } from '@services';
import { of } from 'rxjs';
import { productsStub } from '../assets/stubs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

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
});
