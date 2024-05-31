"use client"

import React, { Component } from 'react'
import ProfileHero from './components/ProfileHero'
import About from './components/About'
import Interest from './components/Interest'
import { profileStore } from '@/services/store/ProfileStore'
import { MainNavigation } from '@/components/navigation/Navigation'

export default class Profile extends Component {

  componentDidMount(): void {
      profileStore.fetchAndSetProfile()
  }
  render() {
    return (
      <>
        <MainNavigation middle={profileStore.data.username} right="..."/>
        <div className='profile'>
          <ProfileHero/>
          <About/>
          <Interest/>
        </div>
      </>
    )
  }
}
