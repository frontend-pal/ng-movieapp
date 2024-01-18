import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component'; // Adjust the import path based on your component location
import { MoviedbService } from 'src/app/core/services/moviedb.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let moviedbService: MoviedbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      providers: [MoviedbService],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
    });

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    moviedbService = TestBed.inject(MoviedbService);

    fixture.detectChanges();
  });

  it('should create SearchBoxComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendSearch with the correct value when input is not empty', fakeAsync(() => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('.search-input');
    spyOn(component, 'sendSearch');

    inputElement.value = 'TestValue';
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter', bubbles: true }));
    tick(); 
    fixture.detectChanges();

    expect(component.sendSearch).toHaveBeenCalledWith('TestValue');
  }));

  it('should call sendSearch with the correct value when input is null or empty', fakeAsync(() => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('.search-input');
    spyOn(component, 'sendSearch');

    inputElement.value = '';
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter', bubbles: true }));
    tick(); 
    fixture.detectChanges();

    expect(component.sendSearch).toHaveBeenCalledWith('');
  }));

  it('should emit empty search value on input change when the value is empty', fakeAsync(() => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');

    spyOn(moviedbService, 'setSearch');

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    tick();

    expect(moviedbService.setSearch).toHaveBeenCalledWith('');
  }));

  it('should emit empty search value on modelChanged when the value is empty', () => {
    spyOn(moviedbService, 'setSearch');

    component.modelChanged('');

    expect(moviedbService.setSearch).toHaveBeenCalledWith('');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
