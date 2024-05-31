'use client'

import { action, makeObservable, observable } from "mobx"
import { backendApi } from "../BackendApi"

class ProfileStore{
  
  data:any={
    name:"Johndoe",
    birthday:"1995-08-28",
    height:"175 cm",
    weigth:"69 kg",
    interest:['Music','Basketball','Fitness','Gymming'],
    gender: 'Male'
  }

  constructor(){
    makeObservable(this,{
      data: observable,
      getHoroscope: action,
      getAge: action,
      getZodiac: action
    })
  }

  getHoroscope(){
    return "Virgo"
  }

  getZodiac(){
    return "Pig"
  }

  getAge(){
    return 28
  }


  fetchAndSetProfile(){
    backendApi.get('api/getProfile').then(res=>{
      console.log(res)
    })
  }

  updateAndSetProfile(data:any){
    return backendApi.get('api/updateProfile').then(res=>{
      console.log(res)
    })
  }

  updateAndSetInterest(interest:string[]){
    return backendApi.get('api/updateProfile').then(res=>{
      console.log(res)
    })
  }

  createAndSetProfile(){
    return backendApi.get('api/createProfile').then(res=>{
      console.log(res)
    })
  }
}

export const profileStore=new ProfileStore();