import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { myContact } from '../models/myContact';
import { myGroup } from '../models/myGroup';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean= false;
  public errorMessage:string | null= null;
  public contactId: string| null= null;
  public contact: myContact= { } as myContact;
  public group: myGroup[]= [] as myGroup[];

  constructor(private activatedRoute: ActivatedRoute, private contService:ContactsService, private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId=param.get('contactId');
    });
    if(this.contactId){
      this.contService.getContact(this.contactId).subscribe((data:myContact)=>{
        this.contact= data;
        this.loading= false;
        this.contService.getAllGroups().subscribe((data:myGroup[])=>{
          this.group= data;
        })

      }, (error=>{
        this.errorMessage= error;
        this.loading= false;
      }))
    }



  }
  submitUpdate()
{
  if(this.contactId){
  this.contService.updateContact(this.contact, this.contactId).subscribe((data:myContact[])=>{

    this.router.navigate(['/']).then();

  },(error)=>{
    this.errorMessage=error;
    this.router.navigate([`/contacts/edit/${this.contact}`]).then();
  }
  )
}
}
}
