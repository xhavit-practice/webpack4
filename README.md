# 使用过的html相关loader

## status
[![Build Status](https://travis-ci.com/xhavit-practice/webpack4.svg?branch=master)](https://travis-ci.com/xhavit-practice/webpack4)

## workflow
- Make changes
- Commit those changes
- Make sure Travis turns green
- Bump version in package.json
- conventionalChangelog
- Commit package.json and CHANGELOG.md files
- Tag
- Push

## html-loader(^1.0.0-alpha.0)
- 目前唯一一个静态资源也能签名的html loader，也可以自定义各种标签和属性的扩展
- 默认支持v0.5.5的interpolate属性(1.0.0版本已经被移除)，可以使用${xxxxx}的语法，灵活的引入其他资源
- include html: `<import src="./xxx.html">`，无法传参
- include html: `${require('xxx.html').default}`，无法传参
- import static source: `<img src="xxx.png" />`
- 无法接收HtmlWebpackPlugin的传值

## html-webpack-plugin/lib/loader.js(LoDash Templates)
这个是html-webpack-plugin自带的，用来回退的loader，用起来不方便，如果对所有template都用这个loader，入口html会输出为一个js模块，应该是个bug

## ejs-loader(LoDash Templates) - 当前项目使用的html loader
这个是基于lodash.template的一个loader，可以用模板的求值语法使用require语句，非常灵活
- include html: `<%= require('xxx.html')({foo: 'foo'}) %>`，还可以传参
- import static source: `<img src="<%= require('xxx.png') %>" />`
- 可以接收HtmlWebpackPlugin的传值

## ejs-webpack-loader/ejs-compiled/loader(mde/ejs)
ejs-compiled-loader是基于mde/ejs的一个loader，但是在webpack4以上用不了，然后有人基于这个创建了ejs-webpack-loader分支，但是只能用ejs的include指令，用不了include方法，无法传参。另外无法给静态资源签名

## handlebars-loader
这个是基于handlebars的一个loader，功能最为强大，最大的缺陷跟ejs-webpack-loader一样，无法给静态资源签名

综上，推荐顺序如下：
- 最推荐的是`ejs-loader`，用`<%= require('xxx) %>`插值语法能满足所有的资源导入需求，而且可以传值到include的html中，但是其功能远远没有`handlebars`强大，但作为tempalte这里已经完全够用了
- 其次是`html-loader`，其引入静态资源和html都有对应支持的语法，使用起来非常方便，但是用不能接收HtmlWebpackPlugin的参数，以及不能传参到引入的html中
- 最后是`handlebars-loader`，其对模板的扩展非常强大，但是不支持静态资源的签名，这是唯一的问题，要是能够支持`ejs-loader`中的`<%= require('xxx) %>`的语法，或者借鉴`html-loader`中对静态资源的处理就完美了
- `html-webpack-plugin/lib/loader.js`以及`ejs-webpack-loader`均不推荐，都有各自的使用问题