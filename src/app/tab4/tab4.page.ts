import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  eventos: any[] = [];

  constructor(private http: HttpClient,
              private router:Router
  ) {}

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.http.get<any[]>('http://localhost:3000/eventos')
      .subscribe(response => {
        this.eventos = response;
      }, error => {
        console.error('Error al obtener eventos', error);
      });
  }
  regresar(){
    this.router.navigate(['/tabs/tab2'])
  }
}
