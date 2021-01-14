import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';

/**
 * The application's routes including a default redirection route in case of entering an unknown route.
 */
const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: '**', redirectTo: '' },
];

/**
 * Module for managing the application's routing logic.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
