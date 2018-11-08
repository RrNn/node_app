import React, { Component } from 'react';
import { getBookQuery } from '../queries/queries';
import { graphql } from 'react-apollo';

class BookDetails extends Component {
	displayBookDetails() {
		const { book } = this.props.data;
		if (book) {
			return (
				<div>
					<p>
						<strong>Name:&nbsp;</strong>
						{book.name}
					</p>
					<p>
						<strong>Genre:&nbsp;</strong>
						{book.genre}
					</p>
					<p>
						<strong>Author:&nbsp;</strong>
						{book.author.name}
					</p>
					<p>
						<strong>Other books by {book.author.name}</strong>
					</p>
					{book.author.books.map(book => {
						return <li key={book.id}>{book.name}</li>;
					})}
				</div>
			);
		} else {
			return (
				<div>
					<strong>Click on a book to view details here</strong>
				</div>
			);
		}
	}
	render() {
		return (
			<div className="container">
				<legend className="text-center">Book Details</legend>
				{this.displayBookDetails()}
			</div>
		);
	}
}

export default graphql(getBookQuery, {
	options: props => {
		return {
			variables: {
				id: props.bookid,
			},
		};
	},
})(BookDetails);
