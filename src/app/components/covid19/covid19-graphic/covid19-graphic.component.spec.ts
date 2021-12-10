import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19GraphicComponent } from './covid19-graphic.component';

describe('Covid19ListComponent', () => {
  let component: Covid19GraphicComponent;
  let fixture: ComponentFixture<Covid19GraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Covid19GraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19GraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
