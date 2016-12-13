#HackerNews-React-Native
![111](https://cloud.githubusercontent.com/assets/10808093/21142677/408ba32c-c17e-11e6-9037-ef5130b50f38.png)

* 支持 iOS 和 Android
* 仿[HackerNews-React-Native](https://github.com/iSimar/HackerNews-React-Native)搭的一个demo，功能已经全部补全
* 用来做路由功能，本来用`antd-mobile`组件的`TabBar`，因为它`android`端的`tabbar`，第一次加载的时候会把全部`tabbar`的内容都加载出来，所以暂时用`react-native-router-flux`的`tabbar`来解决延迟加载的问题

# 安装
1. 请确保`react-native-cli`为最新版本，我用的是1.3.0
2. 请确保`react-native`为0.38.0
3. `cd` 到 `HackerNewsReactNative`目录下 `npm install`
4. `react-native run-ios`或者`react-native run-android`
5. `react-native`为0.39.0以上有可能报红屏，请看这个[issues](https://github.com/facebook/react-native/issues/11384)

# 依赖
1. [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)
2. [react-native-gifted-listview](https://github.com/FaridSafi/react-native-gifted-listview), 它的源码有问题，请根据这个[issues](https://github.com/FaridSafi/react-native-gifted-listview/pull/74)自己`clone`源码下来修改
3. [axios](https://github.com/mzabriskie/axios)
