import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLoginComponent } from './material-login.component';

describe('MaterialLoginComponent', () => {
  let component: MaterialLoginComponent;
  let fixture: ComponentFixture<MaterialLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
