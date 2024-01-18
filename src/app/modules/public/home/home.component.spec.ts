import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MoviedbService } from 'src/app/core/services/moviedb.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subject, of } from 'rxjs';
import { Filter } from 'src/app/core/models/Filter';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let moviedbService: MoviedbService;
  let searchStringSubject: Subject<string>;
  let filterSubject: Subject<Filter>;

  beforeEach(() => {
    searchStringSubject = new Subject<string>();
    filterSubject = new Subject<any>();

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
        MatTabsModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientTestingModule,
        MatTabsModule,
        NoopAnimationsModule,
        MatPaginatorModule
      ],
      providers: [
        MoviedbService
      ],
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    moviedbService = TestBed.inject(MoviedbService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initData on ngOnInit', () => {
    spyOn(component, 'initData');

    // Trigger ngOnInit
    component.ngOnInit();

    expect(component.initData).toHaveBeenCalled();
  });

  it('should call getGenres and updateData on initData', () => {
    const movieGenres = [{ id: 1, name: 'Action' }];
    const spyGenresMovie = spyOn(moviedbService, 'getGenres').and.returnValue(of(movieGenres));

    spyOn(component, 'updateData');

    component.initData();

    expect(spyGenresMovie).toHaveBeenCalled();
    expect(component.movieGenres).toEqual(movieGenres);
    expect(component.updateData).toHaveBeenCalled();
  });
});
