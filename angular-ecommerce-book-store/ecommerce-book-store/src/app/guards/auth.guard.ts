import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../components/login/login.component';
import { NotificationService } from '../services/notification/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  let isAuthenticated = inject(AuthService).isLoggedIn();
  let router = inject(Router)
  let modalService = inject(NgbModal);
  let notificationService = inject(NotificationService);

  const expectedRoles: string[] = route.data?.['expectedRoles'];

  if (isAuthenticated) {
    
    const userRole = localStorage.getItem('userRole');
    const hasRole = expectedRoles.some(role => role == userRole);

    if (!hasRole) {
      
      router.navigate(['/home']);
      notificationService.showError("You do not have access rights","Access denied")
      return false;
    }

    return true;

  } else {
    router.navigate(['/home']);
    notificationService.showError("You must log in","Access denied")
    let modalRef = modalService.open(LoginComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'sm',
    });
    return false;
  }

};
