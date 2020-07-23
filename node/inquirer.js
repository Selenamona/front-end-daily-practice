const inquirer = require('inquirer');

// 实例1
// input
// const promptList = [{
//   type: 'input',
//   message: '设置一个用户名:',
//   name: 'name',
//   default: "test_user" // 默认值
// }, {
//   type: 'input',
//   message: '请输入手机号:',
//   name: 'phone',
//   validate: function (val) {
//     if (val.match(/\d{11}/g)) { // 校验位数
//       return val;
//     }
//     return "请输入11位数字";
//   }
// }];
// confirm
// const promptList = [
//   {
//     type: 'confirm',
//     message: '是否使用监听？',
//     name: 'watch',
//     prefix: '前缀',
//   },
//   {
//     type: 'confirm',
//     message: '是否进行文件过滤？',
//     name: 'filter',
//     suffix: '后缀',
//     when: function (answers) {
//       // 当watch为true的时候才会提问当前问题
//       return answers.watch;
//     },
//   },
// ];

// list
// const promptList = [
//   {
//     type: 'list',
//     message: '请选择一种水果:',
//     name: 'fruit',
//     choices: ['Apple', 'Pear', 'Banana'],
//     filter: function (val) {
//       // 使用 filter 将回答变为小写
//       return val.toLowerCase();
//     },
//   },
// ];

// rawlist
// const promptList = [
//   {
//     type: 'rawlist',
//     message: '请选择一种水果:',
//     name: 'fruit',
//     choices: ['Apple', 'Pear', 'Banana'],
//   },
// ];

// expand
// const promptList = [
//   {
//     type: 'expand',
//     message: '请选择一种水果：',
//     name: 'fruit',
//     choices: [
//       {
//         key: 'a',
//         name: 'Apple',
//         value: 'apple',
//       },
//       {
//         key: 'O',
//         name: 'Orange',
//         value: 'orange',
//       },
//       {
//         key: 'p',
//         name: 'Pear',
//         value: 'pear',
//       },
//     ],
//   },
// ];

// checkbox
// const promptList = [
//   {
//     type: 'checkbox',
//     message: '选择颜色:',
//     name: 'color',
//     choices: [
//       {
//         name: 'red',
//       },
//       new inquirer.Separator(), // 添加分隔符
//       {
//         name: 'blur',
//         checked: true, // 默认选中
//       },
//       {
//         name: 'green',
//       },
//       new inquirer.Separator('--- 分隔符 ---'), // 自定义分隔符
//       {
//         name: 'yellow',
//       },
//     ],
//   },
// ];
// const promptList = [
//   {
//     type: 'checkbox',
//     message: '选择颜色:',
//     name: 'color',
//     choices: ['red', 'blur', 'green', 'yellow'],
//     pageSize: 2, // 设置行数
//   },
// ];

// const promptList = [
//   {
//     type: 'password', // 密码为密文输入
//     message: '请输入密码：',
//     name: 'pwd',
//   },
// ];

const promptList = [
  {
    type: 'editor',
    message: '请输入备注：',
    name: 'editor',
  },
];

inquirer.prompt(promptList).then((answers) => {
  console.log(answers); // 返回的结果
});

// 实例2
// inquirer
//   .prompt([
//     {
//       type: 'confirm',
//       name: 'test',
//       message: 'Are you handsome?',
//       default: true,
//     },
//   ])
//   .then((answers) => {
//     console.log('结果为:');
//     console.log(answers);
//   });
