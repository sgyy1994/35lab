/* eslint-disable react/forbid-elements */
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Author from '../../components/author'
import './index.scss'
import imgTitle from '../../assets/image/index/title.png'
import imgTitleLight from '../../assets/image/index/title-light.png'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 1, // 1：竖屏 2：横屏
      page: 1, // 1: cover 2: description 3: members
      showLightTitle: false,
      showGlassesLight: false,
      showTips: false
    }
    this._item = {}
    this._membersList = [
      { short: 'chi', name: '嘘！景观', desc: '私家庭院 · 公共景观' },
      { short: 'miao', name: '嘘！平面', desc: '商业插画 · 宣传物料' },
      { short: 'kai', name: '嘘！室内', desc: '商铺展位 · 家装设计' }
    ]
    this._deviceInfo = Taro.getSystemInfoSync()
    console.log(this._deviceInfo)
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.orientationchangeEvent.bind(this))
  }

  orientationchangeEvent() {
    const orientation = window.orientation
    console.log('orientationchange', orientation)
    clearTimeout(this._lightTimeout)
    if (orientation === 0 || orientation === 180) {
      this.setState({ type: 1 })
    } else {
      this.setState({ type: 2, showTips: false }, () => this.initLightTitleController())
    }
  }

  _lightTimeout = null
  _timeoutCount = 0
  _timeoutDefault = 90
  _timeoutLast = 1500
  initLightTitleController() {
    const { showLightTitle } = this.state
    let seconds = this._timeoutDefault
    const max = 17
    if (this._timeoutCount === max) {
      clearTimeout(this._lightTimeout)
      seconds = this._timeoutLast
      this._timeoutCount = 0
    }

    this._lightTimeout = setTimeout(() => {
      this._timeoutCount += 1
      this.setState({ showLightTitle: !showLightTitle }, () => this.initLightTitleController())
    }, seconds)
  }

  _glassTimeout = null
  _glassCount = 0
  _glassTimeList = [1000, 180, 1000, 90, 90, 90]
  initGlassesController() {
    const { showGlassesLight } = this.state
    let seconds = this._glassTimeList[this._glassCount]
    if (this._glassCount === 6) {
      clearTimeout(this._glassTimeout)
      this._glassCount = 0
      seconds = this._glassTimeList[this._glassCount]
    }

    this._glassTimeout = setTimeout(() => {
      this._glassCount += 1
      this.setState({ showGlassesLight: !showGlassesLight }, () => this.initGlassesController())
    }, seconds)
  }

  changePage(newPage) {
    console.log('newPage ', newPage)
    const { page } = this.state
    if (page === newPage) return
    if (newPage !== 1) clearTimeout(this._lightTimeout)
    if (newPage !== 3) clearTimeout(this._glassTimeout)
    this.setState({ page: newPage }, () => {
      if (newPage === 1) {
        this.initLightTitleController()
      } else if (newPage === 3) {
        this.initGlassesController()
      }
    })
  }

  showDisplay(item) {
    console.log(item)
    this._item = item
    this.setState({ page: 4 })
  }

  onDisplayTouchStart(e) {
    const { page } = this.state
    if (page !== 4) return false
    console.log('start', e)
  }

  onDisplayTouchEnd(e) {
    const { page } = this.state
    if (page !== 4) return false
    console.log('end', e)
  }

  renderLandscape() {
    return (
      <View className='landscape'>
        <View className='landscape-row'>
          <View className='landscape-author'>
            <View className='landscape-author-logo'></View>
            <View className='landscape-author-en'></View>
            <View className='landscape-author-zh'></View>
          </View>
          <View className='landscape-right'>
            <View className='landscape-right-35lib'></View>
            <View className='landscape-right-logo'></View>
          </View>
        </View>
        <View className='landscape-tips' onClick={() => this.setState({ showTips: true })}></View>
        <View className='landscape-ling'></View>
      </View>
    )
  }

  renderPortrait() {
    const { page } = this.state
    return (
      <View className='portrait'>
        {page === 1 && this.renderCover()}
        {page === 2 && this.renderDescription()}
        {page === 3 && this.renderMembes()}
        {page === 4 && this.renderDisplay()}
      </View>
    )
  }

  renderCover() {
    const { showLightTitle } = this.state
    return (
      <View className='portrait-wrapper is-space-around' onClick={this.changePage.bind(this, 2)}>
        {
          showLightTitle ?
            <Image src={imgTitleLight} className='portrait-title' alt='title-light' /> :
            <Image src={imgTitle} className='portrait-title' alt='title' />
        }
        <View className='portrait-diamond'></View>
        <Author />
      </View>
    )
  }

  renderDescription() {
    return (
      <View className='portrait-wrapper is-center'>
        <View className='portrait-btn is-prev' onClick={this.changePage.bind(this, 1)}></View>
        <View className='portrait-desc-box'>
          三个武人设计工作室主营景观、平面、室内等项目类型，凭借着在著名设计院、互联网大厂、知名地产商等企业的多年设计工作经验，
          集调研、分析、设计、管理于一体，把握瞬息万变的市场景象，对市场未来趋势及时作出合理的判断，为客户提供最满意的设计效果和最大的商业价值。
        </View>
        <View className='portrait-desc-img'>
          <View className='portrait-desc-brush'></View>
        </View>
        <View className='portrait-btn is-next' onClick={this.changePage.bind(this, 3)}></View>
      </View>
    )
  }

  renderMembes() {
    const { showGlassesLight } = this.state
    return (
      <View className='portrait-wrapper is-center'>
        <View className='portrait-btn is-prev' onClick={this.changePage.bind(this, 2)}></View>
        <View className='portrait-members'>
          {
            this._membersList.map((item, index) => {
              return (
                <View className='portrait-member' key={item.name} onClick={this.showDisplay.bind(this, item)}>
                  <View className={`portrait-member-header is-${item.short}`}>
                    {showGlassesLight && <View className={`portrait-member-glasses is-${item.short}`}></View>}
                    <View className={`portrait-member-hand is-${item.short}`}></View>
                  </View>
                  <View className='portrait-member-bottom'>
                    <View className={`portrait-member-index is-${index + 1}`}></View>
                    <View className='portrait-member-info'>
                      <View className='portrait-member-name'>{item.name}</View>
                      <View className='portrait-member-desc'>{item.desc}</View>
                    </View>
                    <View className='portrait-member-btn'></View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className='portrait-btn is-empty' onClick={this.changePage.bind(this, 4)}></View>
        <View className='portrait-logo'></View>
        <Author />
      </View>
    )
  }

  renderDisplay() {
    const short = this._item.short || 'miao'
    return (
      <View className='display-wrapper'>
        <View className='display-control' onClick={this.changePage.bind(this, 3)}>
          <View className='display-back' onClick={() => console.log('click me!')}></View>
        </View>
        <View className='display'>
          <View className={`display-img is-${short}`}
            onTouchStart={e => this.onDisplayTouchEnd(e)}
            onTouchEnd={e => this.onDisplayTouchEnd(e)}
          ></View>
        </View>
      </View>
    )
  }

  renderTips() {
    return (
      <View className='modal'>
        <View className='modal-wrapper' onClick={() => this.setState({ showTips: false })}>
          <View className='modal-container'>
            <View className='modal-content'>
              <View className='modal-close'></View>
              <View className='modal-title'>无法横屏预览？</View>
              <View className='modal-text'>1.确认手机系统中屏幕旋转模式开启（不要锁屏）</View>
              <View className='modal-text'>2.确认安卓版微信中点击<br />【我】-【设置】-【通用】-【开启横屏模式】</View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { type, showTips } = this.state
    return (
      <View className='index'>
        {type === 1 && this.renderLandscape()}
        {type === 2 && this.renderPortrait()}
        {showTips && this.renderTips()}
      </View>
    )
  }
}
