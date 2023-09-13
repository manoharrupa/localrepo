import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Status, TransactionDetails } from '../../Models/transactionDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranscationServiceService } from '../../services/transcation-service.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { style } from '@angular/animations';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit, OnChanges {
  transactions: TransactionDetails[] = [];
  currentStatus=Status;
  displayAddEditModal = false;
  selectedProduct: TransactionDetails = new TransactionDetails();
  searchFilter: string = '';
  filterProperties: string[] = ['txnId'];
  isAboutDelete: number = -1;

  constructor(
    private fb: FormBuilder,
    private transcationServiceService: TranscationServiceService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  onRowEditInit(product: TransactionDetails) {
    console.log(product);
  }
  ngOnInit(): void {
    const storedValue = sessionStorage.getItem('userId');
    let userId = 0;
    if (storedValue !== null) {
      userId = parseInt(storedValue);
    }
    this.transcationServiceService.getAllTransactionDetails(userId).subscribe(
      (response) => {
        this.transactions = response;
        this.transcationServiceService.transactions = this.transactions;
      },
      (error) => {
        this.toastr.error(error.error.error);
      }
    );
  }

  deleteProduct(txnId: number) {
    this.isAboutDelete = txnId;
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete this transaction ${txnId}?`,
      accept: () => {
        this.transcationServiceService.deletePrdouct(txnId).subscribe(
          (response) => {
            const indexToDelete = this.transactions.findIndex(
              (item) => item.txnId === txnId
            );
            if (indexToDelete !== -1) {
              this.transactions.splice(indexToDelete, 1);
            }
            this.toastr.success('Transaction Deleted Successfully');
          },
          (error) => {
            this.toastr.error(error.error.error);
          }
        );
      },
      reject: () => {
        this.isAboutDelete = -1;
        this.toastr.info('Deletion Cancelled');
      },
    });
  }
  showEditModal(txnId: number) {
    this.selectedProduct = this.transactions.filter(
      (product) => product.txnId === txnId
    )[0];
    this.displayAddEditModal = true;
  }
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = new TransactionDetails();
  }
  saveorUpdateProductList(newData: TransactionDetails) {
    if (this.selectedProduct && newData.txnId === this.selectedProduct.txnId) {
      const productIndex = this.transactions.findIndex(
        (data) => data.txnId === newData.txnId
      );
    } else {
      this.transactions.unshift(newData);
    }
  }
}
