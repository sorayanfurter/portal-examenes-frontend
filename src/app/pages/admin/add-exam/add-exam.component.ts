import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent implements OnInit {
  categorias: any = [];

  examenData = {
    titulo: '',
    descripcion: '',
    puntosMaximos: '',
    numeroDePreguntas: '',
    activo: true,
    categoria: {
      categoriaId: '',
    },
  }

  constructor(private categoriaService: CategoryService, private snack:MatSnackBar, private examenService:ExamService, private router:Router ) {}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los datos', 'error');
      }
    )
  }

    guardarCuestionario(){
    console.log(this.examenData);
    if(this.examenData.titulo.trim()== '' || this.examenData.titulo == null){
    this.snack.open('El título es requerido', '', {duration:3000});
    return;
    }


    this.examenService.agregarExamen(this.examenData).subscribe(
    (data:any)=> {
      console.log(data);
      Swal.fire('Examen guardado', 'El examen ha sido guardado con éxito', 'success');
      this.examenData = {
        titulo:'',
        descripcion:'',
        puntosMaximos:'',
        numeroDePreguntas:'',
        activo:true,
        categoria:{
          categoriaId:''
        }
      }
      this.router.navigate(['admin/examenes']);
    },
    (error) => {
      Swal.fire('Error', 'Error al guardar el examen', 'error');
    }
  )
 }
}



