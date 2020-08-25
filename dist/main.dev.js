"use strict";

var app = new Vue({
  el: "#exchange",
  data: {
    data: null,
    exg: "SEK",
    selectedFromCurrency: "SEK",
    selectedToCurrency: "USD",
    inputAmount: 500,
    outputAmount: 0,
    currencies: [],
    rate: []
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
    calculateExhange: function calculateExhange(input, from, to) {
      console.log(from);
      console.log(to);
      console.log("https://api.exchangeratesapi.io/latest?base=".concat(from, "&symbols=").concat(to));
      console.log(input);
      axios.get("https://api.exchangeratesapi.io/latest?base=".concat(this.selectedFromCurrency, "&symbols=").concat(this.selectedToCurrency)).then(function (res) {
        return console.log(res.data);
      })["catch"](function (err) {
        return console.log(err);
      });
      console.log(this.rate); //console.log(input * this.rate;
      //this.outputAmount  = input * 0.5;		
    }
  }
});