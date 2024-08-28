import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutCategoryFiltersComponent } from './prodcut-category-filters.component';

describe('ProdcutCategoryFiltersComponent', () => {
  let component: ProdcutCategoryFiltersComponent;
  let fixture: ComponentFixture<ProdcutCategoryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdcutCategoryFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdcutCategoryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
