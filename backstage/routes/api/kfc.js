const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/searchByLbs", (req, res) => {
  const api = {
    url: "https://orders.kfc.com.cn/store-portal/api/v2/store/searchByLbs",
    param: {
      mylat: 39.95933151245117,
      mylng: 116.29844665527344,
    },
    method: "POST",
  };
  const http = axios.create({
    headers: api.headers,
  });
  http
    .post(api.url, req.body)
    .then((data) => {
      res.json(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
router.post("/validStore", async (req, res) => {
  const api = {
    url: "https://orders.kfc.com.cn/store-portal/api/v2/store/validStore",
    param: {
      storeCode: req.body.storeCode,
    },
  };
  const http = axios.create({
    headers: api.headers,
  });
  const store = (await http.post(api.url, req.body)).data.data ?? null;
  const param = {
    portalType: "WAP",
    channelName: "WECHATMINI",
    channelId: "13_5",
    brand: "KFC_PRE",
    business: "preorder",
    deviceId: "nmulIbFWH3XPqtqNIW-ih",
    clientVersion: "v3.1025(b8b47b64)",
    openId: "ojBv60CIxQIktJdirqObGavSk6NI",
    versionNum: "4",
    store: store,
    env: "qcb",
    sessionId: "pU02BDLkqPMWmpscKTns9Tg3DopdOWqv",
    ticket:
      "482219bda8601fa5_18b8ed9bd92_18c57f479c1_LD8W3dJB92klFz-h.8pVuS-478-I5aW754kZxchtPabEoRl3l6kJjg",
  };
  const menu = await http.post(
    "https://orders.kfc.com.cn/store-portal/api/v2//menu/list",
    param
  );
  res.json(menu.data);
});
router.post("/storeMenu", (req, res) => {
  const api = {
    url: "https://orders.kfc.com.cn/store-portal/api/v2//menu/list",
    param: {
      storeCode: req.body.storeCode,
    },
  };
  const http = axios.create({
    headers: api.headers,
  });
  http
    .post(api.url, req.body)
    .then((data) => {
      res.json(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
const mookStore = {
  store: {
    storecode: "BJN139",
    storename: "远大路金源燕莎KFC",
    starttime: "00:00",
    endtime: "23:59",
    address: "北京市海淀区远大路1号中心通道1层北侧",
    status: 1,
    boolBusyStop: false,
    statuscomments: "",
    lat: "39.959143",
    lng: "116.288608",
    distance: 838.1737060989047,
    bookingMerge: {
      bookingStarttime: "17:00",
      bookingEndtime: "23:45",
      bookingNextStarttime: "00:00",
      bookingNextEndtime: "23:45",
      boolImmediate: true,
      boolBooking: true,
      boolToday: true,
      boolTomorrow: true,
      boolOpenTime: true,
      statusBool: true,
      timeStart: "00:00",
      timeEnd: "23:59",
      available: true,
      disable: false,
    },
    bookingExt: {
      timeCurStr: "2023-12-11 16:18:09",
      timeCur: 1702282689737,
      bookingStarttime: "17:00",
      bookingEndtime: "23:45",
      bookingNextStarttime: "00:00",
      bookingNextEndtime: "23:45",
      boolToday: true,
      boolTomorrow: true,
      bookingArr: [["17:00-23:45"], ["00:00-09:15", "23:15-23:45"]],
      bookingOffList: [
        {},
        {
          off: ["09:30-23:00"],
        },
      ],
      bookingArrOrigin: [["00:00-23:45"], ["00:00-09:15", "23:15-23:45"]],
      boolInTime: true,
      boolOpenTime: true,
      boolImmediate: true,
      isShowMenu: 1,
      disable: false,
      boolBooking: true,
      storePublicSign: "0918F47432DF883AD0155A2567067AB7",
      boolRecommendStore: true,
    },
    reminders: {
      boolOutHours: false,
      boolBreakfast: false,
      nearEndRemind: false,
      nearEndForbid: false,
      nearEndForbid_str: "23:59",
      tagCode: "",
      openDateStr: "2015-11-30",
      dateStrOpen: "2015-11-30",
      dateStrEnd: "2099-12-31",
      dateStrUpStart: "",
      dateStrUpEnd: "",
      tipState: "",
    },
    citycode: "00013",
    cityName: "北京",
    deliveryTime: 0,
    businessdate: 1702224000000,
    nearByStore: [],
    nearbyStoreLight: [
      {
        phoneShowType: "1",
        status: "1",
        storeCode: "BJN139_J1",
        typeCode: "J",
      },
      {
        phoneShowType: "3",
        status: "3",
        storeCode: "BJN139_Q1",
        typeCode: "Q",
      },
      {
        phoneShowType: "3",
        status: "3",
        storeCode: "BJN139_Q2",
        typeCode: "Q",
      },
      {
        phoneShowType: "3",
        status: "3",
        storeCode: "BJN139_Q3",
        typeCode: "Q",
      },
    ],
    merchantType: 1,
    marketcode: "007",
    districtcode: "01890",
    districtName: "海淀区",
    asCity: 0,
    stype: "007",
    traffic: "2",
    typeCode: "H",
    takeMealPlace: "店内柜台",
    subStores: [],
    subStorecodes: [],
    breakfastStart: "06:00",
    breakfastEnd: "10:00",
    bookingInterval: 15,
    bookingDays: 2,
    dayParts: [
      {
        dayPartCode: "5",
        daypart_from: "17:00",
        daypart_to: "20:00",
        name: "晚餐",
      },
      {
        dayPartCode: "1",
        daypart_from: "06:00",
        daypart_to: "09:30",
        name: "早餐",
      },
      {
        dayPartCode: "6",
        daypart_from: "23:00",
        daypart_to: "05:00",
        name: "夜宵",
      },
      {
        dayPartCode: "8",
        daypart_from: "09:30",
        daypart_to: "10:00",
        name: "早正餐",
      },
      {
        dayPartCode: "2",
        daypart_from: "10:00",
        daypart_to: "11:00",
        name: "正餐",
      },
      {
        dayPartCode: "3",
        daypart_from: "11:00",
        daypart_to: "14:00",
        name: "午餐",
      },
      {
        dayPartCode: "7",
        daypart_from: "05:00",
        daypart_to: "06:00",
        name: "夜宵2",
      },
      {
        dayPartCode: "9",
        daypart_from: "20:00",
        daypart_to: "23:00",
        name: "夜宵0",
      },
      {
        dayPartCode: "4",
        daypart_from: "14:00",
        daypart_to: "17:00",
        name: "下午茶",
      },
    ],
    packFlag: "3",
    gbCityCode: "110100",
    phone: "",
    storeLabelInfo: {
      labels: [
        {
          icon: "https://pcp-pic.hwwt8.com/SPH/a6495557-55bb-4a12-9c07-c057bf9adb43.png",
          labelCode: "11",
          labelName: "24小时",
          labelTypeCode: "4",
          labelTypeName: "营业",
          seqNo: "110",
          typeSeqNo: "4",
        },
      ],
    },
    storePic: {
      storeBuzAreaPic: [],
      storeEnvirPic: [],
      storeSelfPic: [],
    },
    tolerant: 0,
    shutmaptime: 0,
    merchant: {
      cooperateStatus: 0,
      merchantCode: "86001",
      merchantName: "北京肯德基有限公司",
    },
    labels: [
      {
        icon: "https://pcp-pic.hwwt8.com/SPH/a6495557-55bb-4a12-9c07-c057bf9adb43.png",
        labelCode: "11",
        labelName: "24小时",
        labelTypeCode: "4",
        labelTypeName: "营业",
        seqNo: "110",
        typeSeqNo: "4",
      },
    ],
    storeCodeCurrent: "BJN139",
    pCityCode: "110100",
    pStoreCode: "BJN139",
    saleTimeDesc: "营业时间：24小时",
    needConfirm: true,
  },
};
module.exports = router;
