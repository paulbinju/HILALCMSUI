import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  hideRequiredControl = new FormControl(false);
  breadscrums = [
    {
      title: 'Chat',
      items: ['Apps'],
      active: 'Chat'
    }
  ];
  constructor() {}
}
