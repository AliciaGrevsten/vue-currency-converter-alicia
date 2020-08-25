"use strict";

var app = new Vue({
  el: "#exchange",
  data: {
    data: null,
    exg: "SEK",
    selectedFromCurrency: "",
    selectedToCurrency: "",
    inputAmount: "",
    outputAmount: "",
    currencies: [],
    rate: ""
  },
  created: function created() {
    var _this = this;

    axios.get("https://api.exchangeratesapi.io/latest?base=".concat(this.exg)).then(function (res) {
      return _this.currencies = res.data.rates;
    })["catch"](function (err) {
      return console.log(err);
    });
  },
  mounted: function mounted() {},
  methods: {
    changeCurrency: function changeCurrency(currency) {
      this.exg = currency;
      this.updateRatings(currency);
    },
    updateRatings: function updateRatings(currency) {
      var _this2 = this;

      axios.get("https://api.exchangeratesapi.io/latest?base=".concat(currency)).then(function (res) {
        return _this2.currencies = res.data.rates;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    calculateExhange: function calculateExhange(input) {
      var _this3 = this;

      axios.get("https://api.exchangeratesapi.io/latest?base=".concat(this.selectedFromCurrency, "&symbols=").concat(this.selectedToCurrency)).then(function (res) {
        return _this3.rate = res.data.rates[_this3.selectedToCurrency];
      })["catch"](function (err) {
        return console.log(err);
      });
      this.outputAmount = input * this.rate;
    },
    // NOT DONE!
    switchCurrencies: function switchCurrencies() {
      var temp = this.selectedFromCurrency;
      this.selectedFromCurrency = this.selectedToCurrency;
      this.selectedToCurrency = temp;
    }
  }
});