import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTernaComponent } from './pagina-terna.component';

describe('PaginaTernaComponent', () => {
  let component: PaginaTernaComponent;
  let fixture: ComponentFixture<PaginaTernaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaTernaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaTernaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
