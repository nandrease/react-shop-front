import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const BigButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		color: ${(props) => props.theme.red};
		cursor: pointer;
	}
`;

const REMOVE_FROM_CART_MUTATION = gql`
	mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`;

class RemoveFromCart extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired
	};
	// This will get called as soon as we delete an item
	// and a response gets back from the server
	update = (cache, payload) => {
		// 1. first read the cache
		const data = cache.readQuery({ query: CURRENT_USER_QUERY });
		// 2. remove that item from the cart
		const cartItemId = payload.data.removeFromCart.id;
		data.me.cart = data.me.cart.filter((cartItem) => cartItem.id !== cartItemId);
		// 3. write it back to the cache
		cache.writeQuery({ query: CURRENT_USER_QUERY, data });
	};
	render() {
		const { id } = this.props;
		return (
			<Mutation
				mutation={REMOVE_FROM_CART_MUTATION}
				variables={{ id }}
				update={this.update}
				optimisticResponse={{ __typename: 'Mutation', removeFromCart: { __typename: 'CartItem', id } }}
			>
				{(removeFromCart, { loading, error }) => (
					<BigButton
						disabled={loading}
						onClick={() => {
							removeFromCart().catch((err) => alert(err.message));
						}}
						title="Delete Item"
					>
						&times;
					</BigButton>
				)}
			</Mutation>
		);
	}
}

export default RemoveFromCart;
export { REMOVE_FROM_CART_MUTATION };
