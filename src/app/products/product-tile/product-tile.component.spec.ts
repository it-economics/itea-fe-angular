import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileComponent } from './product-tile.component';
import { ActivatedRoute } from '@angular/router';
import { productsStub } from '@stubs/products.stub';

describe('ProductTileComponent', () => {
    let component: ProductTileComponent;
    let fixture: ComponentFixture<ProductTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductTileComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: null,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductTileComponent);
        component = fixture.componentInstance;

        component.product = productsStub[0];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
