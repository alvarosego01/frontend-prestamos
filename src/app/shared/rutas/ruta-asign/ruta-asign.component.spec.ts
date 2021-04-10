import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAsignComponent } from './ruta-asign.component';

describe('RutaAsignComponent', () => {
  let component: RutaAsignComponent;
  let fixture: ComponentFixture<RutaAsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAsignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
