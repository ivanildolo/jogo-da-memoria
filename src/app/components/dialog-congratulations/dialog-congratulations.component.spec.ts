import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCongratulationsComponent } from './dialog-congratulations.component';

describe('DialogCongratulationsComponent', () => {
  let component: DialogCongratulationsComponent;
  let fixture: ComponentFixture<DialogCongratulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCongratulationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
