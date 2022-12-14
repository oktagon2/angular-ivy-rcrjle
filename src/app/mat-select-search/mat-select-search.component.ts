import {Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormControlValueAccessorConnector} from "../utils/form-control-value-accessor-connector.component";
import {debounceTime, Observable, of, startWith} from "rxjs";

@Component({
  selector: 'app-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: ['./mat-select-search.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatSelectSearchComponent,
      multi: true
    }
  ]
})
export class MatSelectSearchComponent extends FormControlValueAccessorConnector implements OnInit, OnChanges {
  @Input() appearance: 'fill' | 'outline' = 'fill';
  @Input() placeholder: string = "Specify placeholder='you placeholder here'";
  @Input() items: Observable<Array<any>> = of([]);

  @Input() bindValueKey: string = "value";
  @Input() bindLabelKey: string = "label";
  @Input() searchPlaceholder: string = "Search your item ...";
  @Output() itemFilterServerSide = new EventEmitter<string>();
  filterFormControl: FormControl = new FormControl('')


  private isServerSide: boolean = true;
  private currentStaticItems: Array<any> = [];

  constructor(injector: Injector) {
    super(injector);
  }

  private listenToFilterFormControlChanges(): void {
    this.filterFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
    ).subscribe((value: string) => {
      if (this.isServerSide) {
        this.itemFilterServerSide.emit(value);
      } else {
        this.filterStaticList(value);
      }
    });
  }

  private filterStaticList(value: string) {
    const currentItems = this.currentStaticItems;

    const filterValue = this._normalizeValue(value);
    this.items = of(
      currentItems.filter(item => this._normalizeValue(item).includes(filterValue))
    );
  }

  private _normalizeValue(value: any): string {
    if (typeof value != "string") {
      value = value[this.bindLabelKey];
    }
    return value.toLowerCase().replace(/\s/g, '');
  }

  ngOnInit(): void {
    this.listenToFilterFormControlChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items instanceof Array) {
      this.currentStaticItems = this.items;
      this.items = of(this.items);
      this.isServerSide = false;
    }
  }


}