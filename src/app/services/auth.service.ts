import { Http, RequestOptions, Headers } from '@angular/http';


import { Injectable } from "@angular/core";



export class Params{
    static token:string;
    static rootSiteCreatedDateTime: string;
    static rootSiteDescription:string;
    static rootSiteId:string;
    static rootSiteLastModifiedDateTime:string;
    static siteCollections = [];    
  }


@Injectable()
export class AuthService{
  constructor(private http:Http){

  }

  authenticateMicrosoft(){
    var clientId = "55238b25-d2ba-4433-a59b-aa98e5c828e0";
    let redirectUrl = "http://localhost:4200";
    var authServer = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?";
    var responseType = "token";
    var stateParam = Math.random() * new Date().getTime();

    var authUrl = authServer +
                                "response_type=" + encodeURI(responseType) +
                                "&client_id=" + encodeURI(clientId) + 
                                "&scope=user.read offline_access sites.fullcontrol.all sites.manage.all sites.read.all sites.readwrite.all" +
                                "&prompt=consent&redirect_uri=" + encodeURI(redirectUrl) +
                                "&state=" + stateParam;

    var popupWindow = window.open(authUrl, "_self", 'width=' + 300 + ', height=' + 600 + ', top=' + 10 + ', left=' + 10 + ',location=no,toolbar=yes');
    if (popupWindow.focus) {
    popupWindow.focus();
    }
  }
  public authentication(username:string, password:string){
    this.authenticateMicrosoft();
  }

  
  public getSites():Promise<any>{
    return new Promise<any>((resolve, reject) =>{
        let url = 'https://graph.microsoft.com/v1.0/sites/root';
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + localStorage.getItem("token"));
        let headersArgs:any = {headers};
        this.http.get(url, headersArgs).toPromise().then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error);
        });
    });
  }

  public getListSchema(siteId, listId):Promise<any>{
    return new Promise<any>((resolve, reject) =>{
        let url = 'https://graph.microsoft.com/v1.0/sites/' + siteId + "/lists/" + listId + "?expand=columns";
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + localStorage.getItem("token"));
        let headersArgs:any = {headers};
        this.http.get(url, headersArgs).toPromise().then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error);
        });
    });
  }

  public getSubSites(id):Promise<any>{
    return new Promise<any>((resolve, reject) =>{
        let url = 'https://graph.microsoft.com/v1.0/sites/' + id + '/sites';
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + localStorage.getItem("token"));
        let headersArgs:any = {headers};
        this.http.get(url, headersArgs).toPromise().then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error);
        });
    });
  }

  public getLists(siteId):Promise<any>{
    return new Promise<any>((resolve, reject) =>{
        let url = 'https://graph.microsoft.com/v1.0/sites/' + siteId + '/lists';
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + localStorage.getItem("token"));
        let headersArgs:any = {headers};
        this.http.get(url, headersArgs).toPromise().then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error);
        });
    });
  }
}
