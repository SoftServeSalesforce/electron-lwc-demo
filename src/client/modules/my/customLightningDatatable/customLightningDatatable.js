import LightningDatatable from 'lightning/datatable';
import editRecordCustomType from './editRecordCustomType.html';

export default class CustomLightningDatatable extends LightningDatatable {
    static customTypes = {
        editRecordCustomType: {
            template: editRecordCustomType,
            typeAttributes: ['recordId']
        }
    }
}