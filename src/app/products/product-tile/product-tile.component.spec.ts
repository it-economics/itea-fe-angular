import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileComponent } from './product-tile.component';
import { productsStub } from '../../assets/stubs';

describe('ProductTileComponent', () => {
    let component: ProductTileComponent;
    let fixture: ComponentFixture<ProductTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductTileComponent],
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
