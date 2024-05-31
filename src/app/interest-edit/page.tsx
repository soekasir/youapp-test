"use client"

import React, { ChangeEvent, Component } from 'react'
import { MainChip } from '@/components/chips/Chips'
import { CancelIcon } from '@/components/icons/Icons'
import { InputChip } from '@/components/inputs/Input'
import { MainNavigation } from '@/components/navigation/Navigation'
import { profileStore } from '@/services/store/ProfileStore'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

interface InterestEditProps{
  router: AppRouterInstance
}

class InterestEdit extends Component<InterestEditProps> {

  state={
    newInterest:'',
    interest:profileStore.data.interest
  }

  changeNewInterest=(event:ChangeEvent<HTMLInputElement>)=>{
    this.setState({newInterest:event.target.value})
  }

  private handleKeyDown=(keyboardEvent: React.KeyboardEvent<HTMLDivElement>)=>{
    keyboardEvent.stopPropagation();
    console.log(keyboardEvent.key)
    if(keyboardEvent.key===',' || keyboardEvent.key==='Enter'){
      const newInterest=[...this.state.interest]
      newInterest.push(this.state.newInterest)
      setTimeout(()=>{
        this.setState({
          newInterest:'',
          interest:newInterest
        })
      },0)
    }

  }

  onClickSave=()=>{
    profileStore.updateAndSetInterest(this.state.interest).then(()=>{
      this.props.router.push('/profile')
    })
  }

  render() {
    return (
      <>
        <MainNavigation right={ <div className='save' onClick={this.onClickSave}>Save</div> }/>
        <div className='interest-edit'>
          <div className='tell'>
            Tell everyone about yourself
          </div>
          <div className='what'>
            What interest you?
          </div>
          <div className='input'>
            <InputChip onChange={(event:any)=>this.changeNewInterest(event)} onKeyDown={this.handleKeyDown} value={this.state.newInterest}>
              {
                this.state.interest.map((interest:string,index:number)=>{
                  return <MainChip key={interest} icon={<CancelIcon/>}>{interest}</MainChip>
                })
              }
            </InputChip>
          </div>
        </div>
      </>
    )
  }
}

export default function WithRouter(){
  const router = useRouter()
  return(
    <InterestEdit router={router}/>
  )
}
