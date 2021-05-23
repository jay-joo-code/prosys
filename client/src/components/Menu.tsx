import Grow from '@material-ui/core/Grow'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import React from 'react'
import styled from 'styled-components'
import OutsideClickListener from './util/OutsideClickListener'

export interface Option {
  label: string
  onClick: () => void
}

interface MenuProps {
  options: Option[]
  children: React.ReactNode
  offset?: number
}

const Menu = ({ options, children, offset }: MenuProps) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Anchor
        ref={anchorRef}
        onClick={handleToggle}
      >
        {children}
      </Anchor>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={{
          offset: {
            enabled: true,
            offset: `0, ${offset || 0}`,
          },
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <OutsideClickListener
                onOutsideClick={handleClose}
                isListening
              >
                <MenuList
                  autoFocusItem={open}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option.label}
                      onClick={() => {
                        option.onClick()
                        handleClose()
                      }}
                    >{option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </OutsideClickListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const Anchor = styled.div`
  display: inline-block;
`

export default Menu
