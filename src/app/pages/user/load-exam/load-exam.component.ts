import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-load-exam',
  templateUrl: './load-exam.component.html',
  styleUrls: ['./load-exam.component.css'],
})
export class LoadExamComponent implements OnInit {
  catId: any;
  examenes: any;

  constructor(
    private route: ActivatedRoute,
    private examenService: ExamService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        console.log('Cargando todos los exámenes');
        this.examenService.obtenerExamenesActivos().subscribe(
          (data) => {
            this.examenes = data;
            console.log(this.examenes);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log('Cargando un examen en específico');
        this.examenService.obtenerExamenesActivosDeUnaCategoria(this.catId).subscribe(
          (data: any) => {
            this.examenes = data;
            console.log(this.examenes);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
