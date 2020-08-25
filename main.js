let app = new Vue({
  el: "#exchange",
  data: {
    data: null,
    exg: "SEK",
    selectedFromCurrency: "SEK",
    selectedToCurrency: "USD",
    inputAmount: 500,
    outputAmount: 0,

    currencies: [],
    rate: [],
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
	calculateExhange(input, from, to) {
		console.log(from);
		console.log(to);
		console.log(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`);
		console.log(input);

		axios
		.get(`https://api.exchangeratesapi.io/latest?base=${this.selectedFromCurrency}&symbols=${this.selectedToCurrency}`)
		.then((res) => (console.log(res.data)))
		.catch((err) => console.log(err));

		console.log(this.rate);
		
		
		//console.log(input * this.rate;
		//this.outputAmount  = input * 0.5;		
	}
  },
});
