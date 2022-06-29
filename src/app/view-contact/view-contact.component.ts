import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myContact } from '../models/myContact';
import { myGroup } from '../models/myGroup';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public contactId: string | null = null;
  public loading:boolean= false;
  public contact:myContact={} as myContact;
  public errorMessage: string | null = null;
  public group:myGroup={} as myGroup;



  constructor(private activatedRoute:ActivatedRoute, private contservice:ContactsService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{

      this.contactId= param.get('contactId')
    });
    if(this.contactId){
      this.loading= true;
      this.contservice.getContact(this.contactId).subscribe(
        (data:myContact)=>{
          this.contact = data;
          this.loading= false;
          this.contservice.getGroup(data).subscribe((data:myGroup)=>{
            this.group = data;
          })
        },(error)=>{
          this.errorMessage = error;
          this.loading= false;
        }
      )
    }
  }
  public isNotEmpty(){
    return Object.keys(this.contact).length>0 && Object.keys(this.group).length>0;
  }


}
