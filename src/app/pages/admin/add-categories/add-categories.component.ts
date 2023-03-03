import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  categoria = {
    titulo: '',
    descripcion:''
  }

  constructor(private categoriaService:CategoryService, private snack:MatSnackBar, private router:Router){}

  ngOnInit(): void {

  }

  formSubmit(){
    if (this.categoria.titulo.trim() == '' || this.categoria.titulo == null){
      this.snack.open("El título es requerido",'',{duration:3000});
      return;
    }
    this.categoriaService.agregarCategoría(this.categoria).subscribe(
      (data:any) => {
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        Swal.fire('Categoria agregada', 'La categoría ha sido agregada con éxito', 'success');
        this.router.navigate(['admin/categorias'])
      }, (error) => {
        console.log(error);
        Swal.fire ('Error', 'Error al guardar la categoría', 'error');
      }
    )
  }
}
