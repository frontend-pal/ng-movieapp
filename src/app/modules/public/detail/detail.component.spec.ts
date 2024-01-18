import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailComponent } from './detail.component';
import { of } from 'rxjs';
import { MoviedbService } from 'src/app/core/services/moviedb.service';
import { DUMMY_MOVIE_DETAIL, TVGENRES } from 'src/app/mock/mock-data.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ParamMap } from '@angular/router';

describe('DetailComponent', () => {
  let fixture: ComponentFixture<DetailComponent>;
  let component: DetailComponent;
  let moviedbService: MoviedbService;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(() => {
    const routeMock = {
      paramMap: of({
        get: jasmine.createSpy('get').and.returnValue('mockProductId'),
      }),
    };
    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        MoviedbService,
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ]
    });

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    moviedbService = TestBed.inject(MoviedbService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should initialize the component', () => {
    // Mocking the getGenres method to return observable data
    spyOn(moviedbService, 'getGenres').and.returnValue(of(TVGENRES));

    // Mocking the getProductDetail method to return observable data
    spyOn(moviedbService, 'getProductDetail').and.returnValue(of(DUMMY_MOVIE_DETAIL));

    // Trigger ngOnInit
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(moviedbService.getGenres).toHaveBeenCalledWith('movie');
    expect(moviedbService.getGenres).toHaveBeenCalledWith('tv');
    expect(moviedbService.getProductDetail).toHaveBeenCalled();
  });

  it('should handle goBack method', () => {
    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  // Add more tests as needed

  afterEach(() => {
    fixture.destroy();
  });
});
