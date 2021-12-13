import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19ListComponent } from './covid19-list.component';

describe('Covid19ListComponent', () => {
  let component: Covid19ListComponent;
  let fixture: ComponentFixture<Covid19ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Covid19ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
