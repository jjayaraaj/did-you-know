export class User{
    constructor(
        public id: string,
        private _token: string,
        public username: string
    ) {}

    get token() {
        // if(!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
        //     return null;
        // }else {
        //     return this._token;
        // }

        return this._token;
    }
}