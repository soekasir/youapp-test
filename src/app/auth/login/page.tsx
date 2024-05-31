"use client"

import React, { ChangeEvent, Component } from 'react'
import { MainButton } from '@/components/buttons/Button'
import { MainInput } from '@/components/inputs/Input'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { backendApi } from '@/services/BackendApi'
import { profileStore } from '@/services/store/ProfileStore'

interface LoginPageProps{
  router: AppRouterInstance
}

class LoginPage extends Component<LoginPageProps> {
  state={
    form:{
      email:"",
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
    const regexToValidateEmail=(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(form.email.match(regexToValidateEmail) && form.password.length>=8){
      canSubmit=true
    }
    return canSubmit
  }

  onSubmit=()=>{
    let data:any={
      password:this.state.form.password,
      email:this.state.form.email,
      username:this.state.form.email
    }
    backendApi.post('api/login',data).catch((reason)=>{
      alert(reason.message)
    }).then((res:any)=>{
      console.log(res.message)
      profileStore.access_token=res.access_token
      this.props.router.push('/profile')
    })
    this.props.router.push('/profile')
  }

  render() {
    return (
        <div className='login'>
          <div className='form-groups'>
            <div className='title'>
              Login
            </div>
            <MainInput placeholder='Enter Email' onChange={(event:any)=>this.changeForm(event,'email')}/>
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