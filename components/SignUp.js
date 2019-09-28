import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
		signUp(email: $email, name: $name, password: $password) {
			id
			email
			name
		}
	}
`;

class SignUp extends Component {
	state = {
		email: '',
		name: '',
		password: '',
	};
	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<Mutation
				mutation={SIGNUP_MUTATION}
				variables={this.state}
				refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
			>
				{(signup, { error, loading }) => {
					return (
						<Form
							method="post"
							data-test="form"
							onSubmit={async (e) => {
								e.preventDefault();
								await signup();
								this.setState({ name: '', email: '', password: '' });
							}}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<h2>SignUp component</h2>
								<Error error={error} />
								<label htmlFor="email">
									Email
									<input
										type="email"
										name="email"
										placeholder="Enter your email"
										value={this.state.email}
										onChange={this.saveToState}
									/>
								</label>
								<label htmlFor="name">
									Name
									<input
										type="text"
										name="name"
										placeholder="Enter your full name"
										value={this.state.name}
										onChange={this.saveToState}
									/>
								</label>
								<label htmlFor="password">
									Password
									<input
										type="password"
										name="password"
										placeholder="Enter a secure password"
										value={this.state.password}
										onChange={this.saveToState}
									/>
								</label>

								<button type="submit">Sign Up!</button>
							</fieldset>
						</Form>
					);
				}}
			</Mutation>
		);
	}
}

export default SignUp;
export { SIGNUP_MUTATION };
