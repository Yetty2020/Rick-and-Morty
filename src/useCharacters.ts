import { useQuery } from "@apollo/client/react"
import { GET_CHARACTERS } from "./queries"
import { type CharactersResponse, type CharactersVars } from "./types"

export const useCharacters (page: number, searchTerm: string = "") =>{
    return useQuery<CharactersResponse, CharactersVars>(GET_CHARACTERS, {
        variables: {
            page: page,
            filter: {
                name: searchTerm
            }
        }
    })

}