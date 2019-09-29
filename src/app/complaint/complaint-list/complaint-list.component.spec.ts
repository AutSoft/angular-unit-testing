import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplaintListComponent } from './complaint-list.component';
import { ComplaintService } from '../complaint.service';
import { Complaint } from '../complaint';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ComplaintListComponent', () => {
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
      // TODO
    });

  });

  describe('with view', () => {
    let fixture: ComponentFixture<ComplaintListComponent>;

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
          RouterTestingModule
        ],
        declarations: [ComplaintListComponent],
        providers: [{ provide: ComplaintService, useValue: complaintService }]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ComplaintListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should list the complaints - TODO', () => {
      // TODO
    });

    it('should display the first complaint correctly - TODO', () => {
      // TODO
    });

    it('should navigate to the new complaint page - TODO', () => {
      // TODO
    });

    it('should navigate to the complaint edit page - TODO', () => {
      // TODO
    });
  });

});
