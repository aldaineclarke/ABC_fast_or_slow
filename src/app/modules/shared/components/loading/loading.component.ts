import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { messageObject } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    @Input() messageObj!: Observable< messageObject>;



}
