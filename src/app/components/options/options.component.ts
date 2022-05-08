import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() text!: any;
  @Input() id!: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigate(['solve',this.id])
  }

}
