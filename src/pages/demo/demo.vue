<template>
    <m-page>
        <!-- <m-navbar></m-navbar> -->
        <view class="">
            <u-sticky class="">
                <view style="background-color: white"
                      class="m-cell-shadow">
                    <m-dropdown>
                        <u-dropdown-item v-model="value1"
                                         title="距离"
                                         :options="options1"></u-dropdown-item>
                        <u-dropdown-item v-model="value2"
                                         title="温度"
                                         :options="options2"></u-dropdown-item>
                    </m-dropdown>
                </view>
            </u-sticky>
            <m-content>
                <u-subsection :list="subsectionList"
                              :current="1"
                              inactive-color="#9AA5B1"></u-subsection>
                <m-card circle
                        class="u-m-t-30 u-m-b-30 u-block">
                    测试
                </m-card>
                <m-dot color="red">
                    <view class="u-flex-1">测试</view>
                    <view class="u-tips-color"
                          slot="value">副标题</view>
                </m-dot>
                <m-dot color="green">
                    <view class="u-flex-1">测试</view>
                </m-dot>
                <view class="u-m-b-30 u-m-t-30 u-flex">
                    <u-button class="m-btn--default u-flex-1 u-m-r-30"
                              @click="show = true">测试</u-button>
                    <u-button class="m-btn--cancel u-flex-1">取消</u-button>
                </view>
                <view class="u-type-extra-primary u-m-t-30">测试</view>

                <!-- <u-icon name="photo"></u-icon>
            <u-image width="100%"
                     height="300rpx"
                     src=""></u-image>

            <u-cell-group>
                <u-cell-item icon="setting-fill"
                             title="个人设置"></u-cell-item>
                <u-cell-item icon="integral-fill"
                             title="会员等级"
                             value="新版本"></u-cell-item>
            </u-cell-group>
            <u-tag text="雪月夜"
                   type="success" />
            <u-calendar v-model="show"
                        :mode="mode"></u-calendar>
            <u-select v-model="show"
                      :list="list"
                      value-name="name"></u-select>
            <u-picker v-model="show"
                      mode="time"></u-picker>
            <u-search placeholder="日照香炉生紫烟"
                      v-model="keyword"></u-search>
            <u-number-box v-model="value"
                          @change="valChange"></u-number-box>
            <u-upload :action="action"
                      :file-list="fileList"></u-upload>
            <u-switch v-model="checked"></u-switch>
            <u-action-sheet :list="list"
                            v-model="show"></u-action-sheet>
            <u-popup v-model="show">
                <view>出淤泥而不染，濯清涟而不妖</view>
            </u-popup>
            <u-modal v-model="show"
                     :content="content"></u-modal>
            <u-mask :show="show"
                    @click="show = false"></u-mask>
            <u-swiper :list="list"></u-swiper>
            <u-sticky>
                <view class="sticky">
                    宝剑锋从磨砺出,梅花香自苦寒来
                </view>
            </u-sticky>
            <u-dropdown>
                <u-dropdown-item v-model="value1"
                                 title="距离"
                                 :options="options1"></u-dropdown-item>
                <u-dropdown-item v-model="value2"
                                 title="温度"
                                 :options="options2"></u-dropdown-item>
            </u-dropdown>
            <u-back-top :scroll-top="scrollTop"></u-back-top>
            <u-tabs :list="list"
                    :is-scroll="false"
                    :current="current"
                    @change="change"></u-tabs>
            <u-link href="http://www.uviewui.com">蜀道难，难于上青天</u-link>
            <u-section title="今日热门"
                       sub-title="查看更多"></u-section>
            <u-loadmore :status="status" />
            <u-avatar :src="src"></u-avatar>
            <u-loading mode="circle"></u-loading>
            <u-tabs-swiper ref="tabs"
                           :list="list"
                           :is-scroll="false"></u-tabs-swiper> -->
            </m-content>
            <view class="m-linear-btn"
                  style="width: 50%">
                <u-button type="primary">渐变按钮</u-button>
            </view>

            <view class="m-plain-primary u-m-t-10"
                  style="width: 50%">
                <u-button class=""
                          plain>渐变按钮</u-button>
            </view>

            <view class="u-p-t-30 u-p-b-30">
                <u-button type="primary"
                          size="large">大的按钮</u-button>
            </view>
            <view class="u-p-l-30 u-p-r-30 u-p-t-30 u-p-b-20">
                <m-dot color="red">
                    <view class="u-flex-1">测试</view>
                    <view class="u-tips-color"
                          slot="value">副标题</view>
                </m-dot>
            </view>
            <u-cell-group :border="false">
                <u-cell-item title="霜叶红于二月花"
                             :arrow="true">
                    <u-icon size="48"
                            slot="icon"
                            :name="'money.png' | oss"
                            class="u-m-r-30"></u-icon>
                </u-cell-item>
                <u-cell-item title="单次服务时长"
                             :arrow="false">
                    <view class="u-flex u-row-right">
                        <m-step-input :value.sync="current"
                                      :min="0"
                                      :format="`${current}分钟`"></m-step-input>
                    </view>
                </u-cell-item>
            </u-cell-group>
            <view style="background-color:white">
                <u-cell-item title="选择日期"
                             @click="dateVisible = true">{{dateValue}}</u-cell-item>
                <m-datepicker :value="dateVisible"
                              :options="dateList"
                              customTitle="自定义日期"
                              @close="dateVisible = false"
                              @confirm="changeDate"></m-datepicker>
                <m-field label="金额"
                         type="number"
                         v-model="price"
                         :format="price | currency"
                         placeholder="请输入金额">
                </m-field>
                <m-field label="金额"
                         type="number"
                         v-model="price"
                         placeholder="请输入金额">
                    <span slot="value"
                          class="u-type-error">{{price | currency}}</span>
                </m-field>
                <u-field label="测试"
                         placeholder="请输入">
                </u-field>
                <u-field label="测试"
                         placeholder="请输入"
                         :border-bottom="false">
                </u-field>
            </view>
            <view class="u-p-t-30">
                <u-empty text="暂无数据"
                         color="#9AA5B1"
                         icon-color="rgb(154 165 177 / 50%)"
                         src="error-circle-fill"></u-empty>
            </view>
            <view class=""
                  style="height: 300px;">
                <qiun-data-charts type="column"
                                  :chartData="chartData" />

            </view>
            <u-popup v-model="show"
                     mode="bottom"
                     border-radius="40"
                     :safe-area-inset-bottom="true">
                <view class="u-p-t-30 u-p-b-30" style="height: 300px;">
                    <u-cell-item title="测试"
                                 :arrow="false"
                                 v-for="(item, index) in 10"
                                 :key="index"
                                 @click="check[index] = check[index];check.splice(index, 1, !check[index]);init()">
                        <m-radio slot="right-icon"
                                 :value="!!check[index]"></m-radio>
                    </u-cell-item>
                    <m-field label="标题"
                             v-model="value"
                             placeholder="请输入标题"></m-field>
                    <view class="u-p-t-30 u-p-l-30 u-p-r-30 u-flex">
                        <u-button class="m-btn--cancel u-flex-1 u-m-r-30"
                                  @click="show = false">取消</u-button>
                        <u-button class="m-btn--default u-flex-1"
                                  @click="show = false">确定</u-button>
                    </view>
                </view>
            </u-popup>
            <div>
                <div style="height: 800px"></div>
                <u-line color="red" />
            </div>
            <m-fixed-bottom>
                <u-button>测试</u-button>
                <u-button type="primary">测试</u-button>
            </m-fixed-bottom>
            <!-- <m-fixed-bottom type="2">
                <u-button plain
                          type="primary">测试</u-button>
                <u-button type="primary">测试</u-button>
            </m-fixed-bottom> -->
            <u-back-top :scroll-top="scrollTop"></u-back-top>
        </view>
    </m-page>
