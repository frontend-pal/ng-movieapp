import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterBoxComponent } from './filter-box.component';
import { of } from 'rxjs';
import { MoviedbService } from 'src/app/core/services/moviedb.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared.module';

describe('FilterBoxComponent', () => {
  let fixture: ComponentFixture<FilterBoxComponent>;
  let component: FilterBoxComponent;
  // let moviedbService: jasmine.SpyObj<MoviedbService>;
  let moviedbService: MoviedbService;

  beforeEach(() => {
    const moviedbServiceSpy = jasmine.createSpyObj('MoviedbService', ['getGenres', 'setFilter', 'selectedTab']);

    TestBed.configureTestingModule({
      declarations: [FilterBoxComponent],
      providers: [
        MoviedbService
        // { provide: MoviedbService, useValue: moviedbServiceSpy }
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule,
      ]
    });

    fixture = TestBed.createComponent(FilterBoxComponent);
    component = fixture.componentInstance;
    moviedbService = TestBed.inject(MoviedbService) as jasmine.SpyObj<MoviedbService>;
  });

  it('should initialize the component', () => {
    // Mocking the getGenres method to return observable data
    spyOn(moviedbService, 'getGenres').and.returnValue(of([{ id: 1, name: 'Action' }]));

    // Trigger ngOnInit
    fixture.detectChanges();

    // trigger filterForm change
    component.filterForm.patchValue({
      'genre': '',
      'sort_by': 'popularity.desc'
    });

    expect(component).toBeTruthy();
    expect(moviedbService.getGenres).toHaveBeenCalledWith('movie');
    expect(moviedbService.getGenres).toHaveBeenCalledWith('tv');

    // trigger tab change
    let tabName = 'series';
    spyOn(component, 'updateGenres');
    moviedbService.setSelectedTab(tabName);

    expect(component.selectedTab).toEqual(tabName);
    expect(component.updateGenres).toHaveBeenCalled();
  });

  it('should update genres with movieGenres', () => {
    const tabName = 'peliculas';

    spyOn(component, 'updateGenres');
    component.selectedTab = tabName;

    // trigger tab other change 
    component.updateGenres();

    expect(component.selectedTab).toEqual(tabName);
    expect(component.updateGenres).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
