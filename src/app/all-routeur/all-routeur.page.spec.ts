import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllRouteurPage } from './all-routeur.page';

describe('AllRouteurPage', () => {
  let component: AllRouteurPage;
  let fixture: ComponentFixture<AllRouteurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRouteurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllRouteurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
