import { Component } from '@angular/core';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private routeroutlet: RouterOutlet ){}

}
