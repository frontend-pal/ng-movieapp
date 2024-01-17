import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { sessionPersistence } from '../../utils/session-persistence';
import { Genre } from '../models/Genre';
import { MovieDetail } from '../models/MovieDetail';
import { ProductType } from '../models/ProductType';
import { tmdbResponse } from '../models/Result';
import { TVShowDetail } from '../models/TvShowDetail';
import { Filter } from '../models/Filter';

@Injectable({ providedIn: 'root' })
export class MoviedbService {
  private _searchString = new Subject<string>();
  private _filter = new Subject<Filter>();
  private _selectedTab = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  public get filter() {
    return this._filter;
  }

  public get selectedTab() {
    return this._selectedTab;
  }

  public get searchString() {
    return this._searchString;
  }

  setFilter(filter: Filter) {
    this._filter.next(filter);
  }

  setSelectedTab(tabName: string) {
    this._selectedTab.next(tabName);
  }

  setSearch(searchText: string) {
    this._searchString.next(searchText);
  }

  getTrending(type: ProductType = 'movie', page = 1, genre = '', sort_by = 'popularity.desc', lang = 'es-MX'): Observable<tmdbResponse> {
    const objParams = {
      language: lang,
      page: page,
      sort_by: sort_by,
      with_genres: genre
    };
    const params = new HttpParams({ fromObject: objParams });

    return this.http.get<tmdbResponse>(`${environment.apiUrl}discover/${type}`, { params });
  }

  getProductDetail(productId: string, type: ProductType = 'movie', lang = 'es-MX'): Observable<MovieDetail | TVShowDetail> {
    const objParams = {
      language: lang
    };
    const params = new HttpParams({ fromObject: objParams });

    return this.http.get<MovieDetail | TVShowDetail>(`${environment.apiUrl}${type}/${productId}`, { params });
  }

  getGenres(type: ProductType = 'movie', lang = 'es-MX'): Observable<Genre[]> {
    let response: Genre[] = [];

    return new Observable<Genre[] | []>(obs => {
      let params = new HttpParams().set('language', lang);

      if (sessionPersistence.get(type + 'genres') === null) {
        this.http.get<{ genres: Genre[] }>(`${environment.apiUrl}genre/${type}/list`, { params }).subscribe(res => {
          sessionPersistence.set(type + 'genres', res.genres);
          response = sessionPersistence.get(type + 'genres');
          obs.next(response);
          obs.complete();
        });
      } else {
        response = sessionPersistence.get(type + 'genres');
        obs.next(response);
        obs.complete();
      }
    });
  }

  searchProduct(query: string, type: ProductType = 'movie', page: number = 1, genre = '', sort_by = 'popularity.desc', lang = 'es'): Observable<tmdbResponse> {
    const objParams = {
      query: query,
      page: page,
      language: lang,
      include_adult: 'false',
      sort_by: sort_by,
      with_genres: genre
    };
    const params = new HttpParams({ fromObject: objParams });

    return this.http.get<tmdbResponse>(`${environment.apiUrl}search/${type}`, { params });
  }
}
