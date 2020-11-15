import '../styles/App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
	const [products, setProducts] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [showsReviews, setShowsReviews] = useState({
		reviews: reviews,
		showReviews: false,
	});
	const [reviewId, setReviewId] = useState('')

	const url = 'http://localhost:3000/products/';

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const getReviews = (e) => {
		console.log('image clicked');
		const id = e.target.id;
		axios
			.get(url + id + '/reviews')
			.then((res) => {
				setReviews(res.data);
			})
			.then(showReviews())
			.then(console.log(reviews))
			.then(setShowsReviews({ reviews: reviews, showReviews: true }));
	};

	const showReviews = () => (
		<div>
			{reviews &&
				reviews.map((rev) => (
					<div key={rev.id}>
						<h2>{rev.title}</h2>
						<h4>{rev.author}</h4>
						<p>{rev.content}</p>
						<button onClick={deleteReview}>DELETE REVIEW</button>
						<button onClick={updateReview}>UPDATE REVIEW</button>
					</div>
				))}
		</div>
	);

	// this will be the click event to add a review
	const addReview = () => {
		console.log('add review button clicked');
	};

	// this will be the click event to update a review
	const updateReview = () => {
		console.log('update review button clicked');
	};

	// this will be the click event to delete a review, find this is the reviews tab
	const deleteReview = (review) => {
		console.log(review)
	};

	return (
		<div>
			<h1>products</h1>
			<div className='products-display'>
				{products &&
					products.map((prod) => (
						<div key={prod.id} className='individual'>
							<h3>{prod.name}</h3>
							<p>{prod.price}</p>
							<img
								src={prod.img}
								alt='product'
								onClick={getReviews}
								id={prod.id}
							/>
							<br />
							<br />
							<button onClick={addReview}>ADD REVIEW</button>
						</div>
					))}
			</div>
			<div className='reviews-display'>
				{showsReviews.showReviews === true ? showReviews() : null}
			</div>
		</div>
	);
}

export default App;
