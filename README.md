#BUG平台相关技术预研

###前端部分
BUG平台在开需求上被定为一个界面简洁清爽，操作便利，用于内部常见代码问题分享和交流的[单页面应用](https://baike.baidu.com/item/SPA/17536313#viewPageContent)，因此前端部分打算采用相对于`react`、`angular`，稍轻量一些的`Vue`作为框架，同时`Vue`在国内社区具有更为友善的API作为支持，很大程度上能自主解决开发时候遇到的一些问题，提高开发效率。
> 项目SVN：http://172.6.3.91:81/svn/project/issuePlatform
安装模块 `npm install`
启动调试 `npm run dev`
打包发布 `npm run build` / `npm run build --report`
---
##### 涉及技术

 *  `Vue.js 2.0` 当下比较流行的MVVM（model-view-viewmodel）库，采用双向数据绑定和轻量级的Virtual DOM。 比较重要的技术点在**数据的绑定**，**组件**，**路由**等。 相关AIP：https://cn.vuejs.org/v2/guide/instance.html

*  `Vue-router `为了更好的创建单页应用，使用了`vue-router`来映射和渲染组件。相关API：https://router.vuejs.org/zh-cn/installation.html

*  `vuex` 组件相互之间的**通信**问题是开发时需要注意的点，使用`vuex`能**集中式存储管理**应用的所有组件的状态，需要共享的状态和本来繁琐的通讯可以通过`vuex`中的`store`来解决。相关API：https://vuex.vuejs.org/zh-cn/

*  `axios`浏览器发送 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 请求，node.js发送[http](http://nodejs.org/api/http.html)请求，支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API，拦截请求和响应，数据格式转换，自动转换JSON数据等。 相关用法：http://www.cnblogs.com/Juphy/p/7073027.html

* `webpack模块` 静态资源打包，模块打包，代码图片压缩，热更新，ES6语法转换等。相关API：https://doc.webpack-china.org/concepts/

* `bootstrap` 简洁直观的UI框架 相关API：http://v3.bootcss.com/css/
---

###Nodejs部分
后端方面采用基于node.js，快速简介的web框架**`express`**，数据库使用Nosql的`mongodb`
> 项目SVN：http://172.6.3.91:81/svn/project/nodeServer
  安装模块 `npm install`
  启动调试 `npm start` 相当于`node ./bin/www`
  supervisor监听启动 `supervisor ./bin/www`
  pm2 负载均衡启动 `pm2 start ./bin/www --name xxx --watch`
---
##### 涉及技术

 *  `express 4.0` 在`node.js`的web开发框架。相关API：http://www.expressjs.com.cn/4x/api.html

*  `mongodb` 相关API：http://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html

* `monk模块`node.js中mongodb数据库的连接模块，优化了部分的原生方法。相关API：https://automattic.github.io/monk/docs/collection/find.html

*  `soap模块` 用于访问公司内部提供用于登录和查询工号信息的`webservice`服务

*  `axios模块`浏览器发送 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 请求，node.js发送[http](http://nodejs.org/api/http.html)请求，支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API，拦截请求和响应，数据格式转换，自动转换JSON数据等。 相关用法：http://www.cnblogs.com/Juphy/p/7073027.html
---

### 服务器环境
* 系统`cent6.6`
* `nginx` 反向代理服务器 位置`/usr/local/nginx` 配置文件`/usr/local/nginx/conf/nginx.conf`
* `tomcat` 前端组件项目 位置 `/opt/tomcat` 配置文件`/opt/tomcat/conf/server.xml`
* `node.js` 位置`/opt/nodejs`
* 平台 静态页面位置`/opt/issuePlatform` node服务位置`/opt/nodeServer`

######相关指令:

nginx
```
$ nginx -s reload|reopen|stop|quit  #重新加载配置|重启|停止|退出 nginx
```
 tomcat
```
$ startup.sh #启动
$ shutdown.sh #停止
```
node进程管理 **`pm2`**
```
$ pm2 start app.js -i 4  # 后台运行pm2，启动4个app.js 
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               # 显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0 秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop id           # 停止指定的进程
$ pm2 restart id          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint 
$ pm2 delete id           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程
```


---


### 项目结构

##### 前端项目结构
引用自 SegmentFault [**hieeyh**](https://segmentfault.com/a/1190000007880723) 2016年12月21日发布

###### 项目结构
```
.
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                     // vue公共组件
|   |-- store                          // vuex的状态管理
|   |-- App.vue                        // 页面入口文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                           // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico 
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
.
```
###### package.json
---
package.json文件是项目根目录下的一个文件，定义该项目开发所需要的各种模块以及一些项目配置信息（如项目名称、版本、描述、作者等）。

###### scripts字段
---
package.json文件里有一个scripts字段。
```
"scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js"
  }
```
在开发环境下，在命令行中运行`npm run dev`就相当于在执行`node build/dev-server.js`。所以script字段是用来指定`npm`相关命令的缩写的。

###### dependencies字段和devDependencies字段
---
dependencies字段指定了项目运行时所依赖的模块，devDependencies字段指定了项目开发时所依赖的模块。在命令行中运行npm install命令，会自动安装dependencies和devDependencies字段中的模块。 package.json还有很多配置相关项，想进一步了解package.json的可参考：[https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)

###### dev-server.js
---
```
...
...
// http-proxy可以实现转发所有请求代理到后端真实API地址，以实现前后端开发完全分离
// 在config/index.js中可以对proxyTable想进行配置
var proxyMiddleware = require('http-proxy-middleware')
...
...
// 热加载要使用webpack-dev-middleware在没有webpack-dev-server的时候进行热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// 当html-webpack-plugin模板改变是强制进行页面重新加载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
```
###### webpack.base.conf.js
```
...
...
module.export = {
    // 编译入口文件
    entry: {},
    // 编译输出路径
    output: {},
    // 一些解决方案配置
    resolve: {},
    resolveLoader: {},
    module: {
        // 各种不同类型文件加载器配置
        loaders: {
        ...
        ...
        // js文件用babel转码
        {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            // 哪些文件不需要转码
            exclude: /node_modules/
        },
        ...
        ...
        }
    },
    // vue文件一些相关配置
    vue: {}
}
```
###### check-version.js
这个文件主要是用来检测当前环境中的node和npm版本和我们需要的是否一致的。
```
// 加载语义化版本测试库
var semver = require('semver')
// 定制控制台日志的输入样式
var chalk = require('chalk')
// 引入package.json文件
var packageConfig = require('../package.json')
var exec = function (cmd) {
  return require('child_process')
    .execSync(cmd).toString().trim()
}
// 定义node和npm版本需求所组成的数组
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]
module.exports = function () {
  var warnings = []
  // 依次判断版本是否符合要求
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  ...
}
```
###### .babelrc
Babel解释器的配置文件，存放在根目录下。Babel是一个转码器，项目里需要用它将ES6代码转为ES5代码。这里有一篇阮一峰老师写的相关文章供参考：[Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)

```
 // 设定转码规则
  "presets": ["es2015", "stage-2"],
  // 转码的一些插件
  "plugins": ["transform-runtime"],
  "comments": false 
```
###### .editorconfig
该文件定义项目的编码规范，编辑器的行为会与.editorconfig 文件中定义的一致，并且其优先级比编辑器自身的设置要高，这在多人合作开发项目时十分有用而且必要。
```
root = true

[*]    // 对所有文件应用下面的规则
charset = utf-8                    // 编码规则用utf-8
indent_style = space               // 缩进用空格
indent_size = 2                    // 缩进数量为2个空格
end_of_line = lf                   // 换行符格式
insert_final_newline = true        // 是否在文件的最后插入一个空行
trim_trailing_whitespace = true    // 是否删除行尾的空格
```

****

##### express项目结构
```
.
├── app.js // 应用入口
├── bin
│   └── www // 应用主入口 创建node server
├── package.json // 项目说明
├── node_modules // node模块
├── public // 静态资源
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── server // 服务文件夹
│   ├── conf // 配置文件
│   ├── dao // 数据持久化中间件
│   ├── db // 数据库连接
│   ├── routes // 路由
│   └── util // 工具文件
└── views // 视图
    ├── error.html // 错误页面
    └── index.html
```
---
#### 其他

ES6新特性：https://github.com/lukehoban/es6features#destructuring
web应用组件化思路：https://github.com/xufei/blog/issues/6

……待补充
