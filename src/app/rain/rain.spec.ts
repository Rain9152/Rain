import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rain } from './rain';

describe('Rain', () => {
  let component: Rain;
  let fixture: ComponentFixture<Rain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
