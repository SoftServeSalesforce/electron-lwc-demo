import { LightningElement } from 'lwc';
import {getAccounts} from 'my/dataService';

const columns = [
    { label: 'Account Id', fieldName: 'Id', type: 'editRecordCustomType'},
    { label: 'Name', fieldName: 'Name'},
    { label: 'Account Number', fieldName: 'AccountNumber'}
];
export default class Accounts extends LightningElement {
    accounts = [];
    columns = columns;
    selectedAccount;
    isAccountSelected = false;

    getAccounts(){
        getAccounts().then(data => {
            this.accounts = data;
        });
    }

    //getter method to check if students array have value
    get isAccountsAvailable(){
        return this.accounts.length > 0;
    }

    handleRecordEditAction(event) {
        const { recordId } = event.detail;

        let account = this.accounts.find(function(item, index) {
            if(item.Id === recordId){
                return item;
            }
        });
        if(account !== null) {
            this.isAccountSelected = true;
            this.selectedAccount = account;
        }
    }

    handleAccountUpdate() {
        getAccounts().then(data => {
            this.accounts = data;
        });
    }
}