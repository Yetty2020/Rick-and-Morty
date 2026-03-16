export interface Character {
    id: number;
    name: string;
    species: string;
    gender: string;
    image: string;
    status: string;
}

export interface info{
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
}


export interface FilterCharacter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}
// to define the shape of the Graphql response
export interface CharactersResponse {
    characters: {
        info: info;
        results: Character[];
    }
}

// to define the characters being sent to the query
export interface CharactersVars {
    page: number;
    filter?: FilterCharacter;
}