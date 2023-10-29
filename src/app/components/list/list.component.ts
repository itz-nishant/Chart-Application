import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { SalesService } from 'src/app/services/sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  sales: Sale[] = [];
  displayedColumns: string[] = ['product', 'quantity', 'revenue', 'actions'];
  isLoading: boolean = true;

  dataSource!: MatTableDataSource<Sale>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private saleService: SalesService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.isLoading = true;
    this.saleService.getAllSales().subscribe((data: Sale[]) => {
      this.sales = data;
      this.dataSource = new MatTableDataSource(this.sales);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editSale(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteSale(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this entry?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.deleteSale(id).subscribe(() => {
          this.loadSales();
        });
      }
    });
  }

  navigateToAddEdit(): void {
    this.router.navigate(['/add']);
  }
}
