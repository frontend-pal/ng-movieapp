import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Filter } from 'src/app/core/models/Filter';
import { Genre } from 'src/app/core/models/Genre';
import { MoviedbService } from 'src/app/core/services/moviedb.service';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  filterForm: FormGroup = new FormGroup({
    genre: new FormControl(''),
    sort_by: new FormControl('popularity.desc')
  });
  genres: Genre[] = [];
  sortByItems = [
    {
      name: 'Popularity Desecending',
      value: 'popularity.desc'
    },
    {
      name: 'Popularity Ascending',
      value: 'popularity.asc'
    },
    {
      name: 'Rating Desecending',
      value: 'vote_average.desc'
    },
    {
      name: 'Rating Ascending',
      value: 'vote_average.asc'
    },
    {
      name: 'Release Date Desecending',
      value: 'primary_release.desc'
    },
    {
      name: 'Release Date Ascending',
      value: 'primary_release.asc'
    },
    {
      name: 'Title A-Z',
      value: 'revenue.desc'
    },
    {
      name: 'Title Z-A',
      value: 'revenue.asc'
    }
  ];
  movieGenres: Genre[] = [{
    id: 0,
    name: ''
  }];
  tvGenres: Genre[] = [];
  selectedTab: string = 'series';

  constructor(private moviedbService: MoviedbService) { }

  ngOnInit(): void {
    this.initData();
    this.filterForm.valueChanges.subscribe(value => {
      this.sendSearch(value)
    });

    this.moviedbService.selectedTab.subscribe(tabName => {
      this.selectedTab = tabName;
      this.filterForm.get('genre')?.patchValue('');
      this.updateGenres();
    })
  }

  sendSearch(value: Filter): void {
    this.moviedbService.setFilter(value);
  }

  initData() {
    this.moviedbService.getGenres('movie').subscribe(res => {
      this.movieGenres = res;

      this.moviedbService.getGenres('tv').subscribe(res => {
        this.tvGenres = res;

        this.updateGenres();
      });
    });
  }

  updateGenres() {
    if (this.selectedTab === 'series') {
      this.genres = this.tvGenres;
    } else {
      this.genres = this.movieGenres;
    }
  }
}
