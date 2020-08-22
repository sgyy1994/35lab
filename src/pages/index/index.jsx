/* eslint-disable react/forbid-elements */
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import Author from '../../components/author'

import './index.scss'

import imgTitle from '../../assets/image/index/title.png'
import imgTitleLight from '../../assets/image/index/title-light.png'
import displayChi from '../../assets/image/display/display-chi.jpg'
import displayMiao from '../../assets/image/display/display-miao-v3.jpg'
import displayKai from '../../assets/image/display/display-kai.jpg'
import imgTubu from '../../assets/image/display/tubu.jpg'
import imgTubuOrigin from '../../assets/image/display/tubu-origin.jpg'
import imgShangyuanankang from '../../assets/image/display/shangyuanankang.jpg'
import imgShangyuanankangOrigin from '../../assets/image/display/shangyuanankang-origin.jpg'
import imgJichedang from '../../assets/image/display/jichedang.jpg'
import imgJichedangOrigin from '../../assets/image/display/jichedang-origin.jpg'
import imgKaizhan from '../../assets/image/display/kaizhan.jpg'
import imgKaizhanOrigin from '../../assets/image/display/kaizhan-origin.jpg'
import imgXiaweiyi from '../../assets/image/display/xiaweiyi.jpg'
import imgXiaweiyiOrigin from '../../assets/image/display/xiaweiyi-origin.jpg'
import imgMaerdaifu from '../../assets/image/display/maerdaifu.jpg'
import imgMaerdaifuOrigin from '../../assets/image/display/maerdaifu-origin.jpg'
import imgChengshenvtuan from '../../assets/image/display/chengshenvtuan.jpg'
import imgChengshenvtuanOrigin from '../../assets/image/display/chengshenvtuan-origin.jpg'

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
    this._displayMiao = [
      { id: 1, url: imgTubuOrigin, name: 'tubu' },
      { id: 2, url: imgShangyuanankangOrigin, name: 'shangyuanankang' },
      { id: 3, url: imgJichedangOrigin, name: 'jichedang' },
      { id: 4, url: imgKaizhanOrigin, name: 'kaizhan' },
      { id: 5, url: imgXiaweiyiOrigin, name: 'xiaweiyi' },
      { id: 6, url: imgMaerdaifuOrigin, name: 'maerdaifu' },
      { id: 7, url: imgChengshenvtuanOrigin, name: 'chengshenvtuan' }
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
    this._item = item
    this.setState({ page: 4 })
  }

  _imgWidth = 0
  _imgHeight = 0
  _imgRate = 0
  _percent = 0
  onDisplayOnLoad(e) {
    e.persist();
    this._imgWidth = Number.parseInt(e.target.clientWidth, 10)
    this._imgHeight = Number.parseInt(e.target.clientHeight, 10)
    this._imgRate = Number((this._imgWidth / this._imgHeight).toFixed(2))
    console.log('_imgWidth', this._imgWidth, '_imgHeight', this._imgHeight, 'rate', this._imgRate)
  }

  _scrollFlag = false
  _scrollLeft = 0
  onDisplayScroll(e) {
    // console.log(e)
    if (this._scrollFlag) return
    this._scrollFlag = true
    this._scrollLeft = e.detail.scrollLeft
    setTimeout(() => {
      this.onDealWithImages()
      this._scrollFlag = false
    }, 100)
  }

  onDealWithImages() {
    const that = this
    const val = that._deviceInfo.windowWidth > that._deviceInfo.windowHeight ? that._deviceInfo.windowWidth : that._deviceInfo.windowHeight
    Taro.createSelectorQuery().select('#img1').boundingClientRect(function (rect) {
      if (rect.left - 100 < val / 2) {
        that._displayMiao[0].url = imgTubu
      } else {
        that._displayMiao[0].url = imgTubuOrigin
      }
    }).exec()
    Taro.createSelectorQuery().select('#img2').boundingClientRect(function (rect) {
      if (rect.left - 100 < val / 2) {
        that._displayMiao[1].url = imgShangyuanankang
      } else {
        that._displayMiao[1].url = imgShangyuanankangOrigin
      }
    }).exec()
    Taro.createSelectorQuery().select('#img3').boundingClientRect(function (rect) {
      if (rect.left - 100 < val / 2) {
        that._displayMiao[2].url = imgJichedang
      } else {
        that._displayMiao[2].url = imgJichedangOrigin
      }
    }).exec()
    Taro.createSelectorQuery().select('#img4').boundingClientRect(function (rect) {
      if (rect.left - 100 < val / 2) {
        that._displayMiao[3].url = imgKaizhan
      } else {
        that._displayMiao[3].url = imgKaizhanOrigin
      }
    }).exec()
    Taro.createSelectorQuery().select('#img5').boundingClientRect(function (rect) {
      if (rect.left - 100 < val / 2) {
        that._displayMiao[4].url = imgXiaweiyi
      } else {
        that._displayMiao[4].url = imgXiaweiyiOrigin
      }
    }).exec()
    Taro.createSelectorQuery().select('#img6').boundingClientRect(function (rect) {
      if (rect.left - 100 < val / 2) {
        that._displayMiao[5].url = imgMaerdaifu
      } else {
        that._displayMiao[5].url = imgMaerdaifuOrigin
      }
    }).exec()
    Taro.createSelectorQuery().select('#img7').boundingClientRect(function (rect) {
      if (rect.left < val) {
        that._displayMiao[6].url = imgChengshenvtuan
      } else {
        that._displayMiao[6].url = imgChengshenvtuanOrigin
      }
    }).exec()
    this.setState({})
  }

  initTransition() {
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
          查无此人设计工作室主营景观、平面、室内等项目类型，凭借着在著名设计院、互联网大厂、知名地产商等企业的多年设计工作经验，
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
      </View>
    )
  }

  renderDisplay() {
    const short = this._item.short || 'miao'
    const imgUrl = {
      'chi': displayChi,
      'miao': displayMiao,
      'kai': displayKai,
      '': displayMiao
    }[short]
    return (
      <View>
        <View className='display-control' onClick={this.changePage.bind(this, 3)}>
          <View className='display-back'></View>
        </View>
        <View className='display-wrapper'>
          <ScrollView scrollX onScroll={this.onDisplayScroll.bind(this)} className='display-scroll'>
            <View className='display-container'>
              <img
                src={imgUrl}
                className='display-img'
                alt='img'
                onLoad={this.onDisplayOnLoad.bind(this)}
              />
              <View className='display-content'>
              {
                short === 'miao' && this._imgRate &&
                this._displayMiao.map(item => {
                  return (
                    <img
                      key={item.id}
                      src={item.url}
                      id={`img${item.id}`}
                      className={`display-item is-${item.name}`}
                      alt={`${item.name}`}
                    />
                  )
                })
              }
              </View>
            </View>
          </ScrollView>
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
