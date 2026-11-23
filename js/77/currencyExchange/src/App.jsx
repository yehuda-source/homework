import { useEffect, useState } from "react";

import "./App.css";
import Exchange from "./Exchange.jsx";

function App() {
	const [firstCurrency, setFirstCurrency] = useState("usd");
	const [secondCurrency, setSecondCurrency] = useState("usd");
	const [amount, setAmount] = useState(1);

	const [result, setResult] = useState();
	const [readonly, setReadOnly] = useState(false);
	const [currencies, setCurrencies] = useState();

	const currenciesApi = "https://api.frankfurter.dev/v1/currencies";

	useEffect(() => {
		(async () => {
			if (!currencies) {
				setCurrencies(Object.entries(await fetchFromApi(currenciesApi)));
				console.log("currencies", currencies);
				return;
			}
			setReadOnly(true);
			//if (validateCurrencies(firstCurrency, secondCurrency)) {
				const exchangeAmount = await findExchangeAmount(
					firstCurrency,
					secondCurrency,
					amount,
				);
				if (exchangeAmount) {
					console.log("setting amount", exchangeAmount);
					setResult(exchangeAmount);
				}
			//}
			setReadOnly(false);
		})();
	}, [firstCurrency, secondCurrency, amount, currencies]);
	return (
		<>
		<header>Currency Exchange Rate</header>
			<form>
				<div>
					<label htmlFor="amount">amount: </label>
					<input
						type="number"
						readOnly={readonly}
						id="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="firCur">first currency: </label>
					<input
						id="firCur"
						readOnly={readonly}
						value={firstCurrency}
						onChange={(e) => setFirstCurrency(e.target.value)}
					/>
					<select onChange={(e) => setFirstCurrency(e.target.value)} disabled={readonly}>
						{currencies?.map((c, index) => (
							<option key={c[0].toLowerCase()} value={c[0].toLowerCase()}>
								{c[1]}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="secCur">second currency: </label>
					<input
						id="secCur"
						value={secondCurrency}
						readOnly={readonly}
						onChange={(e) => setSecondCurrency(e.target.value)}
					/>
					<select onChange={(e) => setSecondCurrency(e.target.value)} disabled={readonly}>
						{currencies?.map((c, index) => (
							<option key={c[0].toLowerCase()} value={c[0].toLowerCase()}>
								{c[1]}
							</option>
						))}
					</select>
				</div>
			</form>
			<Exchange result={result} />
		</>
	);
}

// function validateCurrencies(firstCur, secondCur) {
// 	console.log("validating");
// 	return firstCur.length === 3 && secondCur.length === 3;
// }

async function findExchangeAmount(firstCur, secondCur, amount) {
	let result = await findExchangeRate(firstCur, secondCur);
	if (result) {
		result.total = result?.rate * amount;
		result = addAmountToResult(result, amount);
		return result;
	}
}
async function findExchangeRate(firstCur, secondCur) {
	const api = `https://api.frankfurter.dev/v2/rate/${firstCur}/${secondCur}`;
	const result = await fetchFromApi(api);
	const rate = result?.rate;
	console.log(rate, " is rate");
	if (rate) {
		console.log("returning rate");
	}

	return result;
}
async function fetchFromApi(api) {
	try {
		console.log("calling api");
		const response = await fetch(api);
		if (response.ok) {
			const obj = await response.json();
			console.log(obj);

			return obj;
		} else {
			throw new Error("cannot get data");
		}
	} catch (e) {
		console.log(e.message);
	}
}
function addAmountToResult(result, amount) {
	result.amount = amount;
	return result;
}

export default App;
