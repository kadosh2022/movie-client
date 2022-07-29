import React from 'react'
import './styles/forminput.css'

function FormInput({ type, onChange, placeholder, value }) {
    return (
        <>
            <input
                className='form-input'
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value}
            />
        </>
    )
}

export default FormInput
