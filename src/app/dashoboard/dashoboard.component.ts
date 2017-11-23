import { Params, AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashoboard',
  templateUrl: './dashoboard.component.html',
  styleUrls: ['./dashoboard.component.css'],
  providers: [AuthService]
})
export class DashoboardComponent implements OnInit {

  public lists = [];
  public sites = [];
  public displayName = "";
  public createdDate = "";
  public modifiedDate = "";

  constructor(private authService:AuthService, private route:Router) { }

  ngOnInit() {
    if(Params.token == undefined && Params.token == ""){
      this.route.navigateByUrl("/login");
    }

    this.loadSites();
  }

  clickSite(site, $event){
    $event.stopPropagation();
    this.authService.getSubSites(site.id).then(response=>{
      console.log(response);
      let data = JSON.parse(response._body);
      let sites = data.value;
      site.sites = [];
      sites.forEach(element => {
        site.sites.push(element);
      });
    });    

    this.loadLists(site.id);
  }

  loadLists(siteId){
    this.authService.getLists(siteId).then(response=>{
      console.log(response);
      let data = JSON.parse(response._body);
      let lists = data.value;
      this.lists = [];
      lists.forEach(element => {
        this.lists.push(element);
      });
    });
  }

  loadSites(){
    this.authService.getSites().then(response=>{
      console.log(response);
      let data = JSON.parse(response._body);
      Params.rootSiteCreatedDateTime = data.createdDateTime;
      Params.rootSiteDescription = data.description;
      Params.rootSiteId = data.id;
      Params.rootSiteLastModifiedDateTime = data.lastModifiedDateTime;      
      Params.siteCollections = data.siteCollection;
      this.displayName = data.displayName;
      this.sites.push(data);
      this.createdDate = data.createdDateTime;
      this.modifiedDate = data.lastModifiedDateTime;

    }).catch(error=>{
      console.log(error);
    })
  }

}