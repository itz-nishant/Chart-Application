// src/app/add-edit/add-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/services/sales.service'; 
import { Sale } from 'src/app/models/sale'; 

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  isEditing: boolean = false;
  saleForm: FormGroup;
  sale: Sale = { id: 0, product: '', quantity: 0, revenue: 0, date: new Date() };

  constructor(
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.saleForm = this.formBuilder.group({
      product: ['', Validators.required],
      quantity: [0, Validators.required],
      revenue: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.salesService.getSaleById(id).subscribe(sale => {
        this.sale = sale;
        this.initializeForm();
      });
    } else {
      this.isEditing = false;
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.saleForm.setValue({
      product: this.sale.product,
      quantity: this.sale.quantity,
      revenue: this.sale.revenue
    });
  }

  submitForm(): void {
    const formData: Sale = this.saleForm.value;
    if (this.isEditing) {
      formData.id = this.sale.id;
      this.salesService.updateSale(formData).subscribe(() => {
        this.router.navigate(['/list']);
      });
    } else {
      this.salesService.addSale(formData).subscribe(() => {
        this.router.navigate(['/list']);
      });
    }
  }
}
