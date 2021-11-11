import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ITest {
  id?: string;
  title: string;
  desc: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public allValues: Observable<ITest[]> | null;
  constructor(private db: AngularFirestore) {
    this.allValues = null;
    this.getAll();
  }

  getAll(): void {
    this.allValues = this.db.collection<ITest>('test').get().pipe(
      map(e => e.docs.map(e => ({ id: e.id, ...e.data() })))
    );
  }
  add() {
    for (let i = 2; i < 21; i++) {
      this.db.collection<ITest>('test').add({
        title: 'Titre ' + i,
        desc: 'Desc ' + i,
      })
    }
  }
}
