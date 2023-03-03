import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css'],
})
export class UpdateExamComponent implements OnInit {
  examenId = 0;
  examen: any;
  categorias: any;

  constructor(
    private route: ActivatedRoute,
    private examenService: ExamService,
    private categoriaService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.examenService.obtenerExamen(this.examenId).subscribe(
      (data) => {
        this.examen = data;
        console.log(this.examen);
      },
      (error) => {
        console.log(error);
      }
    );
    this.categoriaService.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },
      (error) => {
        alert('Error al cargar las categorías');
      }
    );
  }

  public actualizarDatos() {
    this.examenService.actualizarExamen(this.examen).subscribe(
      (data) => {
        Swal.fire(
          'Examen actualizado',
          'El examen ha sido actualizado con éxito',
          'success'
        ).then((e) => {
          this.router.navigate(['/admin/examenes']);
        });
       },
      (error) => {
        Swal.fire(
          'Error en el sistema',
          'No se ha podido acualizar el examen',
          'error'
        );
        console.log(error);
      }
    );
  }
}
