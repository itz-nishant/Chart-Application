import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Sale } from 'src/app/models/sale'; 

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  sales: Sale[] = [];
  barChartData: any[] = [];
  pieChartData: any[] = [];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesService.getAllSales().subscribe(sales => {
      this.sales = sales;
      this.prepareBarChartData();
      this.preparePieChartData();
    });
  }

  // Prepare bar chart data for ngx-charts
  prepareBarChartData(): void {
    this.barChartData = this.sales.map(sale => {
      return {
        name: sale.product,
        value: sale.revenue
      };
    });
  }

  // Prepare pie chart data for ngx-charts
  preparePieChartData(): void {
    this.pieChartData = this.sales.map(sale => {
      return {
        name: sale.product,
        value: sale.revenue
      };
    });
  }
}
