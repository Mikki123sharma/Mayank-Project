import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
export interface Address {
  address_line_1: string;
  address_line_2: string;
  city: string;
  country: string;
  id: number;
  is_active: boolean;
  pincode: number;
  state: string;
}
@Component({
    selector: 'app-party',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatIconModule, MatPaginatorModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatCardModule, MatTableModule],
    templateUrl: './party.component.html',
    styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
    partyForm!: FormGroup;
    editId: any;    
    editIndex: any;
    parties: any[] = [];
    partyData: any = {};
    isUpdate: boolean = false;
    dataSource = new MatTableDataSource();
    errorMessage: string | null = null;

    displayedColumns = [
        'actions',
        'name',
        'email',
        'mobile_no',
        // 'address_line_1',
        // 'address_line_2',
        'date_of_birth',
        'company_name',
        'anniversary_date',
        // 'pincode',
        // 'state',
        'gstin',
    ];
i: any;

    constructor(
        private apiService: LoginService,
        private fb: FormBuilder

    ) { }

    ngOnInit(): void {

        this.partyForm = this.fb.group({
            name: '',
            email: '',
            mobile_no: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            country: '',
            pincode: '',
            state: '',
            gstin: '',
            anniversary_date: '',
            date_of_birth: '',
            company_name: ''
        })
        this.fetchParties();
    }

    fetchParties(): void {
        const token = localStorage.getItem('token');
        if (token) {
            this.apiService.getAllParties(token).subscribe(response => {
                this.parties = response;
                this.dataSource.data = response;    
                console.log('data', this.dataSource);
            });
        }       
    }

    addParty(): void {
        if (this.isUpdate) {
            this.updateParty(this.editId);
        }
        else {
            const token = localStorage.getItem('token');
            if (token) {
                this.apiService.postParty(this.partyForm.value, token).subscribe(
                    (res) => {
                        if (res.success) {
                            window.alert(res.msg);
                            this.reset(); // Clear form data
                            this.fetchParties();
                            this.errorMessage = null; // Clear error message on success
                        }
                    },
                    error => {
                        this.errorMessage = error.msg; // Show error message
                    }
                );
            }
        }
    }

    updateParty(id: number): void {
        const token = localStorage.getItem('token');
        if (token) {
            this.apiService.updateParty(id, this.partyForm.value, token).subscribe((res) => {
                this.isUpdate = false;
                window.alert('Vendor update Successfully');
                this.reset(); // Clear form data
                
                this.fetchParties();
            });
        }
    }

    deleteParty(id: number): void {
        const token = localStorage.getItem('token');
        if (token) {
            this.apiService.deleteParty(id, token).subscribe((res) => {
                this.fetchParties();
                window.alert(res.msg)
            });
        }
    }

    toggleUpdate(party: any, index:any): void {
        this.isUpdate = true;
        this.partyForm.patchValue(party);
        this.editId = party.id
        this.editIndex = index
    }

    cancelUpdate(): void {
        this.isUpdate = false;
        this.partyData = {}; // Clear form data
    }
    reset(){
        this.partyForm.reset();
    }
}
