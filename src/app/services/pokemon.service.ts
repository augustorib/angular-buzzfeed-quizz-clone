import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pokemon } from '../models/pokemonData'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private baseUrl:string = ""
  

  constructor(private http:HttpClient) { 

    this.baseUrl = environment.pokeAPI
   
  }

  getQuestion(pokemonId:string):Observable<Pokemon> {
    
   return this.http.get<Pokemon>(this.baseUrl + pokemonId)
  
  } 


}
