"use client"

import React, { Component } from 'react'
import ProfileHero from './components/ProfileHero'
import About from './components/About'
import Interest from './components/Interest'

export default class Profile extends Component {
  render() {
    return (
      <div className='profile'>
        <ProfileHero/>
        <About/>
        <Interest/>
      </div>
    )
  }
}
