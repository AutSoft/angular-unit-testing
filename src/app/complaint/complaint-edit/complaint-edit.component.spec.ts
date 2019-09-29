import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ComplaintEditComponent } from './complaint-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBar
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComplaintService } from '../complaint.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable, Observer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NewComplaint } from '../new-complaint';
import { Complaint } from '../complaint';

let writeValue;
let fillForm;
let init;

describe('ComplaintEditComponent', () => {
  let component: ComplaintEditComponent;
  let fixture: ComponentFixture<ComplaintEditComponent>;
  let complaintService;
  let snackBar;
  let nameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let phoneInput: HTMLInputElement;
  let subjectInput: HTMLInputElement;
  let contentInput: HTMLInputElement;
  let imageUrlInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let newComplaint: NewComplaint;
  let complaint: Complaint;
  let saveComplaintObserver: Observer<Complaint>;
  let updateComplaintObserver: Observer<Complaint>;
  let updatedComplaint: Complaint;
  let mockActivatedRoute: { queryParams: Observable<{ id?: string }> };
  let mockRouter;

  beforeEach(() => {
    newComplaint = {
      subject: 'Toilets are messy',
      content: 'The first floor toilets look dreadful',
      name: 'Archie Webb',
      email: 'archie.webb@email.com',
      phoneNumber: '+1-202-555-0115',
      imageSource: 'https://source.unsplash.com/random/800x600'
    };
    complaint = { id: 0, ...newComplaint };
    complaintService = jasmine.createSpyObj('ComplaintService', ['getComplaint', 'saveComplaint', 'updateComplaint']);
    complaintService.saveComplaint.and.returnValue(Observable.create(observer => (saveComplaintObserver = observer)));
    complaintService.getComplaint.and.returnValue(of(new Complaint(complaint)));
    complaintService.updateComplaint.and.callFake(param => {
      updatedComplaint = param;
      return Observable.create(observer => (updateComplaintObserver = observer));
    });
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = { queryParams: of( {} ) };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintEditComponent],
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ComplaintService, useValue: complaintService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  describe('without query param', () => {

    beforeEach(() => {
      init();
      return fixture.whenStable();
    });

    it('should be empty', () => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(phoneInput.value).toBe('');
      expect(subjectInput.value).toBe('');
      expect(contentInput.value).toBe('');
      expect(imageUrlInput.value).toBe('');
    });

    it('should only be submitted if form is valid - TODO', () => {
      // TODO
    });

    it('should save the complaint', () => {
      fillForm(newComplaint);
      submitButton.click();

      expect(complaintService.saveComplaint).toHaveBeenCalledWith(new NewComplaint(newComplaint));
      saveComplaintObserver.next(new Complaint(complaint));
      expect(snackBar.open).toHaveBeenCalledWith('Complaint saved', 'OK');
    });

    it('should not submit the form if there is a save in progress', () => {
      fillForm(newComplaint);
      submitButton.click();

      expect(submitButton.disabled).toBe(true);
    });

    it('should tell whether there are any unsaved changes or not', () => {
      expect(component.hasUnsavedChanges()).toBe(false);
      writeValue(nameInput, 'test');
      expect(component.hasUnsavedChanges()).toBe(true);
    });
  });

  describe('with query param', () => {

    beforeEach(() => {
      TestBed.get(ActivatedRoute).queryParams = of({ id: complaint.id.toString() });
      init();
      return fixture.whenStable();
    });

    it('should load the component into the form', () => {
      expect(nameInput.value).toBe(newComplaint.name);
      expect(emailInput.value).toBe(newComplaint.email);
      expect(phoneInput.value).toBe(newComplaint.phoneNumber);
      expect(subjectInput.value).toBe(newComplaint.subject);
      expect(contentInput.value).toBe(newComplaint.content);
      expect(imageUrlInput.value).toBe(newComplaint.imageSource);
    });

    it('should be submitted', () => {
      expect(submitButton.disabled).toBe(false);
    });

    it('should update the complaint', () => {
      submitButton.click();

      expect(complaintService.updateComplaint).toHaveBeenCalledWith(complaint.id, new Complaint(complaint));
      updateComplaintObserver.next(updatedComplaint);
      expect(snackBar.open).toHaveBeenCalled();
    });
  });

  writeValue = (input: HTMLInputElement, value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  fillForm = (source: NewComplaint) => {
    writeValue(nameInput, source.name);
    writeValue(emailInput, source.email);
    writeValue(phoneInput, source.phoneNumber);
    writeValue(subjectInput, source.subject);
    writeValue(contentInput, source.content);
    writeValue(imageUrlInput, source.imageSource);
  };

  init = () => {
    fixture = TestBed.createComponent(ComplaintEditComponent);
    component = fixture.componentInstance;

    nameInput = fixture.nativeElement.querySelector('[name="name"]');
    emailInput = fixture.nativeElement.querySelector('[name="email"]');
    phoneInput = fixture.nativeElement.querySelector('[name="phoneNumber"]');
    subjectInput = fixture.nativeElement.querySelector('[name="subject"]');
    contentInput = fixture.nativeElement.querySelector('[name="content"]');
    imageUrlInput = fixture.nativeElement.querySelector('[name="imageSource"]');
    submitButton = fixture.nativeElement.querySelector('#submit');
  };
});
