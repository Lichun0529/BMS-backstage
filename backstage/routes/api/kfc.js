const express = require("express");
const router = express.Router();
const axios = require("axios");

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
  const menu = await getMenu({}, store);
  res.json(menu.data);
});
async function getMenu(param, store) {
  const p = {
    ...commonParam,
    store: store.store,
    env: "qcb",
    sessionId: param.sessionId
      ? param.sessionId
      : "pU02BDLkqPMWmpscKTns9Tg3DopdOWqv",
    ticket: param.ticket
      ? param.ticket
      : "3f00cfa71fec88db_18c57eed8b7_18c7bc64bdd_LD8W3dJB92klFz-h.8pVuS-478-I5aW754kZxchtPabEoRl3l6kJjg",
  };
  let menu = await axios
    .create()
    .post("https://orders.kfc.com.cn/store-portal/api/v2//menu/list", p);
  if (menu.data.code === 120000999) {
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
    if (
      session?.data?.data?.sessionId &&
      session?.data?.data?.dataLogin?.user?.ticket[0]
    ) {
      menu = await getMenu(
        {
          sessionId: session?.data?.data?.sessionId,
          ticket: session?.data?.data?.dataLogin?.user?.ticket[0],
        },
        store
      );
    } else {
      console.log("session获取失败");
    }
  }
  return menu;
}
module.exports = router;
