import React, {useContext} from 'react';
import {useRoutes} from "react-router-dom";
import {ProductRoute} from "./pages/products";
import Navbar from "./components/navbar";
import {ConfigContext} from "./context";

function App() {
	const component = useRoutes([ProductRoute]);
	const branding = useContext(ConfigContext);
	return <>
		<style>
			{`@import url('https://fonts.googleapis.com/css2?family=${branding.theme.font.name.replace(' ', '+')}&display=swap');
:root {
	font: ${branding.theme.font.size} "${branding.theme.font.name}", sans-serif;	
	--color-main-bg: ${branding.theme.main[0]};
	--color-accent-bg: ${branding.theme.accent[0]};
	--color-alt-bg: ${branding.theme.alt[0]};
	--color-card-bg: ${branding.theme.card[0]};
	
	--color-main-fg: ${branding.theme.main[1]};
	--color-accent-fg: ${branding.theme.accent[1]};
	--color-alt-fg: ${branding.theme.alt[1]};
	--color-card-fg: ${branding.theme.card[1]};
	
	--shadow: ${branding.theme.shadow};
	--border-radius: ${branding.theme.roundedCorners}px;
}
.rounded {
	border-radius: var(--border-radius);
}`}
		</style>
		<Navbar/>
		{component}
	</>
}

export default App;
