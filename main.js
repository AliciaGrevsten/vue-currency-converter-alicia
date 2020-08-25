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
  mounted() {
	
  },
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
	calculateExhange(input) {
		axios
		.get(`https://api.exchangeratesapi.io/latest?base=${this.selectedFromCurrency}&symbols=${this.selectedToCurrency}`)
		.then((res) => (this.rate = res.data.rates[this.selectedToCurrency]))
		.catch((err) => console.log(err));
		
		this.outputAmount  = input * this.rate;		
	},
	// NOT DONE!
	switchCurrencies() {
		let temp = this.selectedFromCurrency;

		this.selectedFromCurrency = this.selectedToCurrency;
		this.selectedToCurrency = temp;
	}
  },
});
