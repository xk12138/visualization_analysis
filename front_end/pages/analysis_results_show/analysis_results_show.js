// pages/analysis results show/analysis results show.js

import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function setOption(chart, options) {
  var option = {
    title: {
      text: '城市一天的空气质量走向',
      left: 'center'
    },
    color: ["#37A2DA"],
    legend: {
      data: ['A'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['0-4', '4-8', '8-12', '12-16', '16-20', '20-24'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: options
    }]
  };
  chart.setOption(option)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    date: '2015-01-01',
    ec: {},
    chart: {}
  },
  bindChange:function(e){
    var that = this;
    console.log('年份发生改变');
    console.log(e.detail.value);
    console.log(typeof(e.detail.value));
    var date = e.detail.value;
    that.setData({
      date: date
    });
    that.getOptions();
  },

  onLoad: function(options) {
    console.log(options);
    this.setData({
      city: options.city
    })
  },
  onReady: function() {
    this.component = this.selectComponent('#mychart-dom-pie');
    this.getOptions();
  },

  init (options) {
    this.component.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, options)
      this.chart = chart;
      return chart;
    });
  },

  getOptions: function() {
    var year = parseInt(this.data.date.substr(0, 4));
    var month = parseInt(this.data.date.substr(5, 2));
    var day = parseInt(this.data.date.substr(8, 2));
    var options = [0, 0, 0, 0, 0, 0];
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/quality/?city=' + that.data.city + '&year=' + year + '&month=' + month + '&day=' + day,
      success: function (res) {
        console.log(res);
        for (var i = 0; i < 6; i++) {
          options[i] = (res.data[4 * i].PM + res.data[4 * i + 1].PM + res.data[4 * i + 2].PM + res.data[4 * i + 3].PM) / 4;
        }
        that.init(options);
      }
    });
  },

  init: function (options) {
    this.component.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, options)
      this.chart = chart;
      return chart;
    });
  },
})