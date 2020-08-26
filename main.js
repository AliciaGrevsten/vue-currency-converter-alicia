Vue.component("currencies-list", {
  props: ["rate", "currency"],
  template: `<div>
    <ul>
      <li><a id="currency" v-on:click="$emit('change-currency', currency)">{{currency}}:</a> {{rate}}</li>
    </ul>
  </div>`,
});

let app = new Vue({
  el: "#exchange",
  data: {
    data: null,
    exg: "SEK",
    selectedFromCurrency: "",
    selectedToCurrency: "",
    inputAmount: "",
    outputAmount: "",

    currencies: [],
    rate: "",
  },
  created() {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.exg}`)
      .then((res) => (this.currencies = res.data.rates))
      .catch((err) => console.log(err));
  },
  mounted() {},
  methods: {
    changeCurrency(currency) {
      this.exg = currency;
      this.updateRatings(currency);
    },
    updateRatings(currency) {
      axios
        .get(`https://api.exchangeratesapi.io/latest?base=${currency}`)
        .then((res) => (this.currencies = res.data.rates))
        .catch((err) => console.log(err));
    },
    calculateExhange(input, fromCurrency, toCurrency) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`
        )
        .then((res) => {
          (this.rate = res.data.rates[toCurrency]),
          this.outputAmount = this.inputAmount * this.rate;
        } )
        .catch((err) => console.log(err));

      
    },
    // NOT DONE!
    switchCurrencies() {
      let temp = this.selectedFromCurrency;

      this.selectedFromCurrency = this.selectedToCurrency;
      this.selectedToCurrency = temp;
    },
  },
});
