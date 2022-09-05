import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
export default function Icon({ type, className, ...rest }) {
  return (
    <svg className={classNames('icon', className)} aria-hidden="true" {...rest}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
Icon.propTypes = {
  type: PropTypes.string.isRequired
}
