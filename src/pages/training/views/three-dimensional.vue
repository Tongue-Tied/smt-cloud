<template>
    <div class="eyes_training" v-if="flag">
        <div class="title">请选择红蓝眼镜（左红右蓝），配戴后进行训练</div>
        <div class="eyes_box">
            <div class="eyes_item" v-for="(item, index) in list" :key="index">
                <div class="music_box">
                    <image :src="musicImage" style="width:60rpx;height:60rpx"></image>
                    <span>{{item.name}}(下方附视频教程)</span>
                </div>
                <div class="video_box">
                    <video :src='item.videoUrl' :id="'myVideo'+index" :data-index='index' :poster="item.image" :controls='false' :show-center-play-btn='false' >
                        <image @click='bindplay' :data-index='index' class="cover" :style="'display:'+item.index===videoindex?'block':'none'">
                        </image>
                        <button v-if="!item.isVideoPlay" class="play_btn" @click.stop='bindplay' :data-pid="'myVideo'+index" :data-index='index'>
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
            musicImage: require('@/static/imgs/training/3d-glasses.png')
        };
    },
    async created() {
        let data = {
            type: 2
        };
        let res = await api.getGameEyeList(data);
        try {
            if (res.code === 1) {
                this.list = res.retArr;
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].audioPlayTime = 0;
                    this.list[i].audioTime = 0;
                    this.list[i].isAudioPlay = true;
                    this.list[i].isVideoPlay = false;
                    this.flag = true;
                }
            }
        } catch (error) {

        }
        for (let i = 0; i < this.list.length; i++) {
            // #if MP-WEIXIN
            this.isH5 = false;
            // eslint-disable-next-line no-undef
            this.list[i].videoContext = wx.createInnerAudioContext(`myVideo${i}`);
            this.list[i].videoContext.src = (this.list[i].videoUrl);
            // #endif
        }
    },
    methods: {
        bindplay: function(e) {
            // let id = e.currentTarget.dataset.pid;
            let videoindex = e.currentTarget.dataset.index;
            // eslint-disable-next-line no-undef
            let videoCtx = wx.createVideoContext('myVideo' + videoindex); // 获取点击的视频
            if (this.videoindex === '') { // 没有其他视频播放时
                this.videoindex = videoindex;
                this.list[videoindex].isVideoPlay = true;
                videoCtx.play(); // 播放点击的视频
            } else { // 有其他视频正在播放
                // eslint-disable-next-line no-undef
                let videoCtxPrev = wx.createVideoContext('myVideo' + this.videoindex); // 找到当前正在播放的视频
                videoCtxPrev.pause(); // 暂停
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
            this.$forceUpdate();
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
                font-size: 25rpx;
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
                    flex: 1;
                    padding:0 160rpx 0 0;
                    display: flex;
                    align-items: center;
                    u-line-progress{
                        width: 100% !important;
                        display: flex;
                        align-items: center;
                    }
                }
            }
            .video_box{
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 60rpx;
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
