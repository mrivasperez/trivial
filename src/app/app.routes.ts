import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameOptionsComponent } from './game-options/game-options.component';

export const routes: Routes = [
  { path: '', component: GameOptionsComponent },
  { path: 'game', component: GameComponent },
];
