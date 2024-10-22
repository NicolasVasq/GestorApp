import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-comienzo',
  templateUrl: './comienzo.page.html',
  styleUrls: ['./comienzo.page.scss'],
})
export class ComienzoPage implements OnInit { 

  correo:String="";
  pass:String="";

  constructor(private alertcontroller:AlertController,
              private router:Router) { }

  ngOnInit() {
  }
  
  async login(){
    /*codificar una alerta*/
    const alert = await this.alertcontroller.create({
      header: 'Logeado!',
      mode:'ios',
      message:'Bienvenido a Mi App '+this.correo,
      buttons: [
        {
          text: 'Ingresar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          },
        },
      ],
    });

    await alert.present();
  }

  recuperarContrasena(){
    this.router.navigate(['/recuperar']);
  }

  irARegistro(){
    this.router.navigate(['/registro']);
  }
}
