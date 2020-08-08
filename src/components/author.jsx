import React, { Component } from 'react'
import { View } from '@tarojs/components'

import './author.scss'

export default class Author extends Component {
  constructor(props)  {
    super(props)
    this.state = {}
  }
  
  render() {
    return(
      <View className='author'>
        <View className='author-container'>
          <View className='author-logo'></View>
          <View className='author-en'></View>
          <View className='author-zh'></View>
        </View>
      </View>
    )
  }
}