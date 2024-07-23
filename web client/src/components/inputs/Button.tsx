import React from 'react'
import './Button.scss'
import { IStandardInputProps } from './IstandardInputProps'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

interface ButtonProps extends IStandardInputProps {
  type?: 'button' | 'file' | 'checkbox' | 'submit'
  className?: string
  transparent?: boolean
  text: string
  required?: boolean
  textClickRedirectRoute?: string
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  transparent = false,
  text,
  required = false,
  textClickRedirectRoute,
  onclick,
}) => {
  const fullClassName = cn(`button ${className}`, { transparent: transparent })

  return (
    <>
      {type == 'button' && (
        <button className={fullClassName} onClick={onclick}>
          {text}
        </button>
      )}

      {type == 'file' && (
        <input
          type="file"
          className={`${fullClassName} file`}
          required={required}
          title={text}
          onClick={onclick}
        />
      )}

      {type == 'checkbox' && (
        <span>
          <input
            type="checkbox"
            className={fullClassName}
            required={required}
            title={text}
            onClick={onclick}
          />
          {textClickRedirectRoute != undefined && (
            <NavLink
              to={textClickRedirectRoute}
              className={`${fullClassName} link-text`}
            >
              {text}
            </NavLink>
          )}
          {textClickRedirectRoute == undefined && text}
        </span>
      )}

      {type == 'submit' && (
        <input
          type="submit"
          className={fullClassName}
          title={text}
          onClick={onclick}
        ></input>
      )}
    </>
  )
}

export default Button
