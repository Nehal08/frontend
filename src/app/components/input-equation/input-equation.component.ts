import { Component, Input, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-input-equation',
  templateUrl: './input-equation.component.html',
  styleUrls: ['./input-equation.component.css']
})
export class InputEquationComponent implements OnInit {

  @Input() id: any;
  equation1: any;
  equation2:string = '';
  solution: any;

  constructor(private restServie: RestService) { }

  ngOnInit(): void {
  }

  Solve(){
    console.log(this.equation1)
    if(this.id == 2){
      console.log('in if block')
      try{
        this.solution = eval(this.equation1)
      }
      catch(error){
        this.solution = 'Something Went Wrong'
      }
      return 
    }
    else if(this.id == 1){
      let obj = {
        "equation1": this.equation1,
        "equation2": this.equation2,
        "id": this.id
      }
      this.restServie.getSolution(obj).subscribe(data => {
        let obj: any = data
        console.log(obj)
        if(obj['reponse_msg']=='Solved Successfully'){
          let sol = obj['solution']
          let temp = sol.split(',')
          let t = temp[1].split(':')[1].trim()
          t = t.replace('}', '');
          this.solution = {
            "x": temp[0].split(':')[1].trim(),
            "y": t
          }
          console.log(this.solution)
        }
        else{
          this.solution = 'Something Went Wrong'
        }
      })
    }
    else{
      let obj = {
        "equation1": this.equation1,
        "equation2": this.equation2,
        "id": this.id
      }
      this.restServie.getSolution(obj).subscribe(data => {
        let obj: any = data
        console.log(obj)
        if(obj['reponse_msg']=='Solved Successfully'){
          this.solution = obj['solution']
          console.log(this.solution)
        }
        else{
          this.solution = 'Something Went Wrong'
        }
      })
    }
  }

}