import React, { useEffect, useState } from 'react'
import { Modal, Button, Group, Select, SelectItem, Textarea } from '@mantine/core'
import axios from 'axios'


type Props = {
	handleAddCourse: Function
	opened: boolean,
	opened_callback: Function,
	setGrade: Function,
	setNotes: Function,
	notes: string,
}



const AddCourseModel = (props: Props) => {
	const [subject, setSubject] = useState("")
	const [courses, setCourses] = useState([{ label: "", value: "" }])
	const [newCourse, setNewCourse] = useState("")
	const [subjects, setSubjects] = useState<SelectItem[]>([])


	useEffect(() => {
		axios.get('/degrees')
		.then((res) => {
			const degrees = res.data.message
			var subjectsArray: SelectItem[] = []
			for (const degree of degrees){
				const newDegree = {
					value: degree.prefix,
					label: degree.name
				}
				subjectsArray.push(newDegree)
			}
			setSubjects(subjectsArray)
		})

	}, [subjects])
	
	const populateCourseSelector = (subject: string) => {
		axios.get(`/courses/${subject}`)
			.then((res) => {
				const newCourses = res.data.message
				var coursesArray = []

				for (const newCourse of newCourses) {
					var course = {
						value: newCourse.code + " - " + newCourse.name,
						label: newCourse.code + " - " + newCourse.name
					}
					coursesArray.push(course)
				}
				setCourses(coursesArray)
			})
	}

	const handleSelectCourse = (newSubject: string) => {
		setSubject(newSubject)
		populateCourseSelector(newSubject)
	}
	
	const handleCourseSelectorClose = () => {
		props.opened_callback(false)
		setSubject("")
	}

	return (
		<div> 
			<Modal
				centered
				opened={props.opened}
				onClose={() => handleCourseSelectorClose()}
				title="Course Selector"
			>
				<Group position='center' direction='column' grow={true}>
					<Select
						label="Subject"
						placeholder="Pick one"
						data={subjects}
						onChange={(newSubject: string) => { handleSelectCourse(newSubject) }}

					/>
					{subject &&
						<>
							<Select
								label="Course"
								placeholder="Pick one"
								data={courses}
								onChange={(newCourse: string) => {
									setNewCourse(newCourse)
								}}
							/>

							<Select 
								label="Grade"
								placeholder="Select a grade"
								data={['A', 'B', 'C', 'D', 'F']}
								onChange={(newGrade: string) => {
									props.setGrade(newGrade)
								}}
							/>
							<Textarea 
								label="Notes"
								placeholder=""
								value={props.notes}
								onChange={(event) => {
									props.setNotes(event.currentTarget.value)
								}}
							/>
						</>
					}

					<Button
						onClick={() => {
							props.handleAddCourse(newCourse)
							handleCourseSelectorClose()
							window.location.reload()
						}}>
						Add
					</Button>
				</Group>
			</Modal>
		</div>
	)
}

export default AddCourseModel