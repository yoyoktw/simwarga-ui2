import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListDesaComponent } from './list-desa.component';

describe('ListDesaComponent', () => {
  let component: ListDesaComponent;
  let fixture: ComponentFixture<ListDesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
