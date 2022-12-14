import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';

import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: ['./mat-select-search.component.css'],
})
export class MatSelectSearchComponent implements OnInit, OnChanges {
  @Input() appearance: 'fill' | 'outline' = 'fill';
  @Input() placeholder: string = 'Select X';
  @Input() items: Observable<Array<any>> = of([]);
  @Input() bindValueKey: string = 'value';
  @Input() bindLabelKey: string = 'label';
  @Input() searchPlaceholder: string = 'Search your item ...';

  filterFormControl: FormControl = new FormControl('');
  private isServerSide: boolean = true;
  private currentStaticItems: Array<any> = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items instanceof Array) {
      this.currentStaticItems = this.items;
      this.items = of(this.items);
      this.isServerSide = false;
    }
  }
}
