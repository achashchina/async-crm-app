import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AuthService } from '../auth/auth.service';
import { Observable, map } from 'rxjs';
import { TUser } from '../auth/types/user.type';
import { AsyncPipe } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { doc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { collection, updateDoc } from 'firebase/firestore';
import { Timestamp } from '@angular/fire/firestore';

type Employee = TUser & {
  start?: Date;
};

@Component({
  selector: 'async-employees',
  imports: [
    FormsModule,
    TableModule,
    AsyncPipe,
    DatePickerModule,
    ButtonModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  employees$!: Observable<Employee[]>;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
  ) {

    this.employees$ = this.authService.getUsers().pipe(
      map((users: TUser[]) =>
        users.map((x) => {
          const { startDate, displayName, ...rest } = x;
          return {
            ...rest,
            displayName,
            start: startDate?.toDate(),
          };
        })
      )
    );
    this.authService.getUsers().subscribe((d) => console.log(d));
  }

  async changeStartDate(user: Employee) {
    const { uid, start } = user;
    if (start) {
      user.startDate = Timestamp.fromDate(start);
    }

    if (uid) {
      const usersRef = collection(this.firestore, 'users');
      const userDocRef = doc(this.firestore, 'users', uid);

      const {start, ...userForSave} = user;

      await updateDoc(userDocRef, userForSave);
    }
  }
}
