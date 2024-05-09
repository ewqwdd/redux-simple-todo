import { Alert } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { FetchStatus } from "../model/types"

interface TodoErrorProps {
    status: FetchStatus
}

export default memo(function TodoError({status}: TodoErrorProps) {
  
    const [visible, setVisible] = useState<boolean>(false)

    const handleClose = useCallback(() => {
        setVisible(false)
    }, [])

    useEffect(() => {
        if (status === 'error') {
            setVisible(true)
        }
    }, [status])
    
    if (visible) return(
        <Alert message="Error while fetching the data" type="error" closable afterClose={handleClose} />
    )
    return null
}
)