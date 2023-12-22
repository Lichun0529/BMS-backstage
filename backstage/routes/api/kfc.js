const express = require("express");
const router = express.Router();
const axios = require("axios");
const imgUrlBase = "https://pcp-pic.hwwt8.com";
const commonParam = {
  portalType: "WAP",
  channelName: "WECHATMINI",
  channelId: "13_5",
  brand: "KFC_PRE",
  business: "preorder",
  deviceId: "YSnoYXuTbmJfCBd41A5jz",
  clientVersion: "v3.1215(f1858d86)",
  versionNum: "4",
  openId: "omxHq0O92oOuiOE8zhRCx9j9QJqk",
};
let localSession = {};

/**
 * 根据经纬度搜索门店
 * @param {number} mylat 纬度
 * @param {number} mylng 经度
 */
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

/**
 * 根据门店编号获取门店菜单
 * @param {string} storeCode 门店编号
 */
router.post("/storeMenu", async (req, res) => {
  const api = {
    url: "https://orders.kfc.com.cn/store-portal/api/v2/store/validStore",
    param: {
      storeCode: req.body.storeCode,
    },
  };
  if (!req.body.storeCode) {
    res.json({ code: 1, message: "门店编号不能为空" });
    return;
  }
  const http = axios.create({
    headers: api.headers,
  });
  const store = (await http.post(api.url, req.body)).data.data ?? null;
  getMenu(
    res,
    {
      sessionId: localSession.sessionId,
      ticket: localSession.ticket,
    },
    store
  );
});
async function getMenu(res, param, store) {
  if (!store || !store.store) {
    res.json({ code: 1, message: "门店信息获取失败" });
    return;
  }
  const p = {
    ...commonParam,
    store: store.store,
    env: "qcb",
    sessionId: param.sessionId,
    ticket: param.ticket,
  };
  let menu = await axios
    .create()
    .post("https://orders.kfc.com.cn/store-portal/api/v2//menu/list", p);
  console.log(menu.data);
  if (menu.data.code != 0) {
    //session过期
    const session = await axios
      .create()
      .post(
        "https://orders.kfc.com.cn/preorder-portal/api/v2/init/initSession",
        {
          ...commonParam,
          ticket:
            "56c8a2821f8189f6_18c57eed8b7_18c7bd7108c_LD8W3dJB92klFz-h.8pVuS-478-I5aW754kZxchtPabEoRl3l6kJjg",
        }
      );
    if (session.data.code == 0) {
      localSession = {
        sessionId: session?.data?.data?.sessionId,
        ticket: session?.data?.data?.dataLogin?.user?.ticket[0],
      };
      menu = await getMenu(
        res,
        {
          sessionId: session?.data?.data?.sessionId,
          ticket: session?.data?.data?.dataLogin?.user?.ticket[0],
        },
        store
      );
    } else {
      return res.json({ code: 1, message: "session获取失败" });
    }
  }
  return res.json(menu.data);
}
module.exports = router;
