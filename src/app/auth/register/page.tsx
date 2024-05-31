"use client"

import React, { ChangeEvent, Component } from 'react'
import { MainButton } from '@/components/buttons/Button'
import { MainInput } from '@/components/inputs/Input'
import { redirect, useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { backendApi } from '@/services/BackendApi'

interface RegisterPageProps{
  router: AppRouterInstance
}

class RegisterPage extends Component<RegisterPageProps> {
  state={
    form:{
      email:"",
      username:"",
      password:"",
      confirm_password:""
    },
    canSubmit:false
  }

  changeForm=(event:ChangeEvent<HTMLInputElement>, key:string)=>{
    let form={
        ...this.state.form,
        [key]:event.target.value
    }
    const canSubmit=this.validateForm(form)
    this.setState({
      form:{
        ...this.state.form,
        [key]:event.target.value
      },
      canSubmit
    })
  }

  validateForm=(form:any)=>{
    let canSubmit=false;
    const regexToValidateEmail=(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if(form.email.match(regexToValidateEmail)){
      if(form.password && form.password===form.confirm_password){
        canSubmit=true
      }
    }
    return canSubmit
  }

  onSubmit=()=>{
    const data={
      email:this.state.form.email,
      username:this.state.form.username,
      password:this.state.form.password,
    }
    // backendApi.post('api/register',data).catch((reason)=>{
    //   alert(reason)
    // }).then((res)=>{
    //   console.log(res)
    //   // this.props.router.push('/profile')
    // })
    this.props.router.push('/profile')
  }

  render() {
    return (
        <div className='register'>
          <div className='form-groups'>
            <div className='title'>
              Register
            </div>
            <MainInput placeholder='Enter Email' onChange={(event:any)=>this.changeForm(event,'email')}/>
            <MainInput placeholder='Create Username' onChange={(event:any)=>this.changeForm(event,'username')}/>
            <MainInput placeholder='Create Password' type="password" onChange={(event:any)=>this.changeForm(event,'password')}/>
            <MainInput placeholder='Confirm Password' type="password" onChange={(event:any)=>this.changeForm(event,'confirm_password')}/>
          </div>
          <div className='button'>
            <MainButton disable={!this.state.canSubmit} onClick={this.onSubmit}>Register</MainButton>
          </div>
          <div className='question'>
            Have an account? 
            <span className='link'> Login here</span>
          </div>
        </div>
    )
  }
}


export default function WithRouter(){
  const router = useRouter()
  return(
    <RegisterPage router={router}/>
  )
}