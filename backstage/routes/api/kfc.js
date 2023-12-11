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
router.post("/validStore", (req, res) => {
  const api = {
    url: "https://orders.kfc.com.cn/store-portal/api/v2/store/validStore",
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
module.exports = router;
