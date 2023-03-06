import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {

  examenId: any;
  titulo: any;
  preguntas: any = [];

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];

    this.preguntaService.listarPreguntasDeExamen(this.examenId).subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarPregunta(preguntaId:any){
  Swal.fire({
    title:'Eliminar pregunta',
    text:'¿Estas seguro, quieres eliminar esta pregunta?',
    icon:'warning',
    showCancelButton:true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText:'Cancelar'
  }).then((resultado)=> {
    if(resultado.isConfirmed){
      this.preguntaService.eliminarPregunta(preguntaId).subscribe(
        (data)=> {
          this.snack.open('Pregunta eliminada', '', {duration:3000});
          this.preguntas = this.preguntas.filter((pregunta:any) => pregunta.preguntaId != preguntaId);
        },
        (error) => {
          this.snack.open('Error al eliminar la pregunta', '', {
            duration:3000
          })
          console.log(error);
        }
      );
    }
  });

}

}
