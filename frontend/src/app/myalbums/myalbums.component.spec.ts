import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyalbumsComponent } from './myalbums.component';

describe('MyalbumsComponent', () => {
  let component: MyalbumsComponent;
  let fixture: ComponentFixture<MyalbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyalbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyalbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
