import { Genre } from "../core/models/Genre";
import { MovieDetail } from "../core/models/MovieDetail";
import { tmdbResponse } from "../core/models/Result";

export const DUMMY_MOVIE_DETAIL: MovieDetail = {
  adult: false,
  backdrop_path: "/dvNrgldueQciabkYmlCnyhmaPoO.jpg",
  belongs_to_collection: null,
  budget: 0,
  genres: [
    {
      id: 28,
      name: "Acción"
    },
    {
      id: 9648,
      name: "Misterio"
    },
    {
      id: 53,
      name: "Suspense"
    },
    {
      id: 27,
      name: "Terror"
    }
  ],
  homepage: "",
  id: 899445,
  imdb_id: "tt14865406",
  original_language: "en",
  original_title: "Deep Fear",
  overview: "Una mujer enfrenta peligros en las profundidades y en la superficie del mar cuando su viaje en solitario por el Caribe se convierte en una lucha por sobrevivir.",
  popularity: 1143.446,
  poster_path: "/9LaUR5873menyfDmE0i0UTFpdMx.jpg",
  production_companies: [
    {
      id: 164686,
      logo_path: "/f4YiwKcpmuNcoHxCUCIWZKABukX.png",
      name: "Brilliant Pictures",
      origin_country: "GB"
    },
    {
      id: 189103,
      logo_path: "/hu0qcD4k7kfWpdAewqmJSUyZPa7.png",
      name: "Ashland Hill Media Finance",
      origin_country: "US"
    },
    {
      id: 117747,
      logo_path: "/brD72VA95qgjCtGx0hJEAVUeldW.png",
      name: "Media Finance Capital",
      origin_country: "GB"
    },
    {
      id: 9987,
      logo_path: "/o5OTKAw7Acl5fTZYPyl8M8D9570.png",
      name: "Lipsync Productions",
      origin_country: "GB"
    },
    {
      id: 211553,
      logo_path: 'null',
      name: "Dark Shark Film",
      origin_country: "GB"
    },
    {
      id: 104,
      logo_path: "/9aotxauvc9685tq9pTcRJszuT06.png",
      name: "Canal+",
      origin_country: "FR"
    }
  ],
  production_countries: [
    {
      iso_3166_1: "FR",
      name: "France"
    },
    {
      iso_3166_1: "GB",
      name: "United Kingdom"
    },
    {
      iso_3166_1: "US",
      name: "United States of America"
    }
  ],
  release_date: "2023-10-18",
  revenue: 0,
  runtime: 85,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English"
    }
  ],
  status: "Released",
  tagline: "",
  title: "Terror en el mar",
  video: false,
  vote_average: 4.948,
  vote_count: 48
};

export const DUMMY_RESPONSE: tmdbResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/f1AQhx6ZfGhPZFTVKgxG91PhEYc.jpg",
      genre_ids: [
        36,
        10752,
        18
      ],
      id: 753342,
      media_type: 'test',
      original_language: "en",
      original_title: "Napoleon",
      overview: "Una mirada personal a los orígenes del líder militar francés y su rápido y despiadado ascenso a emperador. La historia se ve a través de la lente de la relación adictiva y volátil de Napoleón Bonaparte con su esposa y único amor verdadero, Josefina.",
      popularity: 2367.318,
      poster_path: "/re6SSQS1HgBGG9AMiNuPGISOfMx.jpg",
      release_date: "2023-11-22",
      title: "Napoleón",
      video: false,
      vote_average: 6.5,
      vote_count: 1193
    }
  ],
  total_pages: 1,
  total_results: 1
};

export const TVGENRES: Genre[] = [
  {
    id: 10759,
    name: "Action & Adventure"
  },
  {
    id: 16,
    name: "Animación"
  },
  {
    id: 35,
    name: "Comedia"
  },
  {
    id: 80,
    name: "Crimen"
  },
  {
    id: 99,
    name: "Documental"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Familia"
  },
  {
    id: 10762,
    name: "Kids"
  },
  {
    id: 9648,
    name: "Misterio"
  },
  {
    id: 10763,
    name: "News"
  },
  {
    id: 10764,
    name: "Reality"
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy"
  },
  {
    id: 10766,
    name: "Soap"
  },
  {
    id: 10767,
    name: "Talk"
  },
  {
    id: 10768,
    name: "War & Politics"
  },
  {
    id: 37,
    name: "Western"
  }
];

export interface MockKeyboardEvent extends Event {
  key: string;
  code: string;
  target: EventTarget & { value: string }; // Assuming you want to extract 'value' from the target
}

export const createMockKeyboardEvent = (key: string, code: string, value: string): MockKeyboardEvent => {
  const event = document.createEvent('Event') as MockKeyboardEvent;
  event.initEvent('keydown', true, true);
  event.key = key;
  event.code = code;
  event.target = { value } as EventTarget & { value: string };
  return event;
};
