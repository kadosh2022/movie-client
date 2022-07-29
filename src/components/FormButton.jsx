import React from 'react';
import './styles/formbutton.css';
import PropTypes from 'prop-types'

function FormButton({text, isDisabled}) {
    return (
        <>
            <button
                disabled={isDisabled}
                className='form-btn'
            >
                {text}
            </button>
        </>
    )
}

export default FormButton

FormButton.defaultProps = {
    isDisabled: false
}