import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListKecamatanComponent } from './list-kecamatan.component';

describe('ListKecamatanComponent', () => {
  let component: ListKecamatanComponent;
  let fixture: ComponentFixture<ListKecamatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListKecamatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKecamatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
