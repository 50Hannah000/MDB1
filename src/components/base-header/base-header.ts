import { Component, Input } from '@angular/core';

@Component({
  selector: 'base-header',
  templateUrl: 'base-header.html'
})

export class BaseHeaderComponent {
  @Input() title: string;
  constructor() { }
}
