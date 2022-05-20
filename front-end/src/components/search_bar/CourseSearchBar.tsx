import { Autocomplete, Button, Group } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseDescriptionModal from './CourseDescriptionModal'

type Props = {
    propsStyle?: React.CSSProperties | undefined
}

function CourseSearchBar({propsStyle}: Props) {
    const [data, setData] = useState([""])
    const [course, setCourse] = useState("")
    const [opened, setOpened] = useState(false)
    const [autocompleteState, setAutocompleteState] = useState("")
    
    useEffect(() => {
        axios.get("/courses")
            .then((res) => {
                const courses = res.data.message
                var newData = []
                for (const course of courses) {
                    newData.push(course.code + " - " + course.name)
                }
                setData(newData)
            })

    }, [])

    const openCourseDescriptionModal = () => {
        setOpened(true)
    }


    return (
        <div>
            <Group
            direction="row"
            >
                <Autocomplete 
                    data={data}
                    limit={5}
                    nothingFound="No course was found"
                    defaultValue=""
                    value={autocompleteState}
                    
                    onChange={(value) => {
                        setAutocompleteState(value)
                    }}

                    onItemSubmit={(item) => {
                        setCourse(item.value)
                        setAutocompleteState(item.value)
                    }}
                />

                <Button
                variant='outline'
                color='dark'
                onClick={() => {
                    if (course){
                        openCourseDescriptionModal();
                        setAutocompleteState("")
                    }
                }}
                >
                    Search
                </Button>
            </Group>
            { 
                course &&
                
                <CourseDescriptionModal
                opened={opened} 
                setOpened={setOpened} 
                course={course} />
            }
        </div>
    )
}

export default CourseSearchBar;