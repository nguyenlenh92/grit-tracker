import React from 'react'
import SemesterGroup from './course_table/SemesterGroup'

interface ContentProps {}

function Content(props: ContentProps) {

	return (
		<div style={{display: 'block'}}>
			<SemesterGroup></SemesterGroup>
		</div>
		
	)
}


export default Content
