import { LightningElement, api } from 'lwc';
import {updateAccount} from 'my/dataService';

export default class Account extends LightningElement {
    @api record;

    handleNameChange() {
        let element = this.template.querySelector(".recordName");
        updateAccount({
            recordId:this.record.Id,
            accountName: element.value
        }).then(() => {
            const event = new CustomEvent('afterupdate', {
                composed: true,
                bubbles: true,
                cancelable: true,
                detail: {
                    recordId: this.recordId
                },
            });
            this.dispatchEvent(event);
        })

    }
}