import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserAssignmentComponent } from './list-user-assignment.component';

describe('ListUserAssignmentComponent', () => {
  let component: ListUserAssignmentComponent;
  let fixture: ComponentFixture<ListUserAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
