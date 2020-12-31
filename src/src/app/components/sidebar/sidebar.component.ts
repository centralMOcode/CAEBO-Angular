import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  page: number;

  constructor() { }

  ngOnInit(): void {
  }

  setPage(page: number) {
    this.page = page;
  }
}
