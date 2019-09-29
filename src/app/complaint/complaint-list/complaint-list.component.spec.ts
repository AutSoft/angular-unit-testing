import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ComplaintListComponent } from './complaint-list.component';
import { ComplaintService } from '../complaint.service';
import { Complaint } from '../complaint';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ComplaintListComponent', () => {
  @Component({ selector: 'szia-stub', template: '' })
  class StubComponent {}

  let component: ComplaintListComponent;
  const complaints: Complaint[] = [
    {
      id: 0,
      subject: 'Toilets are messy',
      content: 'The first floor toilets look dreadful',
      name: 'Archie Webb',
      email: 'archie.webb@email.com',
      phoneNumber: '+1-202-555-0115',
      imageSource: 'https://source.unsplash.com/random/800x600'
    },
    {
      id: 1,
      subject: 'Long queues at check-in',
      content: 'People are queuing up in front of the open check-in meanwhile there are a lot of closed ones',
      name: 'Sean Lawrence',
      email: 'sean.lawrence@email.com',
      phoneNumber: '+1-202-555-0172',
      imageSource: 'https://source.unsplash.com/random/500x500'
    }
  ];

  describe('without view', () => {
    let complaintService: ComplaintService;

    beforeEach(() => {
      complaintService = { getComplaints: () => of(complaints) } as any as ComplaintService;

      component = new ComplaintListComponent(complaintService);
    });

    it('should load complaints', () => {
      expect(component.complaints).not.toBeDefined();

      component.ngOnInit();

      expect(component.complaints).toEqual(complaints);
    });

  });

  describe('with view', () => {
    let fixture: ComponentFixture<ComplaintListComponent>;
    const routes = [{ path: 'edit', component: StubComponent }, { path: 'edit/:id', component: StubComponent }];

    beforeEach(() => {
      const complaintService = { getComplaints: () => of(complaints) };

      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MatCardModule,
          MatIconModule,
          FlexLayoutModule,
          MatButtonModule,
          FormsModule,
          RouterTestingModule.withRoutes(routes)
        ],
        declarations: [ComplaintListComponent, StubComponent],
        providers: [{ provide: ComplaintService, useValue: complaintService }]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ComplaintListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should list the complaints', () => {
      expect(fixture.nativeElement.querySelectorAll('mat-card').length).toBe(complaints.length);
    });

    it('should display the first complaint correctly', () => {
      const nativeElement = fixture.nativeElement;
      const complaint = complaints[0];

      expect(nativeElement.querySelector('#subject').textContent).toBe(complaint.subject);
      expect(nativeElement.querySelector('#name').textContent).toBe(complaint.name);
      expect(nativeElement.querySelector('#email').textContent).toBe(complaint.email);
      expect(nativeElement.querySelector('#phoneNumber').textContent).toBe(complaint.phoneNumber);
      expect(nativeElement.querySelector('img').height).not.toBe(0);
    });

    it('should navigate to the new complaint page', fakeAsync(() => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('[mat-fab]');
      button.click();
      tick();
      const location: Location = TestBed.get(Location);
      expect(location.path()).toEqual('/edit');
    }));

    it('should navigate to the complaint edit page', fakeAsync(() => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('[mat-button]');
      button.click();
      tick();
      const location: Location = TestBed.get(Location);
      expect(location.path()).toEqual(`/edit?id=${complaints[0].id}`);
    }));
  });

});
