import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApproveRejectComponent } from './order-approve-reject.component';

describe('OrderApproveRejectComponent', () => {
  let component: OrderApproveRejectComponent;
  let fixture: ComponentFixture<OrderApproveRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderApproveRejectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderApproveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
