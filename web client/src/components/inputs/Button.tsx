import React from 'react'
import './Button.scss'
import { IStandardInputProps } from './IstandardInputProps'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

interface ButtonProps extends IStandardInputProps {
  type?: 'button' | 'file' | 'checkbox' | 'submit'
  transparent?: boolean
  text: string
  required?: boolean
  textClickRedirectRoute?: string
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  transparent = false,
  text,
  required = false,
  textClickRedirectRoute,
  onclick,
}) => {
  const className = cn('button', { transparent: transparent })

  return (
    <>
      {type == 'button' && (
        <button className={className} onClick={onclick}>
          {text}
        </button>
      )}

      {type == 'file' && (
        <input
          type="file"
          className={className}
          required={required}
          title={text}
          onClick={onclick}
        />
      )}

      {type == 'checkbox' && (
        <span>
          <input
            type="checkbox"
            className={className}
            required={required}
            title={text}
            onClick={onclick}
          />
          {textClickRedirectRoute != undefined && (
            <NavLink
              to={textClickRedirectRoute}
              className={className + 'link-text'}
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
          className={className}
          title={text}
          onClick={onclick}
        ></input>
      )}
    </>
  )
}

export default Button
