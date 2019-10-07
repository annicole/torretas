import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  urlImg:string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.urlImg = "../../../assets/img/ICMA_AUTOMATION-01.png";
  }

  logout(): void {
    this.auth.logout();
    Swal.fire('Logout', '', 'success');
    this.router.navigate(['/login']);
  }
}
