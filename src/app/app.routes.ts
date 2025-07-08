import { Routes } from '@angular/router';
import { Rain } from './rain/rain';
import { Menu } from './menu/menu';
import { Random1 } from './random1/random1';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'menu' },
    {
        path:'rain',
        component: Rain
    },
    {
        path:'menu',
        component: Menu
    },
    {
        path:'random1',
        component: Random1
    },
];
