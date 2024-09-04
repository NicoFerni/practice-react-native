export interface Platform {
  name: string;
}

export interface Game {
  id: string;
  name: string;
  image: {
    medium_url: string;
  };
  platforms: Platform[];
  original_release_date: string;
  description: string;
  deck: string;
}