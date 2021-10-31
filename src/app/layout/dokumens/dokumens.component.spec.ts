import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumensComponent } from './dokumens.component';

describe('DokumensComponent', () => {
  let component: DokumensComponent;
  let fixture: ComponentFixture<DokumensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokumensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
