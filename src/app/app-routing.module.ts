import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GlassUIComponent } from './glass-ui/glass-ui.component';

const routes: Routes = [
  {
    path:'',
    component : AppComponent,
    children:[
      {
        path: '',
        component : GlassUIComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
