import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRTComponent } from './list-rt.component';

describe('ListRTComponent', () => {
  let component: ListRTComponent;
  let fixture: ComponentFixture<ListRTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
