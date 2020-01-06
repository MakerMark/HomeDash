import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketWidgetComponent } from './socket-widget.component';

describe('SocketWidgetComponent', () => {
  let component: SocketWidgetComponent;
  let fixture: ComponentFixture<SocketWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
