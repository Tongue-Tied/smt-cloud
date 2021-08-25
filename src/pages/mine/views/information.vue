<template>
    <div class="information_box">
        <div class="basic_box">
            <div class="title">基本信息</div>
            <div class="basic_content">
                <u-cell-item title="头像">
                    <div>
                        <u-avatar :src="userInfo.headImg"></u-avatar>
                    </div>
                </u-cell-item>
                <u-cell-item title="昵称" @click="cellClick(1)">
                    <span>{{userInfo.userNick || ''}}</span>
                </u-cell-item>
                <u-cell-item title="性别" @click="cellClick(2)">
                    <span>{{userInfo.sex === 1 ? '男' : userInfo.sex === 2 ? '女' : '保密'}}</span>
                </u-cell-item>
                <u-cell-item title="生日" @click="cellClick(3)">
                    <span v-if="userInfo.birthday">{{userInfo.birthday}}&nbsp;&nbsp;{{ageNum}}周岁</span>
                </u-cell-item>
                <u-cell-item @click="cellClick(0)" :border-bottom="false" title="收货地址">
                    <span>{{userInfo.shArea || ''}}{{userInfo.shAddress || ''}}</span>
                </u-cell-item>
            </div>
        </div>
        <div class="basic_box">
            <div class="title">视力情况</div>
            <div class="basic_content">
                <u-cell-item title="是否戴镜" @click="cellClick(4)">
                    <span>{{userInfo.isGrass === 1 ? '是' : '否'}}</span>
                </u-cell-item>
                <u-cell-item :border-bottom="false" @click="cellClick(5)" title="弱视情况">
                    <span>{{userInfo.sls || ''}}</span>
                </u-cell-item>
            </div>
        </div>
        <div class="save_box" @click="save">保存</div>
        <mPopup :show="show" @updateUser="updateUser" @closePopup="closePopup" :title="title">
            <div class="username" v-if="clickIndex === 1">
                <input placeholder="请输入新昵称" v-model="userName" type="text">
            </div>
            <div class="sex" v-if="clickIndex === 2">
                <u-radio-group v-model="value" width="20%" shape="square" :wrap="true" active-color="#ff2724">
                    <u-radio
                        @change="radioChange"
                        v-for="(item, index) in list" :key="index"
                        :name="item.name"
                    >
                        {{item.text}}
                    </u-radio>
                </u-radio-group>
            </div>
            <div class="sex" v-if="clickIndex === 4">
                <u-radio-group v-model="isGrass" width="20%" shape="square" :wrap="true" active-color="#ff2724">
                    <u-radio
                        @change="radioChange"
                        v-for="(item, index) in grassList" :key="index"
                        :name="item.name"
                    >
                        {{item.text}}
                    </u-radio>
                </u-radio-group>
            </div>
            <div class="sls" v-if="clickIndex === 5">
                <!-- <u-radio-group v-model="isGrass" width="20%" shape="square" :wrap="true" active-color="#ff2724">
                    <u-radio
                        @change="radioChange"
                        v-for="(item, index) in slsList" :key="index"
                        :name="item.name"
                    >
                        {{item.text}}
                    </u-radio>
                </u-radio-group> -->
                <u-checkbox
                    @change="checkboxChange(item)"
                    v-model="item.checked"
                    v-for="(item, index) in slsList" :key="index"
                    :name="item.name"
                    class="my_checkbox"
                >{{item.text}}</u-checkbox>
            </div>
        </mPopup>
        <u-picker mode="time" @confirm="pickerConfirm" v-model="dateShow" :default-time="defaultTime" end-year="2022"></u-picker>
    </div>
