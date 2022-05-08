import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options= [
    {
      text: 'One Equation One Variable',
      id: 0
    },
    {
      text: 'Two Equations two Variables',
      id: 1
    },
    {
      text: 'Simple Calculator',
      id:2
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
