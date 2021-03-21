import { LightningElement } from 'lwc';
const columns = [
    { label: 'Custom Type A', fieldName: 'Id', type: 'editRecordCustomType'},
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

    handleRecordEditAction(event) {
        const { recordId } = event.detail;

        let account = this.accounts.find(function(item, index) {
            if(item.Id === recordId){
                return item;
            }
        });
        console.log(account);
    }
}