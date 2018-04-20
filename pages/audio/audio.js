// pages/audio/audio.js
Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    this.recorderManager = wx.getRecorderManager();  //创建录音管理器

    //录音错误信息
    this.recorderManager.onError(()=>{
      console.log('录音失败！');
    });

    //录音停止事件
    that.recorderManager.onStop((res)=>{  //录音停止返回录音地址
      that.setData({
        src: res.tempFilePath
      });
      console.log(res.tempFilePath)
      console.log('录音完成！');
    })

    //
    this.innerAudioContext = wx.createInnerAudioContext();  //创建并返回内部 audio 上下文
    this.innerAudioContext.onError((res)=>{
      console.log('播放录音失败！');
    });

  },

  

  /**
   * 录音acc音频
   */
  startRecordAac(){
    this.recorderManager.start({
      format:'aac'
    })
  },

  /**
   * 录音mp3音频
   */
  startRecordMp3(){
    this.recorderManager.start({
      format: 'aac'
    })
  },

  /**
   * 停止录音
   */
  stopRecord(){
    this.recorderManager.stop();
  },

  /**
   * 播放录音
   */
  playRecord(){
    let that = this;
    let src = this.data.src;

    if(scr == ''){
      console.log('请先录音！')
      return;
    }

    this.innerAudioContext.scr = this.data.src;
    this.innerAudioContext.play();

  }







  
})