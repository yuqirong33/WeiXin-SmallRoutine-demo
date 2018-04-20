// pages/video/video.js
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    audioSrc: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    
    let that = this;

    //摄像头
    this.ctx = wx.createCameraContext();  //创建相机组件控制
    
    //录音 
    this.recorderManager = wx.getRecorderManager();  //创建录音管理器

    //录音错误信息
    this.recorderManager.onError(() => {
      that.tip('录音失败！');
    });

    //录音停止事件
    that.recorderManager.onStop((res) => {  //录音停止返回录音地址
      this.setData({
        audioSrc: res.tempFilePath
      });
      that.tip('录音完成！');
    })

    this.innerAudioContext = wx.createInnerAudioContext();  //创建并返回内部 audio 上下文
    this.innerAudioContext.onError((res) => {
      that.tip('播放录音失败！');
    });
  },

  /**
   * 点击拍照 启动拍照功能
   * takePhoto是createCameraContext下的方法
   *    拍照，可指定质量，成功则返回图片
   */
  takePhoto(){
    this.ctx.takePhoto({ 
      quality:'high',
      success: (res) => { //接口调用成功的回调函数 ，res = { tempImagePath }
        this.setData({
          imgSrc: res.tempImagePath
        })
      }
    })
  },

  /**
   * 点击开始录像 启动录像功能
   * startRecord是createCameraContext下的方法
   *     开始录像
   */
  startRecord(){  
    let that = this;
    this.ctx.startRecord({ 
      success: (res) => {  //接口调用成功的回调函数
        that.tip('开始录像！');
      }
    })
  },

  /**
   * 点击结束录像 停止录像功能
   * stopRecord是createCameraContext下的方法
   *     结束录像
   */
  stopRecordCamera(){
    this.ctx.stopRecord({
      success: (res) => {
          this.setData({
            imgSrc: res.tempImagePath,  //获取照片路径
            videoSrc: res.tempVideoPath  //获取录像路径
           })
       }
    })
  },

  
  /**
   * camera标签报错提示
   */
  error(e) {
    console.log(e.detail)
  },

  /**
   * 录音音频
   */
  startRecordAac() {
    this.recorderManager.start({
      format: 'mp3'
    })
  },


  /**
   * 停止录音
   */
  stopRecord() {
    this.recorderManager.stop();
  },

  /**
   * 播放录音
   */
  playRecord() {
    let that = this;
    let audioSrc = this.data.audioSrc;
    console.log(audioSrc);
    if (!audioSrc) {
      that.tip('请先录音！')
      return;
    }
    
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      // 播放音频失败的回调
      that.tip('播放录音失败！');
    })
    this.innerAudioContext.scr = this.data.audioSrc;
    this.innerAudioContext.play();

  },


  //提示框
  tip(msg){
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel:false
    })
  } 
  
})