import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChorusFormComponent } from './chorus-form.component';

describe('ChorusFormComponent', () => {
  let component: ChorusFormComponent;
  let fixture: ComponentFixture<ChorusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChorusFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChorusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
