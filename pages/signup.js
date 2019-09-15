import SignUpComponent from '../components/SignUp';
import SignInComponent from '../components/SignIn';
import ResetComponent from '../components/RequestReset';
import styled from 'styled-components';

const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 20px;
`;

const SignUp = (props) => (
	<Columns>
		<SignUpComponent />
		<SignInComponent />
		<ResetComponent />
	</Columns>
);
export default SignUp;
