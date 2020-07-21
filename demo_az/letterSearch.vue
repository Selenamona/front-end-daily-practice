<!-- 实现字母索引特效：放大  -->
<template>
    <div class='container'>
        <div class="fixedLetter" ref="fixedLetter" v-show="fixedTitle">{{fixedTitle}}</div>
        <!-- 放大字母 -->
        <div class="circle" ref="circle" v-show="showBigLetter"> {{selectLetter}} </div>
        <!-- 字母列表 -->
        <div class="rightLetter" @touchmove.prevent>
            <div class='letter' ref="letter" :style="`height:${height/100}rem;line-height:${height/100}rem;`" @touchmove="touchmove" @touchstart="touchstart" @touchend="touchend" @touchcancel="touchend" v-for="(ele,index) in letterList" :key="index">{{ele}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'container',
        props: {
            letterList: { // 字母列表
                type: Array,
                default: []
            },
            isShow: { // 判断是否显示主品牌列表
                type: Boolean,
            }
        },
        data() {
            return {
                height: 16, // 每个字母高度
                selectLetter: null, // 选中的字母
                showBigLetter: false, // 判断是否显示放大效果
                scrollWrap: null, // 滚动元素
                isSetScroll: false, // 判断页面是否已有监
                startX: 0,
                scrollY: -1,
                listHeight: [],
                currentIndex: 0,
                fixedTop: -1,
                diff: -1,
            };
        },
        watch: {
            letterList() {
                // 正向选择-获取滚动元素 letterList 有值代表获取列表接口请求成功,品牌列表渲染完成
                this.scrollWrap = this.$parent.$refs.carBrands;
                this.calculateTotalHeight();
                if (!this.isSetScroll) this.scrollWrap.addEventListener("scroll", this.setLetterPosition);
            },
            isShow() { // 根据一级列表是否显示,判断是否取消监听,防止其他列表页面滚动报错
                if (this.isShow) {
                    this.isSetScroll = true;
                    if (!this.scrollWrap) this.scrollWrap = this.$parent.$refs.carBrands; // 逆向反显-获取滚动元素；
                    this.scrollWrap.addEventListener("scroll", this.setLetterPosition)
                } else {
                    this.scrollWrap.removeEventListener("scroll", this.setLetterPosition)
                }
            },
            scrollY(newY) {
                var listHeight = this.listHeight
                // 当滚动到顶部时， newY<=0
                if (newY <= 0) {
                    this.currentIndex = 0
                    return;
                }
                // 中间部分滚动
                for (var i = 0; i < listHeight.length - 1; i++) {
                    var height1 = listHeight[i]
                    var height2 = listHeight[i + 1]
                    if (!height2 || (newY >= height1 && newY < height2)) {
                        this.currentIndex = i
                        this.diff = height2 - newY
                        return
                    }
                }
                // 滚动到底部且newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 1;
            },
            diff(newVal) {
                var fixedTop = (newVal - 45) < 0 ? newVal - 45 : 0
                if (this.fixedTop === fixedTop) {
                    return false;
                }
                this.fixedTop = fixedTop;
                this.$refs.fixedLetter.style.transform = `translate3d(-50%,${fixedTop}px,0)`
            }
        },
        computed: {
            fixedTitle() {
                return this.letterList[this.currentIndex] ? this.letterList[this.currentIndex] : 'A'
            }
        },
        methods: {
            // 设置置顶字母特效
            setLetterPosition(e) {
                this.scrollY = this.scrollWrap.scrollTop;
            },
            touchstart(e) {
                this.showBigLetter = true;
                this.startX = e.changedTouches[0].clientX;
                this.specialFn(e.changedTouches[0].clientY)
            },
            touchmove(e) {
                if (!this.showBigLetter) this.showBigLetter = true;
                this.specialFn(e.changedTouches[0].clientY)
            },
            touchend() {
                this.showBigLetter = false;
            },
            // 放大
            specialFn(screenY) {
                // 根据坐标点获取对应元素
                var currentItem = document.elementFromPoint(this.startX, screenY);
                if (!currentItem || !currentItem.classList.contains('letter')) {
                    this.showBigLetter = false;
                    return;
                }
                this.selectLetter = currentItem.innerText;
                this.currentIndex = this.letterList.indexOf(this.selectLetter);
                // 25：水滴高度二分之一
                this.$refs.circle.style.top = currentItem.getBoundingClientRect().top + this.height / 2 - 25 + "px";
                // 字母对应品牌距父元素顶部高度
                this.$parent.$refs.carBrands.scrollTop = this.listHeight[this.currentIndex];
            },
            calculateTotalHeight() {
                var list = this.scrollWrap.children;
                var height = 0
                this.listHeight.push(height)
                for (var i = 0; i < list.length; i++) {
                    var item = list[i]
                    height += item.offsetHeight;
                    this.listHeight.push(height)
                }
            }
        }
    }
</script>
<style lang='scss' scoped>
    .container {

        // 相对first-level定位
        .fixedLetter {
            position: absolute;
            width: 100%;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            line-height: 1;
            z-index: 8888; // 比顶部固定搜索层级低
            color: #090932;
            font-weight: 700;
            font-size: .2rem;
            padding: .2rem .15rem .06rem;
            background: #fff;
        }

        // 相对first-level定位
        .rightLetter {
            background: #fff;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 9999;
            color: #B9BBBE;
            line-height: 1;
            font-size: .12rem;

            .letter {
                padding: 0 .05rem 0 .15rem;
            }
        }

        // 相对窗口定位
        .circle {
            position: fixed;
            z-index: 99999;
            right: .2rem;
            height: .5rem;
            width: .7rem;
            display: flex;
            align-items: center;
            color: #fff;
            font-weight: bold;
            font-size: .26rem;
            padding-left: .18rem;
            background-image: url('../../../../../assets/images/customCircle.png');
            background-repeat: no-repeat;
            background-size: auto 100%;
        }
    }
</style>