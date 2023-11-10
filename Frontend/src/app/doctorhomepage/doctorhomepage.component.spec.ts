import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorhomepageComponent } from './doctorhomepage.component';

describe('DoctorhomepageComponent', () => {
  let component: DoctorhomepageComponent;
  let fixture: ComponentFixture<DoctorhomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorhomepageComponent]
    });
    fixture = TestBed.createComponent(DoctorhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
