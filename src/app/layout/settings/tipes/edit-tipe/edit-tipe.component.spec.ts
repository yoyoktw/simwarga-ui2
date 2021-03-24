import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipeComponent } from './edit-tipe.component';

describe('EditTipeComponent', () => {
  let component: EditTipeComponent;
  let fixture: ComponentFixture<EditTipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
