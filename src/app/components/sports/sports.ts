import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Authservice } from '../../../services/authservice';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Dialogbox } from '../dialogbox/dialogbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialog } from '../delete-dialog/delete-dialog';
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
  readonly dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

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

  openDialog(data?: dataSource): void {
    const dialogRef = this.dialog.open(Dialogbox, {
      minWidth: '500px',
      height: 'auto',
      data: data ?? null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const request$ =
        result.edit && result.id
          ? this.authService.updateSports({
              sports: result.name,
              id: result.id,
            })
          : this.authService.addSports({
              sports: result.name,
            });

      request$.subscribe({
        next: (res: any) => {
          this.snackBar.open(res, 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 1000,
          });
          this.loadSportsData();
        },
        error: (err: any) => {
          console.error(result.edit ? 'Update error' : 'Add error', err);
        },
      });
    });
  }
  openDialogDelete(id: string) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      minWidth: '500px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(id, 'result');
      this.authService.deleteSports(id).subscribe({
        next: (res: any) => {
          this.snackBar.open(res, 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 1000,
          });
          this.loadSportsData();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    });
  }
}
