"use client"

import { EditIcon } from '@/components/icons/Icons'
import { SecondInput, SecondSelect } from '@/components/inputs/Input'
import { profileStore } from '@/services/store/ProfileStore'
import { observer } from 'mobx-react'
import moment from 'moment'
import React, { ChangeEvent, Component } from 'react'

@observer
export default class About extends Component {
  state={
    isEditing:false,
    isEmptyProfile: !profileStore.data.name,
    data:profileStore.data
  }

  onChange=(event: ChangeEvent<HTMLInputElement>,key:string)=>{
    let newData={...this.state.data}
    newData[key]=event.target.value
    this.setState({
      data:newData
    })
    // profileStore.data[key]=event.target.value
  }

  editingComponent=()=>{
    return(
      <div className='editing'>
        <div className='form'>
          <div>Display Name:</div>
          <div className='input'>
            <SecondInput
              placeholder="Enter name"
              value={this.state.data.name}
              onChange={(event:any)=>this.onChange(event,'name')}
           />
          </div>
        </div>
        <div className='form'>
          <div>Gender:</div>
          <div className='input'>
          <SecondSelect
            placeholder="Select Gender"
            value={this.state.data.gender}
            onChange={(event:any)=>this.onChange(event,'gender')}
            >
            <option>Select Gender</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>  
          </SecondSelect></div>
        </div>
        <div className='form'>
          <div>Birthday:</div>
          <div className='input'>
            <SecondInput type="date" value={this.state.data.birthday} onChange={(event:any)=>this.onChange(event,'birthday')}/>
          </div>
        </div>
        <div className='form'>
          <div>Horoscope:</div>
          <div className='input'><SecondInput disabled value={profileStore.getHoroscope()} placeholder="--"/></div>
        </div>
        <div className='form'>
          <div>Zodiac:</div>
          <div className='input'><SecondInput disabled value={profileStore.getZodiac()} placeholder="--"/></div>
        </div>
        <div className='form'>
          <div>Height:</div>
          <div className='input'>
            <SecondInput
              placeholder="Add height"
              value={this.state.data.height}
              onChange={(event:any)=>this.onChange(event,'height')}
            />
          </div>
        </div>
        <div className='form'>
          <div>Weight:</div>
          <div className='input'>
            <SecondInput
              placeholder="Add weight"
              value={this.state.data.weigth}
              onChange={(event:any)=>this.onChange(event,'weigth')}
            />
          </div>
        </div>
      </div>
    )
  }

  emptyProfile=()=>{
    return 'Add in your your to help others know you better'
  }

  notEmptyProfile=()=>{
    return(
      <div className='filled-profile'>
        <div className='form'>
          <div>Birthday:</div>
          <div className='value'>{moment(profileStore.data.birthday).format('DD/MM/YYYY')} (Age {profileStore.getAge().toString()})</div>
        </div>
        <div className='form'>
          <div>Horoscope:</div>
          <div className='value'>{profileStore.getHoroscope()}</div>
        </div>
        <div className='form'>
          <div>Zodiac:</div>
          <div className='value'>{profileStore.getZodiac()}</div>
        </div>
        <div className='form'>
          <div>Height:</div>
          <div className='value'>{profileStore.data.height}</div>
        </div>
        <div className='form'>
          <div>Weight:</div>
          <div className='value'>{profileStore.data.weigth}</div>
        </div>
      </div>
    )
  }

  onClickEditing=()=>{
    this.setState({
      isEditing:!this.state.isEditing
    })
  }

  onClickSave=()=>{
    // profileStore.updateAndSetProfile(this.state.data)
  }

  render() {
    return (
      <div className='about'>
        <div className='top-bar'>
          <div>About</div>
          <div onClick={this.onClickEditing} className='edit-icon'>
            {this.state.isEditing ? <span onClick={this.onClickSave}>Save & Update</span> : <EditIcon/>}
          </div>
        </div>
        <div className='content'>
          {this.state.isEditing ? this.editingComponent() : this.state.isEmptyProfile ? this.emptyProfile() : this.notEmptyProfile()}
        </div>
      </div>
    )
  }
}
