import { Component, OnInit } from '@angular/core';
import { myContact } from '../models/myContact';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading : boolean = false;
  public contacts:myContact[]=[];
  public errorMessage: String | null = null;


  constructor(private cantService:ContactsService) { }

  ngOnInit(): void {
    this.getAllContact()


  }

  getAllContact(){
    this.loading = true;
    this.cantService.getAllContacts().subscribe((data:myContact[])=>{
      this.contacts = data;
      this.loading = false;
    
    },(error)=>{
      this.errorMessage=error;
      this.loading = false;
    })
  }

  deleteContact(contactId: string | undefined){

    if(contactId){
      this.cantService.deleteContact(contactId).subscribe((data:{})=>{
        this.getAllContact();
      }, (error)=>{
        this.errorMessage= error;
        this.loading= false;
      })
    }

  }

}
