import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Random1 } from './random1';

describe('Random1', () => {
  let component: Random1;
  let fixture: ComponentFixture<Random1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Random1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Random1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
