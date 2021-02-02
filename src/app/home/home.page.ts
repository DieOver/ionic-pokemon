import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  countPokemon = 151;
  pokemons: any[] = [];

  constructor(
    private loading: LoadingController
  ) {}

  getColor = (colorName: string) => {
    let color: string;
    switch (colorName) {
      case 'grass': color = '#209483'; break;
      case 'fire': color = '#ee6239'; break;
      case 'water': color = '#5a9ca4'; break;
      case 'bug': color = '#31ac41'; break;
      case 'normal': color = '#a4625a'; break;
      case 'poison': color = '#cd62b4'; break;
      case 'electric': color = '#f6e652'; break;
      case 'ground': color = '#cdb400'; break;
      case 'fairy': color = '#ffd5bd'; break;
      case 'fighting': color = '#d5ac9c'; break;
      case 'psychic': color = '#ffe629'; break;
      case 'rock': color = '#9c9483'; break;
      case 'ghost': color = '#d5accd'; break;
      case 'ice': color = '#add8e6'; break;
      case 'dragon': color = '#de7339'; break;
      default: color = '#444444'; break;
    }
    return color;
  }

  getAll151Pokemons = async () => {
    console.log('Start', new Date());
    const loading = await this.loading.create({
      message: 'Carregando....'
    });
    await loading.present();
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.countPokemon}`)
      .then(async (response) => {
        let i = 1;
        const allpokemon = (await response.json()).results;
        const auxPokemons: any[] = [];
        for (const pokemon of allpokemon) {
          loading.message = `Carregando Pokemon ${i}/${this.countPokemon}`;
          const pokeData: any = await this.fetchPokemonData(pokemon);
          pokeData.color = pokeData.types?.length ? pokeData.types[0].type.name : 'default';
          auxPokemons.push(pokeData);
          i++;
        }
        this.pokemons = auxPokemons;
        await loading.dismiss();
        console.log('End', new Date(), this.pokemons);
      })
      .catch(async (_) => {
        this.pokemons = [];
        await loading.dismiss();
        console.error('End Error', new Date());
      });
  }

  fetchPokemonData = (pokemon: any) => {
    return new Promise((resolve, reject) => {
      fetch(pokemon.url)
        .then(async (response) => {
          const pokeData = await response.json();
          resolve(pokeData);
        })
        .catch(_ => reject());
    });
  }

  async ngOnInit() {
    this.getAll151Pokemons();
  }

}
