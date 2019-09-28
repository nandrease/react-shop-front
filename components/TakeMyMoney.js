import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';
import { create } from 'domain';

const CREATE_ORDER_MUTATION = gql`
	mutation CREATE_ORDER_MUTATION($token: String!) {
		createOrder(token: $token) {
			id
			charge
			total
			items {
				id
				title
			}
		}
	}
`;

function totalItems(cart) {
	return cart.reduce((tally, cartItem) => (tally = tally + cartItem.quantity), 0);
}

class TakeMyMoney extends Component {
	onToken = async (res, createOrder) => {
		NProgress.start();
		console.log('On token called');
		console.log(res.id);
		// manually call the mutation once we have the Stripe token
		const order = await createOrder({
			variables: {
				token: res.id
			}
		}).catch((err) => alert(err.message));
		console.log(order);
		Router.push({
			pathname: '/order',
			query: {
				id: order.data.createOrder.id
			}
		});
	};
	render() {
		return (
			<User>
				{({ data: { me }, loading }) => {
					if (loading) return null;
					return (
						<Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[ { query: CURRENT_USER_QUERY } ]}>
							{(createOrder) => (
								<StripeCheckout
									amount={calcTotalPrice(me.cart)}
									name="Shop-react"
									description={`Order of ${totalItems(me.cart)}`}
									image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
									stripeKey="pk_test_lhcc6UXxwByIR6M0gcfJPn3k"
									currency="EUR"
									email={me.email}
									token={(res) => this.onToken(res, createOrder)}
								>
									{this.props.children}
								</StripeCheckout>
							)}
						</Mutation>
					);
				}}
			</User>
		);
	}
}

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
