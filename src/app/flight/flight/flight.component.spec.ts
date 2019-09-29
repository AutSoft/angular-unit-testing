import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightComponent } from './flight.component';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Flight } from '../flight.model';

@Component({ selector: 'szia-flight-stop-details', template: '' })
class FlightStopDetailsStubComponent {
  @Input() city: string;
  @Input() airportCode: string;
  @Input() time: string;
  @Input() airportName: string;
}

describe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  let mockActivatedRoute: { data: Observable<{ flight: Flight }> };
  const flight = {
    flightNumber: 'LY 8045',
    departure: 'South Zubogy International Airport',
    arrival: 'Heatrow Airport',
    departureCity: 'South Zubogy',
    departureCode: 'SZU',
    arrivalCity: 'London',
    arrivalCode: 'LHR',
    departureTime: '2019-03-16T14:15:00.000Z',
    arrivalTime: '2019-03-16T16:35:00.000Z',
    status: 'Boarding',
    checkinDeskNumber: 17,
    gateNumber: 22,
    delay: 0,
    comment: 'El Al',
    id: 1,
    airlineId: 2
  };

  beforeEach(async(() => {
    mockActivatedRoute = { data: of({ flight }) };
    TestBed.configureTestingModule({
      declarations: [FlightComponent, FlightStopDetailsStubComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(FlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display flight details correctly', () => {
    expect(fixture.nativeElement.querySelector('#flightNumber').textContent).toBe(flight.flightNumber);
    expect(fixture.nativeElement.querySelector('#status').textContent).toBe(flight.status);
    expect(fixture.nativeElement.querySelector('#comment').textContent).toBe(flight.comment);
    expect(fixture.nativeElement.querySelector('#delay').textContent).toBe(flight.delay.toString());

    const fromFixture = fixture.debugElement.query(By.css('#from'))
      .injector.get<FlightStopDetailsStubComponent>(FlightStopDetailsStubComponent);
    expect(fromFixture.airportCode).toBe(flight.departureCode);
    expect(fromFixture.airportName).toBe(flight.departure);
    expect(fromFixture.city).toBe(flight.departureCity);
    expect(fromFixture.time).toBe(flight.departureTime);

    const toFixture = fixture.debugElement.query(By.css('#to'))
      .injector.get<FlightStopDetailsStubComponent>(FlightStopDetailsStubComponent);
    expect(toFixture.airportCode).toBe(flight.arrivalCode);
    expect(toFixture.airportName).toBe(flight.arrival);
    expect(toFixture.city).toBe(flight.arrivalCity);
    expect(toFixture.time).toBe(flight.arrivalTime);
  });
});
