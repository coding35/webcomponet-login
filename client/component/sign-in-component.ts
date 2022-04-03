class SignInWebCompontent extends HTMLElement {
    _root: ShadowRoot;
    _signInForm: HTMLFormElement | undefined;
    _formData: any;
    constructor() {
        super();
        this._root = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this._root.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style>
            :host{}
        </style>
        <form id="SignInForm" role="form">
            <div class="form-group">
                <label for="username">
                    Username
                </label>
                <input type="text" class="form-control" name="username" />
            </div>
            <div class="form-group">
                
                <label for="password">
                    Password
                </label>
                <input type="password" class="form-control" name="password" />
            </div>
            <input type="submit" class="btn btn-primary" name="submit"/>
        </form>
        <br>
        <iframe id="SignInIframe" src="http://127.0.0.1:5501" style=""></iframe>
       `;

        this._signInForm = this._root.getElementById('SignInForm') as HTMLFormElement;
        this._signInForm.onsubmit = (event: SubmitEvent) => {
            event.preventDefault();
            const formData = new FormData(this._signInForm);
            this._formData = {
                username: formData.get('username'),
                password: formData.get('password')
            }
            this.sendDataToServer(this._formData);
        };
    }

    private sendDataToServer(message: string): void {
        const childFrame = this._root.getElementById('SignInIframe') as HTMLIFrameElement;
        if (childFrame.contentWindow !== null) {
            childFrame.contentWindow.postMessage(message, 'http://127.0.0.1:5501');
        }
    }
}

window.customElements.define("sign-in-webcomponent", SignInWebCompontent);

