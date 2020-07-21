<!-- 实现字母索引两种特效：1.放大；2.曲线渐变 -->
<template>
    <div class='container'>
        <!-- 品牌列表 -->
        <div class="brands" ref="brands">
            <div class="item" v-for="(ele,m) in brands" :key="m+'a'">
                <div class="brand">{{ele.brand}}</div>
                <div class="sub-item" v-for="(data,n) in ele.list" :key="n+'b'">
                    <!-- <img :src="data.img" alt=""> -->
                    <p>{{data.name}}</p>
                </div>
            </div>
        </div>
        <!-- 放大字母 -->
        <div class="circle" ref="circle" v-show="selectLetter&&showBigLetter"> {{selectLetter}} </div>
        <!-- 字母列表 -->
        <div class="rightLetter" @touchmove.prevent>
            <div class='letter' ref="letter" :style="`height:${height}px;line-height:${height}px;`" @touchmove="touchmove" @touchstart="touchstart" @touchend="touchend" v-for="(ele,index) in list" :key="index">{{ele}}</div>
        </div>
    </div>
</template>

<script>
    import brands from './json'
    export default {
        name: 'container',
        data() {
            return {
                brands: [], // 品牌数据
                originalColor: "rgba(251, 35, 20, 1)", // 字母列表默认色值
                letterToTop: 0, // 第一个字母距顶部距离
                moveNum: 11, // 判断曲线范围字母个数
                list: [], // 字母列表
                height: 20, // 每个字母高度
                maxRight: 100, // 曲线最远位置的距离
                targetDOM: null, // 字母元素列表
                brandDOM: null, // 品牌元素列表
                selectLetter: null, // 选中的字母
                showBigLetter: false, // 判断是否显示放大效果
                isMove: false //判断是否手指操作字母
            };
        },
        mounted() {
            this.creatAZ();
            this.brands = brands;
            this.brandDOM = this.$refs.brands.children;
            let arr = [];
            this.$nextTick(() => { // 防止获取undefined
                this.targetDOM = this.$refs.letter;
                for (let i = 0; i < this.brandDOM.length; i++) {
                    arr.push(this.brandDOM[i].offsetTop)
                }
            })
            this.$refs.brands.addEventListener("scroll", e => {
                console.log(this.$refs.brands.scrollTop);
            }, true)


            // 解决fixed定位元素，在页面滚动后touch事件失效问题
            // var locked = false;
            // window.addEventListener("touchstart", e => {
            //     if (e.target.className == "rightLetter" && e.target.className == 'letter') {
            //         this.specialFn(e.touches[0].screenY)
            //     }
            // }, true)
            // // 页面滚动时停止touchend事件冒泡
            // window.addEventListener("touchmove", e => {
            //     if (this.isMove) {
            //         if (e.target.className != "rightLetter" && e.target.className != 'letter') {
            //             e.preventDefault();
            //         }
            //     }
            //     if (e.target.className !== "rightLetter" && e.target.className !== 'letter') {
            //         locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));

            //         function stopTouchendPropagation(ev) {
            //             ev.stopPropagation();
            //             window.removeEventListener('touchend', stopTouchendPropagation, true);
            //             locked = false;
            //         }
            //     }
            // }, true)
        },
        methods: {
            // 创建字母列表
            creatAZ() {
                var str = [];
                for (var i = 65; i < 91; i++) {
                    str.push(String.fromCharCode(i));
                }
                this.list = str;
            },
            touchstart(e) {
                this.showBigLetter = true;
                this.isMove = true;
                this.specialFn(e.touches[0].screenY)
            },
            touchmove(e) {
                // clientY, pageY, screenY
                this.specialFn(e.touches[0].screenY, e)
            },
            touchend() {
                this.showBigLetter = false;
                this.isMove = false;
                this.list.map((letter, k) => {
                    this.setNormal(k);
                })
            },
            // 放大
            specialFn1(screenY) {
                // 选中字母
                let selectIdx = Math.floor((screenY - this.letterToTop) / this.height);
                if (selectIdx >= 0 && selectIdx <= (this.list.length - 1)) {
                    this.showBigLetter ? '' : this.showBigLetter = true;
                    this.selectLetter = this.list[selectIdx];
                    // 25：水滴高度二分之一
                    // console.log(selectIdx, screenY, e.touches[0].pageY, e.touches[0].screenY);
                    this.$refs.circle.style.top = selectIdx * this.height + this.letterToTop + this.height / 2 - 25 + "px";
                    this.brandDOM[selectIdx].scrollIntoView({ block: 'start' });
                } else { // 解决滑到最后一个字母偶发bug
                    this.showBigLetter = false;
                }
            },
            // 实现曲线运动轨迹
            specialFn(screenY) {
                // 正弦曲线公式 y = Asin(wx + b), A是振幅(maxRight) w是角速度 b: Math.PI / 2
                let openWidth = (this.moveNum + 1) * this.height; // 开口宽度
                let w = Math.PI * 2 / (openWidth * 2); //角速度 2PI/T 周期
                let distance = 0; //每个字母垂直方向距手指触摸位置的绝对距离 
                let r = this.height * ((this.moveNum - 1) / 2); // 半个开口长度
                let minDistance = r; // 用于判断选中字母
                let isMIN = true;
                for (let i = 0; i < this.list.length; i++) {
                    distance = Math.abs(i * this.height + this.letterToTop + this.height / 2 - screenY);
                    if (distance < r) { // 在曲线范围内
                        // 假设手指触摸位置screenY为原点，曲线内每个字母距原点的距离为distance
                        this.targetDOM[i].style.right = this.maxRight * Math.sin(w * distance + Math.PI / 2) + "px";
                        this.targetDOM[i].style.color = `rgba(251, 35, 20, ${distance/r})`;
                        this.targetDOM[i].style.fontWeight = 'normal';
                        // 曲线范围内字母从上向下字母距触摸点distance由大变小，再变大
                        if (minDistance > distance) { // 变小的过程，记录最小的距离值
                            minDistance = distance;
                            if (i == 25) this.setSelectItem(25);
                        } else { // 变大的过程，isMIN判断是否第一次变大；当选中的字母不是最后一个时才会走此流程
                            if (isMIN) {
                                isMIN = false;
                                this.setSelectItem(i - 1); // i-1为选中的字母的下标
                            }
                        }
                    } else { // 曲线范围外，right为0 
                        this.setNormal(i);
                    }
                }
            },
            // 设置选中字母状态
            setSelectItem(i) {
                this.brandDOM[i].scrollIntoView({ block: 'start' });
                this.targetDOM[i].style.fontWeight = 900;
                this.targetDOM[i].style.color = this.originalColor;
            },
            // 恢复初始状态
            setNormal(k) {
                this.targetDOM[k].style.right = 0;
                this.targetDOM[k].style.color = this.originalColor;
                this.targetDOM[k].style.fontWeight = 'normal';
            },
        },
    }
