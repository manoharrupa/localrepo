import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionDetails } from '../Models/transactionDetails';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranscationServiceService {
  private baseUrl = environment.backendBaseUrl + '/transaction';
  private addNewProductUrl = this.baseUrl + '/create';
  private UpdateTransactionUrl = this.baseUrl + '/updateTransaction';
  private getTransactions = this.baseUrl + '/getTransactionData';
  private deleteUrl = this.baseUrl + '/deleteTransaction';
  transactions: TransactionDetails[] = [];

  constructor(private http: HttpClient) {}

  addProduct(newProduct: any) {
    return this.http.post<TransactionDetails>(
      this.addNewProductUrl,
      newProduct
    );
  }
  updateProduct(updatedProduct: any) {
    return this.http.put<TransactionDetails>(
      this.UpdateTransactionUrl,
      updatedProduct
    );
  }

  deletePrdouct(txnId: number) {
    const deleteUrlWithId = `${this.deleteUrl}/${txnId}`;
    return this.http.delete<any>(deleteUrlWithId);
  }
  getAllTransactionDetails(userId: number) {
    const getTranscationsUrl = `${this.getTransactions}/${userId}`;
    return this.http.get<TransactionDetails[]>(getTranscationsUrl);
  }
  getTransactionDetails() {
    return this.transactions;
  }

  setTransactionDetails(transactions: TransactionDetails[]) {
    this.transactions = transactions;
  }
}
