import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { productsStub } from '../assets/stubs';
import { ProductsApiService } from '@services';
import { of } from 'rxjs';
import { MockComponents } from 'ng-mocks';
import { ProductTileComponent } from './product-tile/product-tile.component';

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let productApiSpy: jasmine.SpyObj<ProductsApiService>;

    beforeEach(async () => {
        productApiSpy = jasmine.createSpyObj('ProductsApiService', ['getProducts']);
        productApiSpy.getProducts.and.returnValue(of(productsStub));

        await TestBed.configureTestingModule({
            imports: [ProductsComponent, MockComponents(ProductTileComponent)],
            providers: [
                {
                    provide: ProductsApiService,
                    useValue: productApiSpy,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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

    it('should load products', () => {
        expect(productApiSpy.getProducts).toHaveBeenCalledOnceWith();
        expect(component.products).toEqual(productsStub);
    });
});
