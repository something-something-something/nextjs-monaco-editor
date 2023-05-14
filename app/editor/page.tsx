import ClientSideOnly from '../../components/ClientSideOnly';
import Comp from '../../components/Comp';
import Editor from '../../components/Editor';

export default function Page() {
	return (
		<>
			<ClientSideOnly>
				<Comp />
			</ClientSideOnly>
		</>
	);
}
