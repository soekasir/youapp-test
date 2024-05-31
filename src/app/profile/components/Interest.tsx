"use client"

import { SecondaryChip } from '@/components/chips/Chips'
import { EditIcon } from '@/components/icons/Icons'
import { profileStore } from '@/services/store/ProfileStore'
import { observer } from 'mobx-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import React, { Component } from 'react'

interface InterestProps{
  router: AppRouterInstance
}

@observer
class Interest extends Component<InterestProps> {

  state={
    isEmptyInterest:!profileStore.data.interest.length
  }

  notEmptyInterest=()=>{
    return(
      <div className='not-empty-interest'>
        {profileStore.data.interest.map((interest:string)=>{
          return <SecondaryChip key={interest}>{interest}</SecondaryChip>
        })}
      </div>
    )
  }


  emptyInterest=()=>{
    return "Add in your interest to find a better match"
  }

  onClickEdit=()=>{
    this.props.router.push('/interest-edit')
  }

  render() {
    return (
      <div className='interest'>
        <div className='top-bar'>
          <div>Interest</div>
          <div onClick={this.onClickEdit}><EditIcon/></div>
        </div>
        <div className='content'>
          {this.state.isEmptyInterest ? this.emptyInterest() : this.notEmptyInterest()}
        </div>
      </div>
    )
  }
}

export default function WithRouter(){
  const router = useRouter()
  return(
    <Interest router={router}/>
  )
}
