import { Modal, Text } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Props = {
	opened: boolean,
	setOpened: React.Dispatch<React.SetStateAction<boolean>>,
	course: string,
}

const CourseDescriptionModal = (props: Props) => {
	const [title, setTitle] = useState("")
	const [courseID, setCourseID] = useState("0")
	const [description, setDescription] = useState("")
	const [credits, setCredits] = useState(0)
	
	useEffect(() => {
		var course = props.course.split(' - ')[0]

		axios.get(`/course/${course}`)
		.then((res) => {
			setTitle(props.course)
			setCourseID(res.data.message.course_id)
			setDescription(res.data.message.description)
			setCredits(res.data.message.credits)
		})
	

	}, [props.course])
	
	return (
		<div>            
			<Modal
			opened={props.opened}
			onClose={() => { props.setOpened(false) }}
			title="Course description"
			>
				<Text>{title}</Text>
				<Text>Credits: {credits}</Text>
				<Text>Course ID: {courseID}</Text>
				<Text>Attributes: {}</Text>
				<Text>Description: {description}</Text>
			</Modal>
		</div>
	)
}

export default CourseDescriptionModal