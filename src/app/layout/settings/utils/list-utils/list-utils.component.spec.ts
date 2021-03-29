import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUtilsComponent } from './list-utils.component';

describe('ListUtilsComponent', () => {
  let component: ListUtilsComponent;
  let fixture: ComponentFixture<ListUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUtilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
