import { LightningElement } from 'lwc';
const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name'}
];
export default class Accounts extends LightningElement {
    accounts = [];
    columns = columns;

    getAccounts(){
        //using javascrip native fetch method to get data from server
        fetch('/getAccounts').then(res => {
            res.json().then(data =>{
                this.accounts = data.records;
            });
        }).catch(err => {
            console.error(err);
        });
    }

    //getter method to check if students array have value
    get isAccountsAvailable(){
        return this.accounts.length > 0;
    }
}