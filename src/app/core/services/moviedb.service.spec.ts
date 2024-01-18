import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { MoviedbService } from './moviedb.service';
import { tmdbResponse } from '../models/Result';
import { environment } from 'src/environments/environment';
import { MovieDetail } from '../models/MovieDetail';
import { TVShowDetail } from '../models/TvShowDetail';
import { sessionPersistence } from 'src/app/utils/session-persistence';
import { Genre } from '../models/Genre';
import { DUMMY_MOVIE_DETAIL, DUMMY_RESPONSE, TVGENRES } from 'src/app/mock/mock-data.mock';
import { Filter } from '../models/Filter';
import { ProductType } from '../models/ProductType';

describe('MoviedbService', () => {
  let service: MoviedbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviedbService],
    });
    service = TestBed.inject(MoviedbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the initial value for filter', () => {
    expect(service.filter).toBeDefined();
  });

  it('should return the initial value for selectedTab', () => {
    expect(service.selectedTab).toBeDefined();
  });

  it('should return the initial value for searchString', () => {
    expect(service.searchString).toBeDefined();
  });

  it('should set filter with the provided value', () => {
    const filterValue: Filter = {
      genre: '',
      sort_by: 'popularity.desc'
    };

    service.filter.subscribe(res => {
      expect(res).toEqual(filterValue);
    });

    service.setFilter(filterValue);
  });

  it('should set selectedTab with the provided value', () => {
    const tabName: string = 'series';

    service.selectedTab.subscribe(res => {
      expect(res).toEqual(tabName);
    });

    service.setSelectedTab(tabName);
  });

  it('should set searchString with the provided value', () => {
    const searchText: string = 'spiderman';

    service.searchString.subscribe(res => {
      expect(res).toEqual(searchText);
    });

    service.setSearch(searchText);
  });

  describe('getTrending', () => {
    it('should make a GET request for trending products', () => {
      const dummyResponse: tmdbResponse = DUMMY_RESPONSE;

      service.getTrending().subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}discover/movie?language=es-MX&page=1&sort_by=popularity.desc&with_genres=`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('getProductDetail', () => {
    it('should make a GET request for product details', () => {
      const productId = '123';
      const dummyResponse = DUMMY_MOVIE_DETAIL;

      service.getProductDetail(productId).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}movie/${productId}?language=es-MX`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('getGenres', () => {
    it('should return genres from session if available', () => {
      const type = 'movie';
      const lang = 'es-MX';
      const dummyGenres: Genre[] = TVGENRES;
  
      spyOn(sessionPersistence, 'get').and.returnValue(dummyGenres);
  
      service.getGenres(type, lang).subscribe(response => {
        expect(response).toEqual(dummyGenres);
      });
  
      // No HTTP request should be made in this case
      httpMock.expectNone(`${environment.apiUrl}genre/${type}/list`);
    });

    it('should make a GET request to get genres if not available in session', async(() => {
      const type = 'movie';
      const dummyGenres: Genre[] = TVGENRES;
      const dummyResponse = { genres: dummyGenres };
  
      // sessionPersistence.set(type + 'genres', dummyGenres);
      spyOn(sessionPersistence, 'get').and.returnValue(null);
      spyOn(sessionPersistence, 'set');
      
      service.getGenres(type).subscribe(response => {
        expect(response).not.toEqual(dummyGenres);
      });
      
      const req = httpMock.expectOne(`${environment.apiUrl}genre/${type}/list?language=es-MX`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
      
      // Verify that the genres are stored in the session
      expect(sessionPersistence.set).toHaveBeenCalledWith(`${type}genres`, dummyGenres);
    }));
  });

  describe('searchProduct', () => {
    it('should make a GET request for searching products', async(() => {
      const query = 'example';
      const type: ProductType = 'movie';
      const page = 1;
      const genre = '';
      const sort_by = 'popularity.desc';
      const lang = 'es';
      const dummyResponse: tmdbResponse = DUMMY_RESPONSE;

      service.searchProduct(query, type, page, genre, sort_by, lang).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}search/${type}?query=${query}&page=${page}&language=${lang}&include_adult=false&sort_by=${sort_by}&with_genres=${genre}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    }));
  });
});
