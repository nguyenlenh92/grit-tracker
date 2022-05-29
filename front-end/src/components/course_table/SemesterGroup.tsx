import React, { useState, useEffect } from 'react'
import SemesterTable from './SemesterTable'
import { Button, Group } from '@mantine/core'
import { CourseType, MapToObject } from '../utils/interface'
import axios from 'axios'

type Props = {}

// const findLatest = (data: any) => {
// 	var index = -1
// 	var current_year = data[0].year
// 	var current_semester: string = data[0].semester

// 	for (let i = 0; i < data.length; i++){
// 		if (data[i].year === current_year){
// 			var current_semester_mapping = SemesterMapping.get(current_semester)
// 			var next_semester_mapping = SemesterMapping.get(data[i].semester)
// 			if (current_semester_mapping && next_semester_mapping){
// 				if (current_semester_mapping < next_semester_mapping){
// 					current_semester = data[i].semester
// 					index = i
// 				}
// 			}
// 		}
// 		else{
// 			if (current_year < data[i].year){
// 				current_year = data[i].year
// 				index = i
// 			}
// 		}
// 	}

// 	return index
// }



const SemesterGroup = (props: Props) => {
	const [currentSemester, setCurrentSemester] = useState('Fall')
	const [year, setYear] = useState(2022)
	const [semesterData, setSemesterData] = useState<Map<string, CourseType[]>>(new Map<string, CourseType[]>())
	const [data, setData] = useState<MapToObject>({})
	const [editable, setEditable] = useState(false)
	const [EditText, setEditText] = useState("Edit")
	const POSSIBLE_SEMESTER = [
		'Fall',
		'Winter',
		'Spring',
		'Summer'
	]

	useEffect(() => {
		if (window.localStorage.getItem('username')){
		axios.get(`profile/${window.localStorage.getItem('username')}/unique-semester`)
		.then((res) => {
			const data = res.data.message

			for (const course of data) {
				const semester_year: string = course.semester.concat(" ", course.year.toString())
				semesterData.set(semester_year, [])
			}
		})
		.then(() => {
			axios.get(`/profile/${window.localStorage.getItem('username')}`)
				.then((res) => {
					const data = res.data.message
					for (const course of data) {
						var index = 0
						const semester_year: string = course.semester.concat(" ", course.year.toString())
						const currentSchedule: CourseType[] | undefined = (semesterData.get(semester_year) !== undefined ? semesterData.get(semester_year) : [])
						const newCourse = {
							id: index,
							class_code: course.code,
							class_name: course.Course.name,
							notes: course.notes,
							grade: course.grade,
						}
						if (currentSchedule){
							semesterData.set(semester_year, currentSchedule.concat([newCourse]))
						}
						index += 1
					}					
					setData(Object.fromEntries(semesterData))
			
					// INIT CURRENT SEMESTER AND YEAR
					if (data.length){					
						const latest_index = -1
						setCurrentSemester((data.at(latest_index)).semester)
						setYear((data.at(latest_index)).year)
					}
					else {
						setCurrentSemester("Fall")
						setYear(2022)
					}
				})
		})
		}
	}, [])

	const handleCreateNewSemester = () => {
		var new_year = year
		if (currentSemester === POSSIBLE_SEMESTER.at(1)){
			new_year += 1
			setYear(new_year)
		}
		
		const numItems = Object.keys(data).length
		var semester_index = numItems % POSSIBLE_SEMESTER.length
		setCurrentSemester(POSSIBLE_SEMESTER[semester_index])
		
		var next_semester_type = POSSIBLE_SEMESTER[semester_index]
		const new_semester = next_semester_type + " " + new_year
		semesterData.set(new_semester, [])
		setData(Object.fromEntries(semesterData))
	}

	const changeEditableState = () => {
		const current_state = editable
		const current_text = EditText
		setEditable(!current_state)
		EditText === "Edit" ? setEditText("Cancel") : setEditText("Edit")
	}

	return (
		<div style={{ display: 'block' }}>
			{/* <h1>Year {year % (initial_year) + 1}</h1> */}
			{/* TODO: CREATE YEAR HEADER BEFORE EVERY FALL SEMESTER */}
			{/* {console.log([...Array(year - initial_year).keys()])}
			{
				[...Array(year - initial_year).keys()].map((num) => {
					return(
						<div>
							{currentSemester === POSSIBLE_SEMESTER[0] &&
							<h1>Year {num}</h1>}
						</div>
					)
				})
			} */}

			<Group
			direction="column"
			spacing="xl"
			>
				<Button
					onClick={() => {changeEditableState()}}
					variant='outline'
					color='green'
					style={{ display: 'block', marginLeft: 'auto', marginRight: 0 }}>
					{EditText}
				</Button>
			
			{	
				Object.keys(data).map((value, index) => {
					return (<SemesterTable editTable={editable} data={semesterData.get(value)} key={index} semester={value} />)
				})

			}

			</Group>
			<Button
				onClick={() => { handleCreateNewSemester() }}
				variant='outline'
				color={'green'}
				style={{ display: 'block', marginTop: '5rem', marginLeft: 'auto', marginRight: 'auto' }}>
				Add new semester
			</Button>
		</div>
	)
}

export default SemesterGroup