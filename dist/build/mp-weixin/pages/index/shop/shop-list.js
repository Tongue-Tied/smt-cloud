(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/shop/shop-list"],{"03d2":function(n,t,e){"use strict";var o=e("54cb"),i=e.n(o);i.a},"1ac5":function(n,t,e){"use strict";e.r(t);var o=e("2193"),i=e.n(o);for(var u in o)["default"].indexOf(u)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(u);t["default"]=i.a},2193:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(e("4795")),i=u(e("2add"));function u(n){return n&&n.__esModule?n:{default:n}}function a(n,t,e,o,i,u,a){try{var r=n[u](a),s=r.value}catch(c){return void e(c)}r.done?t(s):Promise.resolve(s).then(o,i)}function r(n){return function(){var t=this,e=arguments;return new Promise((function(o,i){var u=n.apply(t,e);function r(n){a(u,o,i,r,s,"next",n)}function s(n){a(u,o,i,r,s,"throw",n)}r(void 0)}))}}var s={data:function(){return{goodsList:[],page:0,pageSize:6,status:"loadmore",iconType:"flower",loadText:{loadmore:"轻轻上拉",loading:"努力加载中",nomore:"没有更多了"}}},onShow:function(){this.getGoodsList()},methods:{back:function(){n.navigateBack({delta:1})},getGoodsList:function(){var n=this;this.page+=1,this.$loading.open();var t={page:this.page,pageSize:this.pageSize,scoreType:1};i.default.getGoodsList(t).then((function(t){if(t.retObj.totalNum===n.goodsList.length)return n.status="nomore",void n.$loading.close();0===n.goodsList.length&&(n.status="nomore"),n.goodsList=n.goodsList.concat(t.retObj.items),n.$loading.close()}),(function(t){n.page-=1,n.$loading.close()}))},goToDetails:function(t){n.navigateTo({url:"/pages/index/shop/shop-detail?id=".concat(JSON.stringify(t.id))})},toCarList:function(){n.navigateTo({url:"/pages/index/shopping-car/shopping-car"})}},onPullDownRefresh:function(){var t=this;return r(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.page=0,t.goodsList=[],t.getGoodsList(),setTimeout((function(){n.stopPullDownRefresh()}),100);case 4:case"end":return e.stop()}}),e)})))()},onReachBottom:function(){this.getGoodsList()}};t.default=s}).call(this,e("543d")["default"])},"331e":function(n,t,e){"use strict";(function(n){e("6cdc"),e("921b");o(e("66fd"));var t=o(e("8a03"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"54cb":function(n,t,e){},"8a03":function(n,t,e){"use strict";e.r(t);var o=e("eecf"),i=e("1ac5");for(var u in i)["default"].indexOf(u)<0&&function(n){e.d(t,n,(function(){return i[n]}))}(u);e("03d2");var a,r=e("f0c5"),s=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=s.exports},eecf:function(n,t,e){"use strict";e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return o}));var o={uNavbar:function(){return e.e("node-modules/uview-ui/components/u-navbar/u-navbar").then(e.bind(null,"87cd"))},uIcon:function(){return e.e("node-modules/uview-ui/components/u-icon/u-icon").then(e.bind(null,"f86b"))},uLoadmore:function(){return e.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(e.bind(null,"eb64"))}},i=function(){var n=this,t=n.$createElement;n._self._c},u=[]}},[["331e","common/runtime","common/vendor"]]]);