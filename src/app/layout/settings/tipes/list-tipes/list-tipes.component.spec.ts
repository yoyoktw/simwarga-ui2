import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipesComponent } from './list-tipes.component';

describe('ListTipesComponent', () => {
  let component: ListTipesComponent;
  let fixture: ComponentFixture<ListTipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
