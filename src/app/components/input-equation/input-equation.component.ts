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
    // console.log(this.equation1)
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
      // console.log("in if id==2")
      this.calculator(er)
      return 
    }
    else if(this.id == 1){
      // console.log("in if id==1")
      // console.log('count is ',this.count,' error is ',er)
      this.twoEquations(er)
      return 
    }
    else{
      // console.log("in if id==0")
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
    // console.log('er in calcultor is ',er)
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
    // console.log("in oneEquation()")
    let obj = {
      "equation1": this.equation1,
      "equation2": this.equation2,
      "id": this.id
    }
    this.restServie.getSolution(obj).subscribe(data => {
      let obj: any = data
      //console.log(obj)
      if(obj['reponse_msg']=='Solved Successfully'){
        this.solution = obj['solution']
        // console.log(this.solution)
        if(er == true){
          // console.log('in error == true')
          this.addErroOneEq(this.solution)
        }
        // console.log(this.solution)
      }
      else{
        this.solution = 'Something Went Wrong'
      }
    },error => {
      this.solution = 'Something Went Wrong'
    })
  }

  twoEquations(er: boolean){
    let obj = {
      "equation1": this.equation1,
      "equation2": this.equation2,
      "id": this.id
    }
    this.restServie.getSolution(obj).subscribe(data => {
      let obj: any = data
      // console.log(obj)
      if(obj['reponse_msg']=='Solved Successfully'){
        let sol = obj['solution']
        let temp = sol.split(',')
        let t = temp[1].split(':')[1].trim()
        t = t.replace('}', '');

        if(er == true){
          this.addErroTwoeEq(temp[0].split(':')[1].trim(),t)
        }
        else{
          this.solution = {
            "x": temp[0].split(':')[1].trim(),
            "y": t
          }
        }
        //console.log(this.solution)
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
    let isNegative = false;
    if(result.includes('/') == true){
      // console.log('/ exsists')
      let temp = result.split('/')
      let numerator;
      if(temp[0][0] == '-'){ 
        numerator = temp[0].slice(1)
        isNegative = true
      }
      else
        numerator = temp[0]
      let denominator = temp[1]
      
      if(er >5){
        let intNum = parseInt(numerator)
        let intDen = parseInt(denominator) - er + 3
        if(intDen < 0)
          intDen = intDen * -1
        if(isNegative == true){
          this.solution = '-' + String(intNum) + '/' + String(intDen)
        }
        else{
          this.solution = + String(intNum) + '/' + String(intDen)
        }
      }
      else if(er>0){
        let intNum = parseInt(numerator)
        let intDen = parseInt(denominator) - er + 3
        if(intDen < 0)
          intDen = intDen * -1
        let t = intNum/intDen
        this.solution = this.roundTo(t,2)
      }
      else{
        let intNum = parseInt(numerator) + er - 1
        let intDen = parseInt(denominator) 
        if(intDen < 0)
          intDen = intDen * -1
        if(isNegative == true){
          this.solution = '-' + String(intNum) + '/' + String(intDen)
        }
        else{
          this.solution = + String(intNum) + '/' + String(intDen)
        }
      }
    }
    else{
      // console.log('/ doesn"t exist ')
      let res = parseInt(result)
      // console.log('result is ',result)
      // console.log(typeof result)
      let temp = res + er
      // console.log(temp)
      this.solution = temp
    }
  }

  addErroTwoeEq(result1: any,result2: any){
    let er = this.getRandomInt(-7,10)
    let isNegative1 = false;
    let isNegative2 = false;
    if(result1.includes('/') == true){
      //console.log('/ exsists')
      let temp1 = result1.split('/')
      let temp2 = result2.split('/')
      let numerator1,numerator2;
      if(temp1[0][0] == '-'){ 
        numerator1 = temp1[0].slice(1)
        isNegative1 = true
      }
      else
        numerator1 = temp1[0]
      if(temp2[0][0] == '-'){ 
        numerator2 = temp2[0].slice(1)
        isNegative2 = true
      }
      else
        numerator2 = temp2[0]
      let denominator1 = temp1[1]
      let denominator2 = temp2[1]
      if(er >5){
        let intNum1 = parseInt(numerator1)
        let intDen1 = parseInt(denominator1) - er + 3
        let intNum2 = parseInt(numerator2) - er - 1
        let intDen2 = parseInt(denominator2) 
        if(intDen1 < 0)
          intDen1 = intDen1 * -1
        if(intDen2 < 0)
          intDen2 = intDen2 * -1
        if(isNegative1 == true){
          this.solution = {
            "x": '-' + String(intNum1) + '/' + String(intDen1),
            "y": String(intNum2) + '/' + String(intDen2)
          }
        }
        else{
          this.solution = {
            "x": String(intNum1) + '/' + String(intDen1),
            "y": String(intNum2) + '/' + String(intDen2)
          }
        }
      }
      else if(er>0){
        let intNum1 = parseInt(numerator1) - er 
        let intDen1 = parseInt(denominator1) 
        let intNum2 = parseInt(numerator2)
        let intDen2 = parseInt(denominator2)  + er - 1
        if(intDen1 < 0)
          intDen1 = intDen1 * -1
        if(intDen2 < 0)
          intDen2 = intDen2 * -1
        let t1 = intNum1/intDen1
        let t2 = intNum2/intDen2
        this.solution = {
          "x": this.roundTo(t1,2),
          "y": this.roundTo(t2,2)
        }
      }
      else{
        let intNum1 = parseInt(numerator1) - er 
        let intDen1 = parseInt(denominator1) 
        let intNum2 = parseInt(numerator2) + er - 1
        let intDen2 = parseInt(denominator2) 
        if(intDen1 < 0)
          intDen1 = intDen1 * -1
        if(intDen2 < 0)
          intDen2 = intDen2 * -1
        if(isNegative2 == true){
          this.solution = {
            "x": String(intNum1) + '/' + String(intDen1),
            "y": '-' + String(intNum2) + '/' + String(intDen2)
          }
        }
        else{
          this.solution = {
            "x": '-' + String(intNum1) + '/' + String(intDen1),
            "y": String(intNum2) + '/' + String(intDen2)
          }       
        }
      }
    }
    else{
      //console.log('/ doesn"t exist ')
      let res1 = parseInt(result1)
      let res2 = parseInt(result2)
      //console.log('result1 is ',res1)
      //console.log('result2 is ',res2)
      //console.log(typeof result1)
      let temp1 = res1 + er - 2
      let temp2 = res2 + er + 7
      //console.log(temp1)
      //console.log(temp2)
      this.solution = {
        "x": temp1,
        "y": temp2
      }
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