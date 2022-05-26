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
  count: number = 0;

  constructor(private restServie: RestService) { }

  ngOnInit(): void {
  }

  Solve(){
    console.log(this.equation1)
    let er: boolean = false;
    this.count += 1;
    if(this.count >= 20){
      this.count = 0
    }
    else if(this.error(this.count))
      er = true;
    else
      er = false;

    if(this.id == 2){
      console.log("in if id==2")
      this.calculator(er)
      return 
    }
    else if(this.id == 1){
      console.log("in if id==1")
      this.twoEquations()
      return 
    }
    else{
      console.log("in if id==0")
      console.log('count is ',this.count,' error is ',er)
      this.oneEquation(er)
    }
  }

  clear(){
    this.solution = null;
    this.equation1 = '';
    this.equation2 = '';
  }

  getRandomInt(min: number, max: number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  error(count: number){
    let nums = [3,5,9,11,13,17]
    if(nums.includes(count))
      return true
    return false
  }

  calculator(er: boolean){
    console.log('er in calcultor is ',er)
    try{
      let sol = eval(this.equation1)
      if(this.isDecimal(sol))
        this.solution = this.roundTo(sol,2)
      else
        this.solution = sol 
      if(er == true)
        this.addErrorCalc(sol)
    }
    catch(error){
      this.solution = 'Something Went Wrong'
    }
  }

  oneEquation(er: boolean){
    console.log("in oneEquation()")
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
        if(er == true){
          console.log('in error == true')
          this.addErroOneEq(this.solution)
        }
        console.log(this.solution)
      }
      else{
        this.solution = 'Something Went Wrong'
      }
    },error => {
      this.solution = 'Something Went Wrong'
    })
  }

  twoEquations(){
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
    },error => {
      this.solution = 'Something Went Wrong'
    })
  }


  addErrorCalc(result: any){
   
      let er = this.getRandomInt(-4,8)
      // console.log('error is ',er)
      let res = parseInt(result)
      // console.log('result is ',result)
      // console.log(typeof result)
      let temp = res + er
      // console.log(temp)
      this.solution = temp
      return
    // try {
    //   let res = parseInt(result)
    // } catch (error) {
    //   return
    // }
  }

  addErroOneEq(result: any){
    let er = this.getRandomInt(-4,10)
    if(result.includes('/') == true){
      console.log('/ exsists')
      let temp = result.split('/')
      let numerator;
      if(temp[0][0] == '-')
        numerator = temp[0].slice(1)
      else
        numerator = temp[0]
      let denominator = temp[1]
      
      if(er >5){
        let intNum = parseInt(numerator)
        let intDen = parseInt(denominator) - er + 3
        this.solution = String(intNum) + '/' + String(intDen)
      }
      else if(er>0){
        let intNum = parseInt(numerator)
        let intDen = parseInt(denominator) - er + 3
        let t = intNum/intDen
        this.solution = this.roundTo(t,2)
      }
      else{
        let intNum = parseInt(numerator) + er - 1
        let intDen = parseInt(denominator) 
        this.solution = String(intNum) + '/' + String(intDen)
      }
    }
    else{
      console.log('/ doesn"t exist ')
      let res = parseInt(result)
      console.log('result is ',result)
      console.log(typeof result)
      let temp = res + er
      console.log(temp)
      this.solution = temp
    }
  }

  roundTo(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  };
  
  isDecimal(n:number){
   var result = (n - Math.floor(n)) !== 0; 
    if (result)
      return true;
    return false;
  }

}