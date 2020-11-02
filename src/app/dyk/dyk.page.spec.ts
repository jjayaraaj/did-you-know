import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DykPage } from './dyk.page';

describe('DykPage', () => {
  let component: DykPage;
  let fixture: ComponentFixture<DykPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DykPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DykPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
