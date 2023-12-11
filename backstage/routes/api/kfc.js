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
router.post("/storeMenu", async (req, res) => {
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
module.exports = router;
