import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
    Camera.requestPermissions();
  }

  async leerQr(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    })
  }
  
  regresar(){
    this.router.navigate(['/tabs/tab2'])
  }
}
