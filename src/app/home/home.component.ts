import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import {Sort, MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import Swal from 'sweetalert2';
export interface User {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  age: number;
  dob: string;
  salary: number;
  address: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: User[] = [];
  p: number = 1;
  itemsPP: number = 10;
  searchText:string =""
constructor(private service : HomeService) {
  this.service.fetchDataFromServer().then(data => {
    this.users=data
  })
}
ngOnInit() {


}
deleteUser(id:any) {
  const element = this.users.find(x => x.id === id)!;
  const index = this.users.indexOf(element);
  if (index > -1) {
    this.users.splice(index, 1); 
  }
}
filterData(element : string) {
  console.log(element);
  const filtered = this.users.filter(a => element === a.firstName);
  console.log(filtered)

}
addNewUser() {
  Swal.fire({
    title: 'Add New User',
    html:
      'Fill up the informations : ' +
      '<input type="number" style="margin-bottom: 8px;" class="form-control" id="id" placeholder="Type a UNIQUE user id">' +
      '<input type="text" style="margin-bottom: 8px;" class="form-control" id="imageUrl" placeholder="Type in imageUrl">' +
      '<input type="text" style="margin-bottom: 8px;" class="form-control" id="firstName" placeholder="Type in first Name">' +
      '<input type="text" style="margin-bottom: 8px;" class="form-control" id="lastName" placeholder="Type in last Name">' +
      '<input type="text" style="margin-bottom: 8px;" class="form-control" id="email" placeholder="Type in email">' +
      '<input type="number" style="margin-bottom: 8px;" class="form-control" id="contactNumber" placeholder="Type in contact Number">' +
      '<input type="number" style="margin-bottom: 8px;" class="form-control" id="age" placeholder="Type in age">' +
      '<input type="text" style="margin-bottom: 8px;" class="form-control" id="dob" placeholder="Type in date of birth" >' +
      '<input type="number" style="margin-bottom: 8px;" class="form-control" id="salary" placeholder="Type in salary">' +
      '<input type="text" style="margin-bottom: 8px;" class="form-control" id="address" placeholder="Type in address">',
    showCloseButton: true,
    showCancelButton: true,
    preConfirm: (login) => {
      let newUser : User = {
        id: parseInt((document.getElementById('id') as HTMLInputElement).value),
        imageUrl: (document.getElementById('imageUrl') as HTMLInputElement).value,
        firstName:(document.getElementById('firstName') as HTMLInputElement).value,
        lastName: (document.getElementById('lastName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        contactNumber: (document.getElementById('age') as HTMLInputElement).value,
        age: parseInt((document.getElementById('age') as HTMLInputElement).value),
        dob: (document.getElementById('dob') as HTMLInputElement).value,
        salary: parseFloat((document.getElementById('salary') as HTMLInputElement).value),
        address: (document.getElementById('address') as HTMLInputElement).value
      };
      if (this.users.find(x=> x.id == newUser.id)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User Id Already exists'
        })
        return; 
      }else {
        this.users.unshift(newUser)
        Swal.fire(
          'Good job!',
          'User Added!',
          'success'
        )
      }
      
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
}
sortData(sort: Sort) {
  const data = this.users.slice();
  if (!sort.active || sort.direction === '') {
    this.users = data;
    return;
  }
  this.users = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        return this.compare(a.id, b.id, isAsc);
      case 'firstName':
        return this.compare(a.firstName, b.firstName, isAsc);
      case 'lastName':
        return this.compare(a.lastName, b.lastName, isAsc);
      case 'email':
        return this.compare(a.email, b.email, isAsc);
      case 'contactNumber':
        return this.compare(a.contactNumber, b.contactNumber, isAsc);
      case 'age':
        return this.compare(a.age, b.age, isAsc);
      case 'dob':
        return this.compare(a.dob, b.dob, isAsc);
      case 'salary':
        return this.compare(a.salary, b.salary, isAsc);
      case 'address':
          return this.compare(a.address, b.address, isAsc);
      default:
        return 0;
    }
  });
}


compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
}
