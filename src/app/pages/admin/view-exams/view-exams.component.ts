import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit{

  examenes:any = [

  ]

  constructor(private examService:ExamService){}

  ngOnInit(): void {
    this.examService.listarCuestionarios().subscribe(
      (data:any) => {
        this.examenes = data;
        console.log(this.examenes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los exámenes', 'error');
      }
    )
  }

  eliminarExamen(examenId:any){
    Swal.fire({
      title:'Eliminar examen',
      text:'Estás seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.examService.eliminarExamen(examenId).subscribe(
          (data)=> {
            this.examenes = this.examenes.filter((examen:any)=> examen.examenId !=examenId);
            Swal.fire('Examen eliminado', 'El examen ha sido eliminado de la base de datos', 'success');
          },
          (error)=> {
            Swal.fire ('Error', 'Error al eliminar el examen', 'error');
          }
        )

      }
    })
  }

}
