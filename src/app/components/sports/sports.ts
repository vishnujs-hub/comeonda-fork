import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Authservice } from '../../../services/authservice';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
interface dataSource {
  id: string;
  image_url: string;
  sports_name: string;
}
interface apiResponse {
  current_page: number;
  result: dataSource[];
  total_items: number;
}

@Component({
  selector: 'app-sports',
  standalone: false,
  templateUrl: './sports.html',
  styleUrl: './sports.scss',
})
export class Sports implements OnInit {
  tableColumns: string[] = ['Sl.No', 'Sports Name', 'Action'];
  authService = inject(Authservice);
  dataSource = new MatTableDataSource<dataSource>([]);
  pageSizeChanged!: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 50;
  currentPage = 1;
  pageSizeOptions = [10, 25, 50];

  private loadSportsData() {
    const data = {
      page: this.currentPage,
      size: this.pageSize,
      search: '',
    };

    this.authService.getSports(data).subscribe({
      next: (res: any) => {
        console.log('res', res);
        const newData = res.result || [];
        this.dataSource.data = newData;

        console.log('data', this.dataSource);
      },
      error: (err) => {
        console.error('Login error', err);
      },
    });
  }
  ngOnInit() {
    this.loadSportsData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
