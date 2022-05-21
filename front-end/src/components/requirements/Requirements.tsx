import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RequirementType } from '../utils/interface';
import { Accordion, Text, ThemeIcon } from '@mantine/core';
import { Check, ExclamationMark } from 'tabler-icons-react';
type Props = {}

const Requirements = (props: Props) => {
    const [requirements, setRequirements] = useState<RequirementType[]>([])

    useEffect(() => {
        const username = window.localStorage.getItem('username')
        if (username) {
            axios.get(`/requirement/${username}`)
                .then(res => {
                    const data = res.data.message
                    var newRequirements: RequirementType[] = []
                    for (const requirement of data) {
                        newRequirements.push({
                            name: requirement.Requirement.name,
                            satisfies: requirement.satisfies,
                            satisfy_condition: requirement.Requirement.satisfy_condition
                        })
                    }
                    setRequirements(newRequirements)
                })
        }
    }, [])

  return (
    <div>
          <Accordion multiple disableIconRotation offsetIcon={false} iconSize={15}>

        {
            requirements.map((requirement, index) => {
                return (
                    <Accordion.Item 
                    label={requirement.name}  
                    style={requirement.satisfies ? { color: 'green' } : { color: 'red' }} 
                    key={index} 
                    icon={
                        <ThemeIcon color={requirement.satisfies ? "green" : "red"} variant="light">
                            {   requirement.satisfies &&
                                <Check size={14} />
                            }
                            {   !requirement.satisfies &&
                                <ExclamationMark size={14} />
                            }
                        </ThemeIcon>
                    } >
                        {requirement.satisfy_condition}
                    </Accordion.Item>
                )
            })
        }
        </Accordion>

    </div>
  )
}

export default Requirements;