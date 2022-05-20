import React, { useState } from 'react'
import {
  Header,
  MediaQuery,
  Burger,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core"
import CourseSearchBar from './search_bar/CourseSearchBar'
import Authentication from './auth/Authentication'
import './NavBar.Style.css'


interface NavBarProps {
	opened_callback: React.Dispatch<React.SetStateAction<boolean>>,
}

function NavBar(props: NavBarProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

	return (
	<div>
		<Header height={70} p="md">
		<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
			<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
				<Burger
					opened={opened}
					onClick={() => props.opened_callback((o) => !o)}
					size="sm"
					color={theme.colors.gray[6]}
					mr="xl"
				/>
			</MediaQuery>
			<a
				href="/"
				className="NavBarLink">
			<Group>
				<Image
					width={40}
					src="https://styleguide.umbc.edu/files/2019/09/UMBCretrievers_JUSTHEAD-1C-768x682.png">
				</Image>
				<Text>Grit Tracker</Text>
			</Group>
			
			</a>
				<div style={{ 
				marginLeft: 'auto', 
				marginRight: 0, 
				display: 'flex', 
				flexDirection: 'row',
				alignItems: 'inherit',
				gap: '0.5rem' }}>
					<Authentication />
					<CourseSearchBar />
				</div>
		</div>
		</Header>
	</div>
	)
	}

export default NavBar;