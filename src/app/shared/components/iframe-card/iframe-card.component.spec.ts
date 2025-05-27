import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeCardComponent } from './iframe-card.component';

describe('IframeCardComponent', () => {
  let component: IframeCardComponent;
  let fixture: ComponentFixture<IframeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IframeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IframeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
