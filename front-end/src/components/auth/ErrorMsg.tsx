import React from 'react'
import { Text } from '@mantine/core' 

type Props = {
    children: string
}

    function ErrorMsg({children}: Props) {
    return (
        <div>
            <Text color="red">
                {children}
            </Text>

        </div>
    )
}

export default ErrorMsg