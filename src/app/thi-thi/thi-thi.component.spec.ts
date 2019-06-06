import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThiThiComponent } from './thi-thi.component';

describe('ThiThiComponent', () => {
  let component: ThiThiComponent;
  let fixture: ComponentFixture<ThiThiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThiThiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThiThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
