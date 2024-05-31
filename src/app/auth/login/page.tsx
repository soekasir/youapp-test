"use client"

import React, { ChangeEvent, Component } from 'react'
import { MainButton } from '@/components/buttons/Button'
import { MainInput } from '@/components/inputs/Input'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { backendApi } from '@/services/BackendApi'

interface LoginPageProps{
  router: AppRouterInstance
}

class LoginPage extends Component<LoginPageProps> {
  state={
    form:{
      username_email:"",
      email:"",
      username:"",
      password:""
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

    if(form.username_email && form.password){
      canSubmit=true
    }
    return canSubmit
  }

  onSubmit=()=>{
    const regexToValidateEmail=(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const isEmail=this.state.form.username_email.match(regexToValidateEmail)
    let data:any={
      password:this.state.form.password,
    }
    if(isEmail){
      data.email=this.state.form.username_email
    }else{
      data.username=this.state.form.username_email
    }
    // backendApi.post('api/login',data).catch((reason)=>{
    //   alert(reason)
    // }).then((res)=>{
    //   console.log(res)
    //   this.props.router.push('/profile')
    // })
    this.props.router.push('/profile')
  }

  render() {
    return (
        <div className='login'>
          <div className='form-groups'>
            <div className='title'>
              Login
            </div>
            <MainInput placeholder='Enter Username/Email' onChange={(event:any)=>this.changeForm(event,'username_email')}/>
            <MainInput placeholder='Enter Password' type="password" onChange={(event:any)=>this.changeForm(event,'password')}/>
          </div>
          <div className='button'>
            <MainButton disable={!this.state.canSubmit} onClick={this.onSubmit}>Login</MainButton>
          </div>
          <div className='question'>
            No account? 
            <span className='link'> Register here</span>
          </div>
        </div>
    )
  }
}

export default function WithRouter(){
  const router = useRouter()
  return(
    <LoginPage router={router}/>
  )
}