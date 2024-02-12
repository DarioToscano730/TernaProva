import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSirtiComponent } from './pagina-sirti.component';

describe('PaginaSirtiComponent', () => {
  let component: PaginaSirtiComponent;
  let fixture: ComponentFixture<PaginaSirtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaSirtiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaSirtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
