import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable} from 'rxjs';
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
  public res: Observable<ITest[]>;
  constructor(private db: AngularFirestore) {
    this.res = this.db.collection<ITest>('test').get().pipe(
      map(e => e.docs.map(e => ({ id: e.id, ...e.data() })))
    );
  }

}


/**
 map(e =>
        e.docs.map(e => {
          return { id: e.id, ...e.data() } as ITest
         })
         )
 */
