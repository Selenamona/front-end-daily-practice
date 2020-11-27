<!--  -->
<template>
    <div class='test'>
        <Row> <span>账号：</span>
            <Input v-model="userId" placeholder="Enter something..." style="width: 300px" /></Row>
        <Row class="marginTop10"><span>密码：</span>
            <Input v-model="password" placeholder="Enter something..." style="width: 300px" /></Row>
        <Row class="marginTop10"><span>选择好友：</span>
            <RadioGroup v-model="chooseFriend">
                <Radio v-for="(ele,index) in friendsList" :key="ele" :label="ele"></Radio>
                <Radio label="jmwang"></Radio>
                <Radio label="mfcai"></Radio>
                <Radio label="test"></Radio>
                <Radio label="admin"></Radio>
                <Radio label="pan"></Radio>
                <Radio label="abc"></Radio>
                <Radio label="msz"></Radio>
                <Radio label="android"></Radio>
                <Radio label="yy"></Radio>
                <Radio label="mdx"></Radio>
                <Radio label="ance"></Radio>
            </RadioGroup>
        </Row>
        <Button class="marginTop10" type="primary" @click="login">登录</Button>
        <Button class="marginTop10" type="primary" @click="getFriends">获取好友列表</Button>
        <div class="imgchoose">
            <Button class="marginTop10 imgButton" type="primary">选择图片</Button>
            <input class="imgInput" type="file" @change="sendImgMsg">
        </div>
        <Input class="marginTop10" v-model="msgInfo" type="textarea" :rows="4" placeholder="Enter something..." />
        <Button class="marginTop10" type="primary" @click="sendMsg">发送</Button>
        <ul class="chatwrap">
            <li :class="{'right':ele.from=='r' }" v-for="(ele,index) in chatList" :key="index">
                <span>{{ele.time}}</span>
                <p>{{ele.text}}</p>
                <img :src="ele.img" alt="" @click="bigImg(ele.img)">
            </li>
        </ul>
        <Modal v-model="showBigImg" title="查看图片" @on-cancel="showBigImg=false" footer-hide width="800">
            <img :src="selectImg" alt="" @click="bigImg(ele.img)">
        </Modal>
    </div>
</template>

<script>
    import IM from "./openfire"
    export default {
        name: 'test',
        data() {
            return {
                friendsList: [],
                dataSource: [
                    { key: "订单编号", value: "123121312" },
                    { key: "订单编号", value: "123121312" },
                    { key: "订单编号", value: "123121312" },
                    { key: "订单编号", value: "大口径阿萨德那是扩大绿色大使，dasd 马拉松的马路上的马上到" }
                ],
                selectImg: "",
                showBigImg: false,
                userId: "",
                password: "",
                msgInfo: "",
                chooseFriend: "",
                chatList: [{
                    text: "你好啊",
                    from: "l",
                    time: "2012-05-20",
                    type: "msg"
                }]
            };
        },
        mounted() {
            window.imReceiveMsg = this.imReceiveMsg;
            window.getFriends = this.getFriends;
            window.login = this.login;
            // IM.login("abc", "abc")
        },
        methods: {
            getFriends() {
                this.friendsList = IM.findFriends();
            },
            login() {
                IM.login(this.userId, this.password)
            },
            sendMsg() {
                this.chatList.push({
                    text: this.msgInfo,
                    from: "r",
                    time: "2012-05-20"
                })
                console.log(this.chooseFriend, this.userId);
                IM.sendMsg(this.chooseFriend, this.userId, this.msgInfo)
            },
            imReceiveMsg(text, type) {
                if (type == "img") {
                    this.chatList.push({
                        img: text,
                        from: "l",
                        time: "2012-05-20"
                    })
                } else if (type == "order") {
                    this.chatList.push({
                        text: ` <Row class="orderTemplate">
                            <div v-for="(ele,index) in dataSource" :key="index">
                                <Col span="4">{{ele.key}}:</Col>
                                <Col span="20">{{ele.value}}</Col>
                            </div>
                        </Row>`,
                        from: "l",
                        time: "2012-05-20"
                    })
                } else {
                    this.chatList.push({
                        text: text,
                        from: "l",
                        time: "2012-05-20"
                    })
                }
            },
            sendImgMsg(e) {
                console.log(e.target.files, 11);
                // 文件转base64
                var reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                let _this = this;
                reader.onload = function(e) {
                    console.log(reader.result)
                    _this.chatList.push({
                        img: reader.result,
                        from: "r",
                        time: "2012-05-20"
                    })
                    IM.sendMsg(_this.chooseFriend, _this.userId, reader.result)
                }
            },
            bigImg(src) {
                this.selectImg = src;
                this.showBigImg = true;
            }
        },
    }
</script>
<style lang='less' scoped>
    .test {
        padding: 10px;

        .marginTop10 {
            margin-top: 10px;
        }

        .chatwrap {
            margin-top: 30px;

            .right {
                text-align: right;
            }

            img {
                width: 100px;
            }
        }

        .imgchoose {
            position: relative !important;

            .imgInput {
                position: absolute !important;
                left: 0;
                top: 10px;
                height: 30px;
                opacity: 0;
                width: 80px;
            }

        }

        .orderTemplate {
            width: 400px;
            padding: 10px;
            background: #fff;
        }
    }
</style>