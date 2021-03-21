import { LightningElement, api } from 'lwc';

export default class EditRecordCustomType extends LightningElement {

    @api recordId;

    fireOpenRecordEditAction(e) {
        console.log('fire:' + this.recordId);
        e.preventDefault();
        const event = new CustomEvent('openrecordeditaction', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                recordId: this.recordId
            },
        });
        this.dispatchEvent(event);
    }
}