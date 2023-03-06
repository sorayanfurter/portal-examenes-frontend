import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  categorias:any;

  constructor(
    private categoriaService:CategoryService,
    private snack:MatSnackBar
  ){}

  ngOnInit():void{
    this.categoriaService.listarCategorias().subscribe(
      (data:any)=> {
        this.categorias = data;
      },
      (error) => {
        this.snack.open('Error al cargar las categorías', '', {duration: 3000})
        console.log(error);
      }
    )

  }

}
