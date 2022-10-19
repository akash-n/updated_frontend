import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/common/ticket';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/services/login.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets:Ticket[]=[];
  selectedTicket:Ticket;
  loggedInUser:User=null;
  constructor(private ticketService:TicketService,private loginService:LoginService) { }

  ngOnInit(): void {
    
  this.getloggedInUserData();

  }
  // End Of onInit
getloggedInUserData(){
  this.loginService.loggedInUser.subscribe((data:any)=>{
    
    this.loggedInUser=data;
    console.log(this.loggedInUser);
    this.getTableDetails(this.loggedInUser.id);
  })
}

  getTicketsByCustomerId(id:any) {
    this.ticketService.getCustomerTickets(id).subscribe(data=>{
      this.tickets=data;
    })
  }
  getTableDetails(id){
    if(this.loggedInUser.role==='customer'){
      
      this.ticketService.getCustomerTickets(id).subscribe(data=>{
        this.tickets=data;
      })
       
     }
     else{
      this.getAllTickets();
      console.log("line 31");
     } 
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(data=>{
      this.tickets=data;
    });
  }

}
