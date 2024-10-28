import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChorusGridComponent } from './chorus-grid.component';

describe('ChorusGridComponent', () => {
  let component: ChorusGridComponent;
  let fixture: ComponentFixture<ChorusGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChorusGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChorusGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
