import { LightningElement } from 'lwc';

export default class App extends LightningElement {

    isAuthorized;

    connectedCallback() {
        fetch('/isAuthorized').then(res => {
            res.json().then(data =>{
                this.isAuthorized = data;
                console.log(data);
            });
        }).catch(err => {
            console.error(err);
        });
    }

    handleClick() {
        window.location.href = `/oauth2/auth`;
    }

}