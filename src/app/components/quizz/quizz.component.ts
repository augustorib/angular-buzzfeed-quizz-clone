import { Component, OnInit } from '@angular/core';
import pokemon_questions from "../../../assets/data/pokemon_questions.json"
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemonData';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false
  spriteToLoad:string = ""

  bulbasaur:Pokemon ={
    id:0,
    name: "",
    types: [],
    sprites:{
      front_default: ""
    }
  }

  squirtle:Pokemon ={
    id:0,
    name: "",
    types: [],
    sprites:{
      front_default: ""
    }
  }

  charmander:Pokemon ={
    id:0,
    name: "",
    types: [],
    sprites:{
      front_default: ""
    }
  }

  constructor(private service:PokemonService) {

    //Bulbasaur
    service.getQuestion("1").subscribe({
      next: (res) => {
        
        this.bulbasaur.id = res.id;
        this.bulbasaur.name = res.name;
        this.bulbasaur.types = res.types;
        this.bulbasaur.sprites.front_default = res.sprites.front_default
      },
      error: err => console.log(err)
    });

    //Charmander
    service.getQuestion("4").subscribe({
      next: (res) => {
        
        this.charmander.id = res.id;
        this.charmander.name = res.name;
        this.charmander.types = res.types;
        this.charmander.sprites.front_default = res.sprites.front_default
      },
      error: err => console.log(err)
    });
    
    //Squirtle
    service.getQuestion("7").subscribe({
      next: (res) => {
        
        this.squirtle.id = res.id;
        this.squirtle.name = res.name;
        this.squirtle.types = res.types;
        this.squirtle.sprites.front_default = res.sprites.front_default
      },
      error: err => console.log(err)
    });
  }

  ngOnInit(): void {
    if(pokemon_questions){
      this.finished = false
      this.title = pokemon_questions.title

      this.questions = pokemon_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }

  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = pokemon_questions.results[finalAnswer as keyof typeof pokemon_questions.results ]
    }
  }

  async checkResult(anwsers:string[]){

    const anwserA = anwsers.filter( item => item == "A").length;
    const anwserB = anwsers.filter( item => item == "B").length;
    const anwserC = anwsers.filter( item => item == "C").length;

    const highOcurrency = Math.max(anwserA, anwserB, anwserC)

    let result:string  = ""

    switch (highOcurrency){
      case anwserA :
        result = "A";
        this.spriteToLoad = this.squirtle.sprites.front_default;
        break;
      case anwserB :
        result = "B";
        this.spriteToLoad = this.bulbasaur.sprites.front_default;
        break;
      case anwserC :
        result = "C";
        this.spriteToLoad = this.charmander.sprites.front_default;
        break
      default: 
        result = "D"
    }
        
    return result
  }

}
