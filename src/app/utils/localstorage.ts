export class LocalStorageUtils {
    
    public getUser() {
        return JSON.parse(localStorage.getItem('mycontrol.user'));
    }

    public saveLocalUser(response: any) {
        this.saveUserToken(response.accessToken);
        this.saveUser(response.userToken);
    }

    public clearLocalUserInformations() {
        localStorage.removeItem('mycontrol.token');
        localStorage.removeItem('mycontrol.user');
    }

    public getUserToken(): string {
        return localStorage.getItem('mycontrol.token');
    }

    public saveUserToken(token: string) {
        localStorage.setItem('mycontrol.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('mycontrol.user', JSON.stringify(user));
    }

}