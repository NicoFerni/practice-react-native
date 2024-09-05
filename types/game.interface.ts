export interface Game {
  id: string;
  name: string;
  image: { medium_url: string };
  platforms: string[]; // Change this to string[]
  original_release_date: string;
  description: string;
  deck: string;
}

export interface Platform {
  id: string;
  name: string;
}
