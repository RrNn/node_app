import React, { Component } from 'react';
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery,
} from '../queries/queries';
import { graphql, compose } from 'react-apollo';

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorId: '',
		};
	}
	authors() {
		var data = this.props.getAuthorsQuery;
		return data.authors
			? data.authors.map((author) => {
					return (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					);
			  })
			: [];
	}
	onSubmit(e) {
		e.preventDefault();
		this.props.addBookMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	}

	render() {
		return (
			<div className="container">
				<legend className="text-center">Add Book</legend>
				<form action="" method="POST" onSubmit={this.onSubmit.bind(this)}>
					<legend>Form title</legend>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							onChange={(e) => this.setState({ name: e.target.value })}
							placeholder="Book Title"
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							onChange={(e) => this.setState({ genre: e.target.value })}
							placeholder="Book Genre "
						/>
					</div>
					<div className="form-group">
						<select
							className="form-control"
							onChange={(e) => this.setState({ authorId: e.target.value })}
						>
							<option>Select author...</option>
							{this.authors()}
						</select>
					</div>
					<button type="submit" className="btn btn-block">
						Create Book
					</button>
				</form>
			</div>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);

// export default graphql(getAuthorsQuery)(AddBook);