</template>
<script>
import launch from '@/mixins/launch.js';
export default {
    name: 'index',
    mixins: [launch],
    components: {},
    computed: {},
    options: {},
    data() {
        return {
            subsectionList: [{ name: '待发货' }, { name: '待付款' }, { name: '待评价' }],
            current: 1,
            value: '',
            price: undefined,
            scrollTop: 0,
            show: false,
            check: [],
            value1: 1,
            value2: 2,
            options1: [
                {
                    label: '默认排序',
                    value: 1
                },
                {
                    label: '距离优先',
                    value: 2
                },
                {
                    label: '价格优先',
                    value: 3
                }
            ],
            options2: [
                {
                    label: '去冰',
                    value: 1
                },
                {
                    label: '加冰',
                    value: 2
                }
            ],
            dateVisible: false,
            dateValue: '今天',
            dateList: [{ title: '今天', value: '今天' }],
            chartData: {
                categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
                series: [
                    {
                        name: '目标值',
                        data: [35, 36, 31, 33, 13, 34]
                    },
                    {
                        name: '完成量',
                        data: [18, 27, 21, 24, 6, 28]
                    }
                ]
            }
        };
    },
    methods: {
        init(options) {
            console.log(options);
            console.log(this.check);
        },
        changeDate(item) {
            this.dateVisible = false;
            if (item.custom) {
                this.dateValue = this.$dayjs(item.value).format('YYYY-MM-DD HH:mm:ss');
            } else {
                this.dateValue = item.value;
            }
        }
    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
    },
    onPullDownRefresh() {
        setTimeout(() => {
            uni.stopPullDownRefresh();
        }, 500);
    },
    onReachBottom() {}
};
</script>
<style lang="less">
page {
    background-color: @background-color;
}
</style>
