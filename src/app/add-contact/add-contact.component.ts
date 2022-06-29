import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { myContact } from '../models/myContact';
import { myGroup } from '../models/myGroup';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(private contService:ContactsService, private router:Router) { }

  public loading:boolean= false;
  public contact:myContact= {} as myContact;
  public errorMesssage: string| null = null;
  public group:myGroup[] =[] as myGroup[];





  ngOnInit(): void {

    this.contService.getAllGroups().subscribe((data:myGroup[])=>{
      this.group= data;

    }, (error)=>{
      this.errorMesssage= error;
    }
    )
  }

  public addContact()
{
  this.contService.createContact(this.contact).subscribe((data:myContact)=>{

    this.router.navigate(['/']).then();

  },(error)=>{
    this.errorMesssage=error;
    this.router.navigate(['contacts/add']).then();
  }
  )

}}

