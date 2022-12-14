import { Component, VERSION } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  jobTypeList: Observable<Array<any>> = of([ 
    { label: 'label1', value: 'value1'},
    { label: 'label2', value: 'value2'},
    { label: 'label3', value: 'value3'}
  ]);
}
