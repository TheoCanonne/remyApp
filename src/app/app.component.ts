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
  public displayValues: Observable<ITest[]> | null;
  constructor(private db: AngularFirestore) {
    this.displayValues = null;
    this.displayValues = this.getRandom5();
  }

  getAll(): Observable<ITest[]> {
    return this.db.collection<ITest>('test').get().pipe(
      map(e => e.docs.map(e => ({ id: e.id, ...e.data() })))
    );
  }

  getRandom5() {
    return this.getAll().pipe(
      map(e=> e.sort(() => 0.5 - Math.random()).slice(0, 5))
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
