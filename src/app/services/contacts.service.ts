import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { ContentChild, Injectable, MissingTranslationStrategy } from '@angular/core';
import { throwError, catchError, Observable, retry } from 'rxjs';
import {myContact} from '../models/myContact'
import { myGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url: string = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  public getAllContacts():Observable<myContact[]> {
    let dataUrl: string = `${this.url}/contacts`;
    return this.http.get<myContact[]>(dataUrl).pipe(catchError(this.handleError))
  }


  public getContact(contactId:string):Observable<myContact>{
    let dataUrl:string= `${this.url}/contacts/${contactId}`  ;
    return this.http.get<myContact>(dataUrl).pipe(catchError(this.handleError));
    
  
  }


  public createContact(contact:myContact):Observable<myContact>{
    
    let dataUrl:string= `${this.url}/contacts`;
    return this.http.post<myContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  public updateContact(contact:myContact, contactId:string):Observable<myContact[]>{
    
    let dataUrl:string= `${this.url}/contacts/${contactId}`;
    return this.http.put<myContact[]>(dataUrl, contact).pipe(catchError(this.handleError));
  }


  public deleteContact(contactId:string):Observable<myContact>{
    
    let dataUrl:string= `${this.url}/contacts/${contactId}`;
    return this.http.delete<myContact>(dataUrl).pipe(catchError(this.handleError));
  }




  public getAllGroups():Observable<myGroup[]> {
    let dataUrl: string = `${this.url}/group`;
    return this.http.get<myGroup[]>(dataUrl).pipe(catchError(this.handleError))
  }

  public getGroup(contact:myContact):Observable<myGroup>{
    let dataUrl:string= `${this.url}/group/${contact.groupId}`  ;
    return this.http.get<myGroup>(dataUrl).pipe(catchError(this.handleError));
    
  
  }




  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error : ${error.error.message}`
    }
    else {
      errorMessage = `Status: ${error.status} \n Message : ${error.message}`
    }
    return throwError(errorMessage)
  }
}
