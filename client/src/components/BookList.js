import React, { Component } from 'react';
import { getBooksQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import BookDetails from './BookDetails';

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
		};
	}
	books() {
		let data = this.props.data;
		if (data.loading) {
			return <div>Loading...</div>;
		} else {
			return data.books.map((book) => {
				return (
					<div
						key={book.id}
						className="card mt-2"
						onClick={(e) => {
							this.setState({ selected: book.id });
						}}
					>
						<div className="card-body">{book.name}</div>
					</div>
				);
			});
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
