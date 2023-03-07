import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  examenId:any;
  preguntas:any;

  constructor(
    private locationSt: LocationStrategy,
    private route:ActivatedRoute,
    private preguntaService: PreguntaService
  ){

  }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    console.log(this.examenId);
    this.cargarPreguntas();

  }

  cargarPreguntas(){
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).subscribe(
      (data:any)=> {
        console.log(data);
        this.preguntas= data;
      },
      (error)=> {
      console.log(error);
      Swal.fire('Error', 'Error al cargar las pregutas de la prueba', 'error');
      }
    )
  }

  prevenirElBotonDeRetroceso(){
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(()=> {
      history.pushState(null, null!, location.href);
    })
  }
}
