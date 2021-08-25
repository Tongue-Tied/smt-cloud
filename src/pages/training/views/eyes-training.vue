<template>
    <div class="eyes_training" v-if="flag">
        <div class="title">以下放松训练,选择一项即可</div>
        <div class="eyes_box">
            <div class="eyes_item" v-for="(item, index) in list" :key="index">
                <div class="music_box">
                    <image :src="musicImage" style="width:60rpx;height:60rpx"></image>
                    <span>{{item.name}}(下方复视频教程)</span>
                </div>
                <div class="audio_box">
                    <div class="line">
                        <u-line-progress height="5" active-color="#F7CED4" :percent="item.audioTime">
                            <div slot="default"></div>
                        </u-line-progress>
                        <div class="my_progress" :style="'left:'+item.audioTime+'%'"></div>
                    </div>
                    <div class="u-p-r-15" @click="audioChange(index)" v-if="item.isAudioPlay">
                        <u-icon name="play-right-fill" size="38" color="#FF003B"></u-icon>
                    </div>
                    <div class="u-p-r-15" @click="audioChange(index)" v-else>
                        <u-icon name="pause" size="38" color="#FF003B"></u-icon>
                    </div>
                    <audio v-if="isH5" ref="audio" :id="'audio'+ (index + 1)" @timeupdate="timeupdate(index,$event)" :src="item.url">
                        <source :src="item.url" type="audio/ogg">
                        <source :src="item.url" type="audio/mpeg">
                    </audio>
                </div>
                <div v-if="timeShow" class="audio_box">
                    <div>{{$dayjs(item.audioPlayTime).format('mm:ss')}}/<span v-if="item.duration">{{item.duration}}</span></div>
                    <div>{{item.isAudioPlay ? '播放':'暂停'}}</div>
                </div>
                <div class="video_box">
                    <video :src='item.videoUrl' :id="'myVideo'+index" :poster="item.image" :controls='false' :show-center-play-btn='false' >
                        <image @click.stop='bindplay' class="cover" :style="'display:'+item.index===videoindex?'block':'none'" :data-index='index'>
                        </image>
                        <button v-show="!item.isVideoPlay" class="play_btn" @click.stop='bindplay' :data-pid="'myVideo'+index" :data-index='index'>
                            <u-icon class="my_icon" color="#ffffff" size="50" name="play-right-fill"></u-icon>
                        </button>
                    </video>
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>
<script>
import api from '@/services/api.training.js';
export default {
    data() {
        return {
            list: [],
            isAudioPlay: true,
            audioPlayTime: 0,
            flag: false,
            timeShow: false,
            isH5: true,
            videoindex: '',
            musicImage: require('@/static/imgs/training/yinfu.png')
        };
    },
    onUnload() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].audioContext.pause();
            this.list[i].isAudioPlay = true;
        }
    },
    async created() {
        this.$loading.open();
        let data = {
            type: 1
        };
        let res = await api.getGameEyeList(data);
        if (res.code === 1) {
            this.list = res.retArr;
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].audioPlayTime = 0;
                this.list[i].audioTime = 0;
                this.list[i].isAudioPlay = true;
                this.list[i].isVideoPlay = false;
                // #if H5
                // this.flag = true;
                // #endif
            }
        }

        for (let i = 0; i < this.list.length; i++) {
            // #if MP-WEIXIN
            this.isH5 = false;
            // eslint-disable-next-line no-undef
            this.list[i].audioContext = wx.createInnerAudioContext('xixi');
            this.list[i].audioContext.src = (this.list[i].url);
            // eslint-disable-next-line no-undef
            this.list[i].videoContext = wx.createInnerAudioContext(`video${i}`);
            this.list[i].videoContext.src = (this.list[i].videoUrl);
            this.list[i].audioContext.onCanplay((e) => {
                // eslint-disable-next-line no-unused-expressions
                this.list[i].audioContext.duration;
                setTimeout(() => {
                    this.list[i].duration = this.$dayjs(this.list[i].audioContext.duration * 1000).format('mm:ss');
                    console.log(this.list[i].duration);
                    if (i === (this.list.length - 1)) {
                        this.timeShow = true;
                        this.flag = false;
                        setTimeout(() => {
                            this.flag = true;
                            this.$loading.close();
                        }, 1000);
                    }
                }, 500);
            });
            // #endif
            // #if H5
            this.$nextTick(() => {
                let audio = document.querySelector(`#audio${(i + 1)} audio`);
                audio.addEventListener('loadedmetadata', () => {
                    this.list[i].duration = this.$dayjs(audio.duration * 1000).format('mm:ss');
                    if (i === (this.list.length - 1)) {
                        this.timeShow = true;
                        this.flag = false;
                        setTimeout(() => {
                            this.flag = true;
                        }, 10);
                    }
                });
            });
            // #endif
        }
    },
    methods: {
        audioChange(index) {
            // #if MP-WEIXIN
            let audio = this.list[index].audioContext;
            if (this.list[index].isAudioPlay) {
                audio.play();
                this.list[index].isAudioPlay = false;
                console.log(this.list[index].isAudioPlay, '播放');
                this.$forceUpdate();
            } else {
                audio.pause();
                this.list[index].isAudioPlay = true;
                console.log(this.list[index].isAudioPlay, '暂停');
                this.$forceUpdate();
            }
            // this.list[index].isAudioPlay = !this.list[index].isAudioPlay;
            audio.onTimeUpdate((e) => {
                this.list[index].audioPlayTime = audio.currentTime * 1000;
                this.list[index].audioTime = (audio.currentTime / audio.duration) * 100;
                this.list.push('');
                this.list.pop();
            });
            for (let i = 0; i < this.list.length; i++) {
                let audio = this.list[i].audioContext;
                // eslint-disable-next-line no-undef
                let videoCtx = wx.createVideoContext('myVideo' + i);
                this.list[i].isVideoPlay = false;
                // let video = document.querySelector(`#video${i + 1} video`);
                videoCtx.pause();
                console.log(videoCtx);
                if (i !== index) {
                    audio.pause();
                    this.list[i].isAudioPlay = true;
                }
            }
            // #endif
            // let audio = document.querySelector(`#audio${index + 1} audio`);
            // audio.play();
            // this.list[index].isAudioPlay = !this.list[index].isAudioPlay;
            // for (let i = 0; i < this.list.length; i++) {
            //     let audio = document.querySelector(`#audio${i + 1} audio`);
            //     let video = document.querySelector(`#video${i + 1} video`);
            //     video.pause();
            //     if (i !== index) {
            //         audio.pause();
            //         this.list[i].isAudioPlay = true;
            //     }
            // }
        },
        videoPlay(index) {
            // #if MP-WEIXIN
            let video = this.list[index].videoContext;
            // if (this.list[index].isAudioPlay) {
            console.log(video);
            video.play();
            //     this.list[index].isAudioPlay = false;
            //     console.log(this.list[index].isAudioPlay, '播放');
            //     this.$forceUpdate();
            // } else {
            //     video.pause();
            //     this.list[index].isAudioPlay = true;
            //     console.log(this.list[index].isAudioPlay, '暂停');
            //     this.$forceUpdate();
            // }
            // this.list[index].isAudioPlay = !this.list[index].isAudioPlay;
            // video.onTimeUpdate((e) => {
            //     this.list[index].audioPlayTime = video.currentTime * 1000;
            //     this.list.push('');
            //     this.list.pop();
            // });
            // for (let i = 0; i < this.list.length; i++) {
            //     let video = this.list[i].videoContext;
            //     // let video = document.querySelector(`#video${i + 1} video`);
            //     // video.pause();
            //     if (i !== index) {
            //         video.pause();
            //         this.list[i].isAudioPlay = true;
            //     }
            // }
            // #endif
            // let video = document.querySelector(`#video${index + 1} video`);
            // video.play();
            // for (let i = 0; i < this.list.length; i++) {
            //     let audio = document.querySelector(`#audio${index + 1} audio`);
            //     let video = document.querySelector(`#video${i + 1} video`);
            //     audio.pause();
            //     this.list[i].isAudioPlay = true;
            //     if (i !== index) {
            //         video.pause();
            //     }
            // }
        },
        bindplay: function(e) {
            // eslint-disable-next-line dot-notation
            // var id = e.currentTarget.dataset['pid'];
            // eslint-disable-next-line dot-notation
            var videoindex = e.currentTarget.dataset['index'];
            // eslint-disable-next-line no-undef
            var videoCtx = wx.createVideoContext('myVideo' + videoindex); // 获取点击的视频
            if (this.videoindex === '') { // 没有其他视频播放时
                this.videoindex = videoindex;
                this.list[videoindex].isVideoPlay = true;
                videoCtx.play(); // 播放点击的视频
            } else { // 有其他视频正在播放
                console.log(this.videoindex);
                // eslint-disable-next-line no-undef
                var videoCtxPrev = wx.createVideoContext('myVideo' + this.videoindex); // 找到当前正在播放的视频
                // this.list[this.videoindex].isVideoPlay = false;
                videoCtxPrev.pause(); // 暂停
                console.log(this.videoindex);
                // 播放点击的视频
                if (this.videoindex === videoindex) {
                    if (!this.list[videoindex].isVideoPlay) {
                        videoCtx.play();
                    } else {
                        videoCtx.pause();
                    }
                    this.list[videoindex].isVideoPlay = !this.list[videoindex].isVideoPlay;
                    console.log(this.list[videoindex].isVideoPlay);
                } else {
                    videoCtx.play();
                    this.list[videoindex].isVideoPlay = true;
                    this.list[this.videoindex].isVideoPlay = false;
                    this.videoindex = videoindex;
                }
            }
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].audioContext.pause();
                this.list[i].isAudioPlay = true;
            }
            this.$forceUpdate();
        },
        timeupdate(index, e) {
            this.list[index].audioPlayTime = e.target.currentTime * 1000;
            this.list[index].audioTime = (e.target.currentTime / e.target.duration) * 100;
            this.list.push('');
            this.list.pop();
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
    padding-bottom: calc(env(safe-area-inset-bottom));
}
.eyes_training{
    div,span{
        font-size: 26rpx;
    }
    .title{
        width: 100%;
        padding: 30rpx 0 0 0;
        text-align: center;
    }
    .eyes_box{
        width: 90%;
        margin:0 auto;
        .eyes_item{
            background: #ffffff;
            padding: 30rpx;
            margin-top: 30rpx;
            border-radius: 60rpx;
            .music_box{
                display: flex;
                align-items: center;
                :nth-child(2){
                    padding-left: 30rpx;
                }
            }
            .audio_box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 30rpx;
                color: #999999;
                font-size: 24rpx;
                .line{
                    flex: .85;
                    display: flex;
                    align-items: center;
                    position: relative;
                    u-line-progress{
                        width: 100% !important;
                        display: flex;
                        align-items: center;
                    }
                    .my_progress{
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translate(0,-50%);
                        width: 20rpx;
                        height: 20rpx;
                        border-radius: 100%;
                        background: rgb(255, 39, 66);
                    }
                }
            }
            .video_box{
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 60rpx;
                position: relative;
                video{
                    border-radius: 40rpx;
                }
                .play_btn{
                    width: 100rpx;
                    height: 100rpx;
                    background: #58585896;
                    border-radius: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    z-index: 10000000;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    .my_icon{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
        }
            }
        }
    }
    .cover{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        .play_btn{
            width: 100rpx;
            height: 100rpx;
            background: #58585896;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 10000000;
            cover-view{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                left: 0;
                top: 5rpx;
                background: none !important;
            }
            // .my_icon{
            //     position: absolute;
            //     left: 50%;
            //     top: 0;
            // }
        }
    }
}
</style>
