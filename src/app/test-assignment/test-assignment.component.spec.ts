import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignmentComponent } from './test-assignment.component';

describe('TestAssignmentComponent', () => {
  let component: TestAssignmentComponent;
  let fixture: ComponentFixture<TestAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
