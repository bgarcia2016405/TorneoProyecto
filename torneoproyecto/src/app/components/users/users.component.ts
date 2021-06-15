
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public usuarios;
  public idUsuarioModel: User;
  constructor(public userService: UserService) {
    this.idUsuarioModel = new User("","","","","","","","");
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.userService.showAllUser().subscribe(
      response => {
        this.usuarios = response
        console.log(response)
      }
    )
  }



}

