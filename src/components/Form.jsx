import React from 'react'

function Form({onSubmit, children}) {
    return (
        <>
            <form 
                className='form-main'
                onSubmit={onSubmit}
            >
                {children}
            </form>
        </>
    )
}

export default Form