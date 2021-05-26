import React from 'react'
import PropTypes from 'prop-types'

export const Error = ({text}) => {
    return (
        <div className="search__error">
            {text}
        </div>
    )
}

Error.propTypes = {
    text: PropTypes.string.isRequired
}
