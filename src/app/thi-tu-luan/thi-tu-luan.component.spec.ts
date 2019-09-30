import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThiTuLuanComponent } from './thi-tu-luan.component';

describe('ThiTuLuanComponent', () => {
  let component: ThiTuLuanComponent;
  let fixture: ComponentFixture<ThiTuLuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThiTuLuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThiTuLuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
