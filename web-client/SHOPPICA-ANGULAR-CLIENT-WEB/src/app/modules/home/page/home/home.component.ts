import { AuthService } from './../../../../core/services/auth/auth.service';
import { Category } from '../../../../core/model/category/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showRecommend = false;
  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.showRecommend = this.authService.isAuthenticated();
  }


}
