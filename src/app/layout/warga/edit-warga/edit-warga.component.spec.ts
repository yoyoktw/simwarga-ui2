import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWargaComponent } from './edit-warga.component';

describe('EditWargaComponent', () => {
  let component: EditWargaComponent;
  let fixture: ComponentFixture<EditWargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
