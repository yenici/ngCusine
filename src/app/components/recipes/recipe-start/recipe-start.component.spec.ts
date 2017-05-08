import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStartComponent } from './recipe-start.component';

describe('RecipeStartComponent', () => {
  let component: RecipeStartComponent;
  let fixture: ComponentFixture<RecipeStartComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ RecipeStartComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeStartComponent]
    });
    fixture = TestBed.createComponent(RecipeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render title in h3 tag', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Please select a recipe');
  // });

});
