import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
query GetCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    info {
      count
      pages
      next
      prev
    }
    results {
      name
      species
      gender
      id
      image
      status
      location{
        name
      }
    }
  }
  
 
}
`;