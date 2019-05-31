import React, { Component } from 'react';
import { getBooksQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import BookDetails from './BookDetails';
import Loader from './Loader';
import NoInternet from './NoInternet';

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
		};
	}
	books() {
		const data = this.props.data;

		if (!window.navigator.onLine) {
			return <NoInternet />;
		}
		if (data.loading) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return data.books.length !== 0 ? (
				data.books.map((book) => {
					return (
						<div
							key={book.id}
							className="card mt-2 book"
							onClick={(e) => {
								this.setState({ selected: book.id });
							}}
						>
							<div className="card-body">{book.name}</div>
						</div>
					);
				})
			) : (
				<div>No books found</div>
			);
		}
	}
	render() {
		console.log(this.props);
		return (
			<div className="container row">
				<div className="col-md-6">
					<legend className="text-center">Books</legend>
					{this.books()}
				</div>
				<div className="col-md-6">
					<BookDetails bookid={this.state.selected} />
				</div>
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);
