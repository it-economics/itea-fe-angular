import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { productsStub } from '../assets/stubs';
import { ProductsApiService } from '@services';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductsComponent],
            providers: [
                {
                    provide: ProductsApiService,
                    useValue: { getProducts: () => of(productsStub) },
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
        expect(component.products).toEqual(productsStub);
    });
});
