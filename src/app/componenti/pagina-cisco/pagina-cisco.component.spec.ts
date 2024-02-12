import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCiscoComponent } from './pagina-cisco.component';

describe('PaginaCiscoComponent', () => {
  let component: PaginaCiscoComponent;
  let fixture: ComponentFixture<PaginaCiscoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaCiscoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaCiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
