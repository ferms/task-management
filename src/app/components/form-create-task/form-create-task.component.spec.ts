import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTaskComponent } from './form-create-task.component';

describe('FormCreateTaskComponent', () => {
  let component: FormCreateTaskComponent;
  let fixture: ComponentFixture<FormCreateTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateTaskComponent]
    });
    fixture = TestBed.createComponent(FormCreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
