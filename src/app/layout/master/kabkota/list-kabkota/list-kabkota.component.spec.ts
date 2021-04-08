import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListKabkotaComponent } from './list-kabkota.component';

describe('ListKabkotaComponent', () => {
  let component: ListKabkotaComponent;
  let fixture: ComponentFixture<ListKabkotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListKabkotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKabkotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
