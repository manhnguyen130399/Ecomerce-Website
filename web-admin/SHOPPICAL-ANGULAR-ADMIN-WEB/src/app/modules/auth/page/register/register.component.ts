import { SlugifyPipe } from './../../../../core/pipe/slugify.pipe';
import { UserService } from '@modules/auth/services/user.service';
import { StoreRegister } from '@app/modules/auth/models/store-register';
import { SellerRegister } from '@app/modules/auth/models/seller-register';
import { ShareService } from '@modules/auth/services/share.service';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@env';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  current: number;
  sellerRegisterObject = new SellerRegister();
  storeRegisterObject = new StoreRegister();
  constructor(
    private readonly router: Router,
    private readonly shareService: ShareService,
    private readonly userService: UserService,
    private readonly slugifyPipe: SlugifyPipe,
    private readonly messageService: NzMessageService
  ) {

  }
  ngOnInit(): void {
    const url = this.router.url;
    this.current = parseInt(url[url.length - 1]);

    this.shareService.childChangeEmitted$.subscribe(formData => {

      if (formData.isNext) {
        delete formData.isNext;
        this.sellerRegisterObject = {
          ...formData
        };

        this.shareService.emitNextFromParent(this.storeRegisterObject);

        this.current += 1;
        this.router.navigate([`/auth/register/step-${this.current}`])
      }
      else if (formData.isPrev) {
        delete formData.isPrev;
        this.storeRegisterObject = {
          ...formData
        };

        this.shareService.emitPrevFromParent(this.sellerRegisterObject);

        this.current -= 1;
        this.router.navigate([`/auth/register/step-${this.current}`])
      }
      else {
        const data = {
          ...this.sellerRegisterObject,
          ...formData
        };
        console.log(data);
        this.userService.sellerRegister(data).pipe(
          tap(result => {
            if (result.isSuccessed) {
              this.messageService.create("success", "Register successfully");
              this.router.navigate(['/auth/login'])
              localStorage.removeItem(environment.verifyKey);
            }
          }),
        )
          .subscribe();
      }
    });
  }
}
