"use client"

import { SecondaryChip } from '@/components/chips/Chips'
import { HoroscopeIcon, ZodiacIcon } from '@/components/icons/Icons'
import { profileStore } from '@/services/store/ProfileStore'
import { observer } from 'mobx-react'
import React, { Component } from 'react'

@observer
export default class ProfileHero extends Component {
  render() {
    return (
      <div className='profile-hero'>
        <img src='/images/example.jpg' alt="image hero" className='image'/>
        <div className='container'>
          <div className='username'>
            {profileStore.data.name}, {profileStore.getAge().toString()||''}
          </div>
          {profileStore.data.gender &&
            <div className='gender'>
              {profileStore.data.gender}
            </div>
          }
          {profileStore.data.birthday &&
            <div className='zodiac'>
              <SecondaryChip icon={<HoroscopeIcon/>}>{profileStore.data.horoscope}</SecondaryChip>
              <SecondaryChip icon={<ZodiacIcon/>}>{profileStore.data.zodiac}</SecondaryChip>
            </div>
          }
        </div>
      </div>
    )
  }
}
