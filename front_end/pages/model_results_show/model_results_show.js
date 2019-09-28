// pages/Model results show/Model results show.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();

function initChart(canvas, width, height, s1, s2, s3, s4, s5) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: s5,
        name: '5星'
      }, {
        value: s4,
        name: '4星'
      }, {
        value: s3,
        name: '3星'
      }, {
        value: s2,
        name: '2星'
      }, {
        value: s1,
        name: '1星'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  chart.setOption(option);
  console.log(option);
  return chart;
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    detail: {},
    ec: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
  },

  echartInit(e) {
    var s5, s4, s3, s2, s1;
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/detail/?id=' + this.data.id,
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          detail: res.data
        })
        s5 = res.data.star5;
        s4 = res.data.star4;
        s3 = res.data.star3;
        s2 = res.data.star2;
        s1 = res.data.star1;
        initChart(e.detail.canvas, e.detail.width, e.detail.height, s1, s2, s3, s4, s5);
      }
    })
  }
})