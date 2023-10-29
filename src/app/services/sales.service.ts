// src/app/services/sales.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale'; 

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private salesUrl = 'http://localhost:3000/sales';

  constructor(private http: HttpClient) {}

  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.salesUrl);
  }

  getSaleById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.salesUrl}/${id}`);
  }

  addSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.salesUrl, sale);
  }

  updateSale(updatedSale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.salesUrl}/${updatedSale.id}`, updatedSale);
  }

  deleteSale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.salesUrl}/${id}`);
  }
}
