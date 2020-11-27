import { Strophe } from 'strophe.js';
// XMPP服务器BOSH地址
// var BOSH_SERVICE = 'http://101.132.45.229:7070/http-bind/'; // 蔡哥
// var BOSH_SERVICE = 'http://192.168.188.82:7070/http-bind/'; // 后台
var BOSH_SERVICE = 'http://192.168.179.132:7070/http-bind/'; // 安策
// XMPP连接
var connection = null;
// 当前状态是否连接
var connected = false;
// 存放添加好友请求
var addFriend_warn = []

var SERVER_DOMAIN = "ance.yixin.dk";


// `@${SERVER_DOMAIN}`

// 登陆
function login(username, password) {
    console.log("login -> username, password", username, password)
    console.log("login -> connected", connected)

    if (!connected) {
        connection = new Strophe.Connection(BOSH_SERVICE);
        console.log("login -> new Strophe", connection)
        connection.connect(username + `@${SERVER_DOMAIN}`, password, onConnect);
    }
}
// 接收到<message>
function onMessage(msg) {
    console.log("onMessage -> msg", msg)
    // 解析出<message>的from、type属性，以及body子元素
    var from = msg.getAttribute('from');
    console.log(from);

    // var from = msg.getAttribute('from').match(/(\S*)@/)[1];
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');
    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        // 文本
        var text = Strophe.getText(body)
        console.log("onMessage -> text", text)
        if (text.search('data:image') !== -1) {
            // base64图片
            imReceiveMsg(text, "img")
        } else {
            // 可使用jq获取id插入元素 或者使用vue监听由消息则添加
            imReceiveMsg(text, "text")
        }
        // imReceiveMsg(text, "order")
    }
    return true;
}

// 发送
function sendMsg(otherId, myselfId, message) {
    if (connected) {
        var msg = $msg({
            to: otherId + `@${SERVER_DOMAIN}`,
            from: myselfId + `@${SERVER_DOMAIN}`,
            type: 'chat',
            xmlns: "jabber:client"
        }).c("body", null, message);
        connection.send(msg.tree());
        connection.send($pres().tree());
    }
}

// 发送前需要将图片转换成bese64
function sendImg(otherId, myselfId, message) {
    if (connected) {
        var msg = $msg({
            to: otherId + `@${SERVER_DOMAIN}`,
            from: myselfId + `@${SERVER_DOMAIN}`,
            type: 'chat',
            xmlns: "jabber:client"
        }).c("body", null, message);
        connection.send(msg.tree());
        connection.send($pres().tree());
    }
}


function onConnect(status) {
    console.log(status)
    console.log(Strophe.Status)
    if (status == Strophe.Status.CONNFAIL) {
        alert("连接失败！");
    } else if (status == Strophe.Status.AUTHFAIL) {
        alert("登录失败！");
    } else if (status == Strophe.Status.DISCONNECTED) {
        alert("连接断开！");
        connected = false;
    } else if (status == Strophe.Status.CONNECTED) {
        console.log('连接成功')
        connected = true;
        // getFriends()
        // 当接收到<message>节，调用onMessage回调函数
        connection.addHandler(onMessage, null, 'message', null, null, null);
        connection.addHandler(on_subscription_request, null, "presence", "subscribe");
        // 首先要发送一个<presence>给服务器（initial presence）
        connection.send($pres().tree());
    }
}

// 查询好友列表
function findFriends() {
    var friends = [];
    var iq = $iq({ type: 'get' }).c('query', { xmlns: 'jabber:iq:roster' });
    connection.sendIQ(iq, function(a) {
        $(a).find('item').each(function() {
            var jid = $(this).attr('jid').match(/(\S*)@/)[1];
            friends.push(jid)
        });
    });
    return friends
}


// 添加好友
function getFriend(name) {
    console.log("getFriend -> name", name)
    connection.send($pres({ to: name + `@${SERVER_DOMAIN}`, type: "subscribe" }));
}

// 收到好友请求
function on_subscription_request(stanza) {
    console.log("functionon_subscription_request -> stanza", stanza)
    if (stanza.getAttribute("type") == "subscribe") {
        var from = stanza.getAttribute("from").match(/(\S*)@/)[1]
        addFriend_warn.push(from)
    }
    addFriend_warn = Array.from(new Set(addFriend_warn));
    console.log("functionon_subscription_request -> addFriend_warn", addFriend_warn)
    // imReceiveMsg(addFriend_warn, "friends")
}

// 接受邀请
function on_subscription_response(name) {
    connection.send($pres({ to: name + `@${SERVER_DOMAIN}`, type: "subscribed" }));
}
// 拒绝邀请
function on_subscription_reject(name) {
    connection.send($pres({ to: name + `@${SERVER_DOMAIN}`, type: "unsubscribed" }));
}
// 删除好友
function on_subscription_delete(name) {
    connection.send($pres({ to: name + `@${SERVER_DOMAIN}`, type: "unsubscribe" }));
}

export default {
    login,
    sendMsg,
    sendImg,
    findFriends,
    getFriend,
    on_subscription_response,
    on_subscription_request,
    on_subscription_reject,
    addFriend_warn,
    on_subscription_delete
}