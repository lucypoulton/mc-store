import {useNavigate} from "react-router-dom";

export function SuccessComponent() {

	const navigate = useNavigate()

	return <div>
		<h1>Success</h1>
		<p>Your stuff will be delivered shortly.</p>
		<button onClick={() => navigate('/')}>Go home</button>
	</div>
}