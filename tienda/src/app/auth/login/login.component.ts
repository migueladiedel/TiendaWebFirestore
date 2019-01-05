import { Component } from '@angular/core';
import {Router} from "@angular/router";
// Servicios
import { AuthService } from '@auth/auth.service';
import { SnackService } from '@common/snack.service';
import { AppService } from '@common/app.service';


export class Auth {
  constructor(
    public email: string,
    public password: string
  )
  {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackService: SnackService,
    public appService: AppService
  ) { }

  ngOnInit() {
  }

  login(user: Auth) {
    this.appService.fireLoader();
    this.auth.emailAndPassword(user.email, user.password).then(credentials => {
      this.router.navigate(['/shop']).then(() => {
        this.appService.stopLoader();
      }).catch(err => {
        this.snackService.launch("Error: " + err.message, "La ruta shop no existe", 5000);
        this.appService.stopLoader();
      })
    })
      .catch(err => {
        this.snackService.launch("Error: " + err.message, "Inicio de sesión", 5000);
        this.appService.stopLoader();
      })
  }
}