</script>
<style lang='scss' scoped>
    div, p, input, textarea {
        -webkit-user-select: auto;
        /*webkit浏览器*/
        -webkit-user-select: auto;
        /*webkit浏览器*/
        -webkit-touch-callout: none;
        /*系统默认菜单被禁用*/
        -webkit-user-select: none;
        /*webkit浏览器*/
        -khtml-user-select: none;
        /*早期浏览器*/
        -moz-user-select: none;
        /*火狐*/
        -ms-user-select: none;
        /*IE10*/
        user-select: none;
    }

    .container {
        position: relative;
        width: 100%;
        overflow: hidden;

        .rightLetter {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            max-height: 100vh;
            color: rgba(251, 35, 20, 1);

            .letter {
                font-family: Arial;
                position: relative;
                right: 0;
            }
        }


        .circle {
            font-family: Arial;
            position: absolute;
            right: 20px;
            height: 50px;
            width: 70px;
            display: flex;
            align-items: center;
            color: #fff;
            font-weight: bold;
            font-size: 26px;
            padding-left: 18px;
            background-image: url('../assets/customCircle.png');
            background-repeat: no-repeat;
            background-size: auto 100%;
        }

        .fixedLetter {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            background: pink;
            padding: 10px 15px 5px;
        }

        .brands {
            margin-right: 23px;
            height: 100vh;
            overflow: auto;
            background: #f1f0f0;

            .item {
                background: #fff;
                margin-bottom: 10px;
                padding: 10px 15px;

                .sub-item {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;

                    img {
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                    }

                }
            }
        }

    }

    // 使用下边css样式有bug-闪；先滚动列表再滚动字母对不上
    // .rightLetter {
    //     position: fixed;
    //     padding: 20px 12px;
    //     right: -2px;
    //     top: 0px;
    //     bottom: 0;
    //     z-index: 99999;
    //     color: rgba(251, 35, 20, 1);
    // }

    // .circle {
    //     position: fixed;
    //     right: 60px;
    //     width: 50px;
    //     height: 50px;
    //     border-radius: 50%;
    //     background: #d4d4d4;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     color: #fff;
    //     text-align: center;
    //     font-size: 22px;

    //     &:after {
    //         content: "";
    //         width: 0;
    //         height: 0;
    //         border-width: 23px;
    //         border-style: solid;
    //         border-color: transparent transparent transparent #d4d4d4;
    //         position: absolute;
    //         left: 36.5px;
    //         top: 2px;
    //     }
    // }

    // .letter {
    //     font-family: Arial;
    //     text-align: right;
    //     position: relative;
    //     right: 0;
    // }

    // .mask {
    //     background: #fff;
    //     position: fixed;
    //     right: 0;
    //     top: 0;
    //     bottom: 0;
    //     left: 0;
    //     z-index: 88888;
    //     opacity: .2;

    // }



    // .brands {
    //     background: #f5f5f5;
    //     margin-right: 40px;

    //     .item {
    //         background: #fff;
    //         margin-bottom: 10px;
    //         padding: 10px 15px;

    //         .sub-item {
    //             margin-top: 20px;
    //             display: flex;
    //             align-items: center;

    //             img {
    //                 border-radius: 50%;
    //                 width: 40px;
    //                 height: 40px;
    //                 margin-right: 10px;
    //             }

    //         }
    //     }
    // }
</style>