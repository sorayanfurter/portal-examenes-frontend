import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  examenId: any;
  examen: any = new Object();

  constructor(
    private examenService: ExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.examenId = this.route.snapshot.params['examenId'];
    this.examenService.obtenerExamen(this.examenId).subscribe(
      (data: any) => {
        console.log(data);
        this.examen = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  empezarExamen(){
    Swal.fire({
      title: '¿Quieres comenzar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Empezar',
      icon: 'info'
    }).then((result:any) => {
      if(result.isConfirmed){
        this.router.navigate(['/start/'+this.examenId]);
      }
    })
  }
}

/*if (result.isConfirmed&& this.examenId.preguntas<0) {
        this.router.navigate(['/start/' + this.examenId]);
      }else{
        Swal.fire({
          title: 'No hay preguntas disponibles para este examen'
        })
      }*/
