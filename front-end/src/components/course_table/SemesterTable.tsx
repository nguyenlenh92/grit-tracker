import React, { useEffect, useState } from 'react'
import { Button, Table, Group } from '@mantine/core'
import { 
	DragDropContext, 
	Droppable, 
	Draggable, 
	DropResult, 
	DraggingStyle,
	NotDraggingStyle } from 'react-beautiful-dnd'

import AddCourseModal from './AddCourseModal'
import { CourseType } from '../utils/interface'
import axios from 'axios'

type Props = {
	semester: string,
	data?: CourseType[],
	editTable: boolean
}

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
	// some basic styles to make the items look a bit nicer
	// userSelect: "none",

	// change background colour if dragging
	// background: (isDragging ? "lightgreen" : "grey"),

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
	background: isDraggingOver ? "lightblue" : "lightgrey",
	// padding: "grid",
	// width: 250
});


const SemesterTable = (props: Props) => {
	const [coursesOrder, setCoursesOrder] = useState<CourseType[]>([])
	const [opened, setOpened] = useState(false)
	const [notes, setNotes] = useState("")
	const [grade, setGrade] = useState("")

	useEffect(() => {
		if (props.data){
			setCoursesOrder(props.data)
		}
		else {
			setCoursesOrder([])
		}
	}, [props.data])
	

	const handleOnDragEnd = (result: DropResult) => {
		const items = Array.from(coursesOrder);
		const [reorderedItem] = items.splice(result.source.index, 1);
		console.log(result)
		if (result.destination){
			items.splice(result.destination.index, 0, reorderedItem);
		}
		else {
			const course = coursesOrder[result.source.index]
			const username = window.localStorage.getItem('username')
			if (username){
				axios.post(`/profile/getProfileID`, {
					code: course.class_code,
					username: username
				})
				.then((res) => {
					const profileID = res.data.message.id
					axios.delete(`/profile/delete/${username}/${profileID}`)
					.then((res) => {
						console.log(res)
					})
					.catch(err => {console.error(err)})
				})
				.catch(err => {console.error(err)})
			}
		}

		setCoursesOrder(items);
	} 

	const handleAddCourse = (value: string) => {
		
		const words = value.split(" - ")
		var class_code = words[0]
		var class_name = words[1]
		const newCourse = {
			id: 1,
			class_code: class_code,
			class_name: class_name,
			grade: grade,
			notes: notes
		}
		coursesOrder.push(newCourse)
		const username = window.localStorage.getItem('username')
		const [semester, year] = props.semester.split(' ') 
		if (username){ 
			axios.post(`/profile/${username}`, {
				semester: semester,
				year: parseInt(year),
				notes: notes,
				grade: grade,
				code: class_code,
				username: username,
			})
		}
	}

	return (
		<div style={{display: 'block', width: '50%', margin: 'auto'}}>
			<Group
			direction="column"
			spacing="sm"
			>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="semesterTable">
						{(provided, snapshot) => (
							<Table 
							highlightOnHover
							horizontalSpacing="sm" 
							className="semesterTable"
							style={getListStyle(snapshot.isDraggingOver) }

							{...provided.droppableProps} ref={provided.innerRef}>
								<thead>
									<tr>
										<th>{props.semester}</th>
										<th>Name</th>
										<th>Grade</th>
										<th>Additional Notes</th>
									</tr>
								</thead>
								<tbody>

									{
									coursesOrder.map((course, index) => {
											return(							
											<Draggable key={index} draggableId={course.class_code + index.toString()} index = {index}>
											{(provided, snapshot) => (
													<tr 
													className="row" 
													ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
													>
														<td style={{ width: "120px" }}>{course.class_code}</td>
														<td style={{ width: "120px" }}>{course.class_name}</td>
														<td style={{ width: "120px" }} contentEditable={props.editTable}>{course.grade}</td>
														<td style={{ width: "120px" }} contentEditable={props.editTable}>{course.notes}</td>
													</tr>)
											}
											</Draggable>
										)})
									}
									{provided.placeholder}
								</tbody>
							</Table>
						)}
					</Droppable>
				</DragDropContext>

				
				<Button
					onClick={() => { setOpened(true) }}
					variant='outline' 
					color='green' 
					style={{ display: 'block', marginLeft: 'auto', marginRight: 0 }}>
					Add course
				</Button>

			</Group>
			
			<AddCourseModal 
				opened={opened}
				opened_callback={setOpened}
				handleAddCourse={handleAddCourse}
				setGrade={setGrade}
				setNotes={setNotes}
				notes={notes}
			/>
			</div>
	)
}
export default SemesterTable;