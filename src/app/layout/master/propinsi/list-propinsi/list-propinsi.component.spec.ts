import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropinsiComponent } from './list-propinsi.component';

describe('ListPropinsiComponent', () => {
  let component: ListPropinsiComponent;
  let fixture: ComponentFixture<ListPropinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPropinsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
