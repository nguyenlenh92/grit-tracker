import React, { useState } from 'react';
import {
	AppShell,
	Navbar,
	useMantineTheme,
} from '@mantine/core';
import NavBar from './components/NavBar';
import Content from './components/Content';
import Requirements from './components/requirements/Requirements';
import { ScrollArea } from '@mantine/core';



const App = () => {
	const [opened, setOpened] = useState(false);

	const theme = useMantineTheme();

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			fixed
			navbar={
				// makes sure u pass opened props from <Header /> to this Navbar for hidden prop
				/* The navbar that is hidden on mobile and shown on desktop. */
				<Navbar p="sm" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
					<Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
						<Requirements />
					</Navbar.Section>
				</Navbar>
			}

			header={
				<NavBar opened_callback={setOpened}></NavBar>
			}
		>
			<Content />
		</AppShell>
	);
}


export default App
