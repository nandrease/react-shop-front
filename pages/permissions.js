import PleaseSignIn from '../components/PleaseSignIn';
import PermissionComponent from '../components/Permissions';

const Permissions = (props) => (
	<div>
		<PleaseSignIn>
			<PermissionComponent />
		</PleaseSignIn>
	</div>
);
export default Permissions;
