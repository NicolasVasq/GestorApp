import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import {register} from 'swiper/element/bundle';

register();

interface Menu{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[
    {icon:'person-outline',
      name:'Mi perfil',
      redirecTo:'/perfil'}
    ,
    {icon:'calendar-outline',
      name:'Actualizar perfil',
      redirecTo:'/get-users'}
    ,
    
  ]

  constructor(private router:Router, private menuCtrl: MenuController) {}

  exitSess() {
    this.menuCtrl.close('first'); 
    this.router.navigate(['login']);
  }
}
