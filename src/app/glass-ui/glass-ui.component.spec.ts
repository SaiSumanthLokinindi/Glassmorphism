import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassUIComponent } from './glass-ui.component';

describe('GlassUIComponent', () => {
  let component: GlassUIComponent;
  let fixture: ComponentFixture<GlassUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlassUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlassUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
