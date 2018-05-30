import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
// import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from "./TableList.less";

// @connect(({ rule, loading }) => ({
//   rule,
//   loading: loading.models.rule,
// }))
// @Form.create()
export default class TableList extends PureComponent {
  componentDidMount() {
    // var BMap = window.BMap
    // // 创建Map实例
    // var map = new BMap.Map("allmap");
    // // 初始化地图,设置中心点坐标和地图级别
    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    // //添加地图类型控件
    // map.addControl(new BMap.MapTypeControl({
    //   mapTypes:[
    //     BMAP_NORMAL_MAP,
    //     BMAP_HYBRID_MAP
    //   ]}
    // ));
    // // 设置地图显示的城市 此项是必须设置的
    // map.setCurrentCity("北京");
    // //开启鼠标滚轮缩放
    // map.enableScrollWheelZoom(true);

    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.417854, 39.921988);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    map.centerAndZoom(point, 15);
    var opts = {
      width: 200, // 信息窗口宽度
      height: 100, // 信息窗口高度
      title: "海底捞王府井店", // 信息窗口标题
      enableMessage: true, //设置允许信息窗发送短息
      message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
    };
    var infoWindow = new BMap.InfoWindow(
      "地址：北京市东城区王府井大街88号乐天银泰百货八层",
      opts
    ); // 创建信息窗口对象
    marker.addEventListener("click", function() {
      map.openInfoWindow(infoWindow, point); //开启信息窗口
    });
  }
  render() {
    const height = document.body.clientHeight - 190;
    return (
      <PageHeaderLayout title="百度地图">
        <div
          id="allmap"
          style={{
            width: "100%",
            height: height + "px"
          }}
        />
      </PageHeaderLayout>
    );
  }
}
