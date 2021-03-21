import { LightningElement } from 'lwc';

export default class App extends LightningElement {

    handleClick() {
        let port = 3002;
        window.location.href = `http://localhost:${port}/oauth2/auth`;
    }

}