</template>
<script>
import mPopup from '@/components/m-popup.vue';
import api from '@/services/api.public.js';
export default {
    data() {
        return {
            userInfo: null,
            show: false,
            title: '',
            userName: '',
            clickIndex: '',
            list: [
                {
                    name: 0,
                    text: '保密',
                    checked: false
                },
                {
                    name: 2,
                    text: '女',
                    checked: false
                },
                {
                    name: 1,
                    text: '男',
                    checked: false
                }
            ],
            grassList: [
                {
                    name: 1,
                    text: '是',
                    checked: false
                },
                {
                    name: 2,
                    text: '否',
                    checked: false
                }
            ],
            slsList: [
                {
                    name: 1,
                    text: '有近视',
                    checked: false
                },
                {
                    name: 2,
                    text: '有散光',
                    checked: false
                },
                {
                    name: 3,
                    text: '有远视',
                    checked: false
                },
                {
                    name: 4,
                    text: '有斜视',
                    checked: false
                },
                {
                    name: 5,
                    text: '有其他情况',
                    checked: false
                }
            ],
            value: 1,
            isGrass: 1,
            dateShow: false,
            defaultTime: '',
            ageNum: '',
            slsParmasList: []
        };
    },
    components: {
        mPopup
    },
    onShow() {
        this.userInfo.shArea = this.$state().user.shArea;
        this.userInfo.shAddress = this.$state().user.shAddress;
    },
    created() {
        this.userInfo = this.$state().user;
        this.userName = this.userInfo.userNick;
        var reg = /[\u4e00-\u9fa5]/g;
        if (this.userInfo.birthday) {
            this.defaultTime = this.$dayjs(this.userInfo.birthday.replace(reg, '')).format('YYYY-MM-DD');
            this.ageNum = this.$dayjs(Date.now()).diff(this.defaultTime, 'y');
        } else {
            this.defaultTime = this.$dayjs(Date.now()).format('YYYY-MM-DD');
        }
        this.value = this.userInfo.sex;
        this.isGrass = this.userInfo.isGrass;
        if (this.userInfo.sls) {
            this.slsParmasList = this.userInfo.sls.split(',');
        }
        for (let i = 0; i < this.slsList.length; i++) {
            let temp = this.slsParmasList.find((e) => e === this.slsList[i].text);
            if (temp) {
                this.slsList[i].checked = true;
            }
        }
    },
    methods: {
        closePopup(e) {
            this.show = false;
        },
        cellClick(e) {
            switch (e) {
                case 0:
                    uni.navigateTo({ url: '/pages/index/address/address' });
                    break;
                case 1:
                    this.title = '修改用户名';
                    this.show = true;
                    break;
                case 2:
                    this.title = '修改性别';
                    this.show = true;
                    break;
                case 3:
                    // this.title = '修改生日';
                    this.dateShow = true;
                    break;
                case 4:
                    this.title = '是否戴镜';
                    this.show = true;
                    break;
                case 5:
                    this.title = '弱视情况';
                    this.show = true;
                    break;
                default:
                    break;
            }
            this.clickIndex = e;
        },
        uploadImg() {
            uni.chooseImage({
                count: 1, // 默认9
                type: 'image', // 可以指定是原图还是压缩图，默认二者都有
                success: function(res) {
                    console.log(res);
                    // uni.uploadFile({
                    //     url: ' https://app.ruoshixunlianbao.com/api/uploadImg', // 后端api接口
                    //     filePath: res.tempFilePaths[0].path, // uni.chooseImage函数调用后获取的本地文件路劲
                    //     name: 'file', // 后端通过'file'获取上传的文件对象(字段)
                    //     formData: {
                    //         // openid:_self.openid,  //剩下的字段
                    //     },
                    //     header: { 'Content-Type': 'multipart/form-data;charset=utf-8' },
                    //     success: (res) => {
                    //         console.log(res);
                    //     },
                    //     error(res1) {
                    //         console.log(res1);
                    //     }
                    // });
                    // let data = {
                    //     file: JSON.stringify(res.tempFiles[0])
                    // };
                    // api.uploadImg(data).then(
                    //     res => {
                    //         console.log(res);
                    //     }
                    // );
                    // eslint-disable-next-line no-undef
                    // const fs = wx.getFileSystemManager();
                    // fs.readFile({
                    //     // eslint-disable-next-line no-undef
                    //     filePath: res.tempFilePaths[0],
                    //     encoding: 'utf8',
                    //     position: 0,
                    //     success(res) {
                    //         let data = {
                    //             file: res.data
                    //         };
                    //         api.uploadImg(data).then(
                    //             res => {
                    //                 console.log(res);
                    //             }
                    //         );
                    //         console.log(res.data);
                    //     },
                    //     fail(res) {
                    //         console.error(res);
                    //     }
                    // });
                    // wx.getFileSystemManager().readFile(
                    //     {
                    //         filePath: res.tempFilePaths[0],
                    //         encoding: 'base64',
                    //         success: response => {
                    //             let base64 = 'data:image/png;base64,' + response.data;
                    //             console.log(base64);
                    //             let data = {
                    //                 file: base64
                    //             };
                    //             api.uploadImg(data).then(
                    //                 res => {
                    //                     console.log(res);
                    //                 }
                    //             );
                    //         }
                    //     }
                    // );
                }
            });
        },
        radioChange(e) {
            console.log(e);
        },
        pickerConfirm(e) {
            this.defaultTime = `${e.year}-${e.month}-${e.day}`;
            this.ageNum = this.$dayjs(Date.now()).diff(this.defaultTime, 'y');
            this.userInfo.birthday = `${e.year}年${e.month}月${e.day}日`;
        },
        checkboxChange(e) {
            let temp = this.slsParmasList.findIndex((t) => {
                if (t) {
                    return t === e.text;
                }
            });
            if (temp < 0) {
                this.slsParmasList.push(e.text);
            } else {
                this.slsParmasList.splice(temp, 1);
            }
        },
        updateUser(e) {
            switch (this.clickIndex) {
                case 1:
                    this.userInfo.userNick = this.userName;
                    break;
                case 2:
                    this.userInfo.sex = this.value;
                    break;
                case 4:
                    this.userInfo.isGrass = this.isGrass;
                    break;
                case 5:
                    this.userInfo.sls = this.slsParmasList.join(',');
                    break;
                default:
                    break;
            }
            this.show = false;
        },
        save() {
            this.$loading.open();
            let data = {
                userNick: this.userName,
                isGrass: this.isGrass,
                sex: this.value,
                sls: this.userInfo.sls,
                birthday: this.$dayjs(this.defaultTime).format('YYYY年MM月DD日')
            };
            api.updateUserInfo(data).then(
                res => {
                    if (res.code === 1) {
                        this.$loading.close();
                        setTimeout(() => {
                            this.$toast('保存成功');
                        }, 100);
                        uni.navigateBack({ delta: 1 });
                    }
                }
            );
        }
    }
};
</script>
<style lang="less">
page{
    background: #f5f5f5;
}
.h-popup /deep/ .u-drawer{
        overflow: visible!important;
        .u-drawer-content{
            overflow: visible!important;
            display: flex;
            .u-mode-center-box{
                background-color: #99999900!important;
                overflow: visible!important;
            }
            .uni-scroll-view{
                overflow: visible!important;
            }
        }
}
.information_box{
    padding: 0 30rpx;
    .basic_box{
        padding-top: 30rpx;
        .title{
            color: #333333;
            font-size: 34rpx;
        }
        .basic_content{
            background: #ffffff;
            border-radius: 40rpx;
            margin-top: 30rpx;
            span{
                color: #333333 !important;
            }
        }
    }
    .save_box{
        width: 100%;
        height: 90rpx;
        background: #ff2724;
        color: #ffffff;
        border-radius: 50rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 60rpx;
    }
    .username{
        background: #f5f5f5;
        width: 80%;
        height: 100rpx;
        margin: 0 auto;
        display: flex;
        align-items: center;
        border-radius: 50rpx;
        input{
            flex: 1;
            padding-left: 20rpx;
        }
    }
    .sex{
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .u-radio-group{
            width: 30%;
            margin: 0 auto;
        }
    }
    .sls{
        width: 600rpx;
        margin: 0 auto;
        display: flex;
        padding-left: 13%;
        flex-wrap: wrap;
        .my_checkbox{
        }
    }
}
</style>
