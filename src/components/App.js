import '../styles/App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
	const [products, setProducts] = useState([]);

	const url = 'http://localhost:3000/products';

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const allProducts = () => (
		<div style={{ textAlign: 'left' }}>
			{products.map((prod) => (
				<>
					<h3>{prod.name}</h3>
					<p>{prod.price}</p>
					<img src={prod.img} />
				</>
			))}
		</div>
	);

	const loading = <h1>loading...</h1>;

	return (
		<div>
			<h1>products</h1>
			<div>{products.length > 0 ? allProducts() : loading}</div>
		</div>
	);
}

export default App;
