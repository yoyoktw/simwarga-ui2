import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRWComponent } from './list-rw.component';

describe('ListRWComponent', () => {
  let component: ListRWComponent;
  let fixture: ComponentFixture<ListRWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
