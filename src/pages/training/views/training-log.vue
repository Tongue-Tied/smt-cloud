<template>
    <div class="t_log">
        <div class="my_tabs">
            <u-tabs :list="list" active-color="#ff2724" inactive-color="#333333" :is-scroll="false" :current="current" @change="change"></u-tabs>
        </div>
        <div class="calender" v-if="!current">
            <div class="select_choose">
                <div @click="pickerShow = true">选择月份</div>
            </div>
            <u-select :default-value="[defaultValue]" v-model="pickerShow" :list="dateList" @confirm="confirm"></u-select>
            <!-- <div class="calenter_box">
                <div class="calenter_item" v-for="(item, index) in calenter" :key="index">
                    <div v-for="(date, dIndex) in item" :key="dIndex">
                        {{date !== '' ? date + 1 : ''}}
                    </div>
                </div>
            </div> -->
            <calendar v-if="reView" :date="defaultValue + 1" />
        </div>
        <div class="log" v-else>
            <div class="log_item" v-for="(item, index) in logList" :key="index">
                <div class="log_item_left">
                    <div>{{$dayjs(item.date).format('YYYY-MM-DD')}}</div>
                    <div>{{$dayjs(item.date).format('HH:mm:ss')}}</div>
                </div>
                <div class="log_item_middle">
                    <div v-for="(gameItem, gIndex) in item.ApiGameName" :key="gIndex">
                        {{gameItem.gameName}}
                    </div>
                </div>
                <div class="log_item_right">
                    <span class="u-font-38 u-p-r-10" style="color:#ff2724">{{(item.minute / 60).toFixed(0)}}</span>
                    <span>分</span>
                    <span class="u-p-r-10 u-p-l-10" style="color:#ff2724">{{item.minute - ((item.minute / 60).toFixed(0) * 60)}}</span>
                    <span>秒</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import calendar from '@/components/calendar.vue';
import api from '@/services/api.public.js';
export default {
    components: {
        calendar
    },
    data() {
        return {
            list: [{
                name: '日历'
            }, {
                name: '训练记录'
            }],
            current: 0,
            pickerShow: false,
            dateList: [
                {
                    value: 1,
                    label: '1月'
                },
                {
                    value: 2,
                    label: '2月'
                },
                {
                    value: 3,
                    label: '3月'
                },
                {
                    value: 4,
                    label: '4月'
                },
                {
                    value: 5,
                    label: '5月'
                },
                {
                    value: 6,
                    label: '6月'
                },
                {
                    value: 7,
                    label: '7月'
                },
                {
                    value: 8,
                    label: '8月'
                },
                {
                    value: 9,
                    label: '9月'
                },
                {
                    value: 10,
                    label: '10月'
                },
                {
                    value: 11,
                    label: '11月'
                },
                {
                    value: 12,
                    label: '12月'
                }
            ],
            defaultValue: this.$dayjs(Date.now()).month(),
            weekList: [
                {
                    value: 7,
                    label: '日'
                },
                {
                    value: 1,
                    label: '一'
                },
                {
                    value: 2,
                    label: '二'
                },
                {
                    value: 3,
                    label: '三'
                },
                {
                    value: 4,
                    label: '四'
                },
                {
                    value: 5,
                    label: '五'
                },
                {
                    value: 6,
                    label: '六'
                }
            ],
            reView: true,
            logList: []
        };
    },
    created() {
        let data = {
            page: 1,
            pageSize: 100
        };
        api.getGameLog(data).then(
            res => {
                if (res.code === 1) {
                    this.logList = res.retObj.items;
                }
            }
        );
    },
    methods: {
        change(e) {
            this.current = e;
        },
        confirm(e) {
            console.log(e, 111);
            this.defaultValue = e[0].value - 1;
            this.reView = false;
            setTimeout(() => {
                this.reView = true;
            }, 0);
            this.title = this.$dayjs().month(e[0].value - 1).format('YYYY年MM月');
            console.log(this.$dayjs().month(e[0].value - 1).format('YYYY年MM月'));
        }
    }
};
</script>
<style lang="less">
page{
    background: #ffffff;
}
.t_log{
    .calender{
        .select_choose{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            div{
                width: 260rpx;
                height: 60rpx;
                background: #e6e6e6ce;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10rpx;
                color: #333333;
                font-size: 28rpx;
            }
        }
        .top{
            .title{
                text-align: center;
                padding: 30rpx 0;
                font-weight: 600;
                color: #333333;
                font-size: 30rpx;
            }
            .week{
                display: flex;
                align-items: center;
                width: 100%;
                div{
                    width: 14%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        .calenter_box{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            color: #333333;
            .calenter_item{
                width: 14%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                div{
                    height: 120rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
    .log{
        .log_item{
            width: 84%;
            margin: 20rpx auto;
            display: flex;
            padding: 30rpx;
            justify-content: space-between;
            align-items: center;
            border-radius: 30rpx;
            border: 10rpx solid #e6e6e6ce;
            .log_item_left{
                color: #333333;
                text-align: center;
                :nth-child(2){
                    font-size: 24rpx;
                }
            }
            .log_item_middle{
                color: #333333;
                font-size: 26rpx;
                div{
                    padding: 8rpx 0;
                }
            }
        }
    }
}
</style>
