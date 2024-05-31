'use client'

import { action, makeObservable, observable } from "mobx"
import { backendApi } from "../BackendApi"
import moment from "moment"

class ProfileStore{
  
  data:any={
    email:"johndoe@gmail.com",
    username:"johndoe123",
    name:"Johndoe",
    birthday:"08/28/1995",
    horoscope: "Scorpius",
    zodiac: "Rat",
    height:"175 cm",
    weigth:"69 kg",
    interest:['Music','Basketball','Fitness','Gymming'],
    gender:""
  }

  access_token=""

  constructor(){
    makeObservable(this,{
      data: observable,
      getAge: action,
      access_token: observable
    })
  }

  getDateFromBirthDay(){
    const split=this.data.birthday.split("/")
    const dateString=split[2]+'-'+split[0]+'-'+split[1]
    return dateString
  }

  getAge(){
    let years = moment().diff(this.getDateFromBirthDay(), 'years');
    return years
  }


  fetchAndSetProfile(){
    backendApi.get('api/getProfile',{
      headers:{
        "x-access-token":this.access_token
      }
    }).then((res:any)=>{
      for(const property in res.data){
        this.data[property]=res.data[property]
      }
    })
  }

  updateAndSetProfile(data:any){
    return backendApi.put('api/updateProfile',{...data,birthday:moment(data.birthday).format('MM/DD/YYYY')},{
      headers:{
        "x-access-token":this.access_token
      }
    }).then((res:any)=>{
      for(const property in res.data){
        this.data[property]=res.data[property]
      }
    })
  }

  updateAndSetInterest(interest:string[]){
    return backendApi.put('api/updateProfile',{...this.data,birthday:moment(this.data.birthday).format('MM/DD/YYYY'),interest},{
      headers:{
        "x-access-token":this.access_token
      }
    }).then((res:any)=>{
      for(const property in res.data){
        this.data[property]=res.data[property]
      }
    })
  }

}

export const profileStore=new ProfileStore();