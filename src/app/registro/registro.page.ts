import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  registrarse(){
    this.router.navigate(['/recuperar']);
  }
  irAIniciarSesion(){
    this.router.navigate(['/inicio']);
  }
}
