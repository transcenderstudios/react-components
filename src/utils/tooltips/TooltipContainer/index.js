import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import styles from './styles.css'

import Tooltip from '../../../Tooltip'
import getBestRelativePlacement from '../../positioning/getBestRelativePlacement'

const mediumTooltipLimit = 50

const calculateTooltipSize = (content) => (
  mediumTooltipLimit < content.length ? 'medium' : 'default'
)

const rtlPositions = {
  top: 'top',
  bottom: 'bottom',
  left: 'right',
  right: 'left'
}

class TooltipContainer extends Component {
  componentWillMount = () => {
    this.container = document.createElement('div')
    this.container.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'
    this.container.style.position = 'absolute'
    this.container.style.visibility = 'hidden'
    this.container.style.top = '0px'
    this.container.style.left = '0px'
    this.container.style.width = '100%'
    document.body.appendChild(this.container)
  }

  componentWillReceiveProps = ({ content }) => {
    if (!content) {
      this.setState({ tooltipBounds: null })

      return null
    }

    // Render an invisible tooltip into the DOM in order to analyze its dimensions,
    // so we know exactly how to place it correctly when we render it.
    render(
      <Tooltip size={calculateTooltipSize(content)}>
        {content}
      </Tooltip>,
      this.container,
      () => {
        const tooltipBounds = this.container
          .firstElementChild
          .getBoundingClientRect()

        this.setState({ tooltipBounds })
      }
    )
  }

  render = () => {
    if (!(this.state && this.state.tooltipBounds)) {
      return null
    }

    const { tooltipBounds: tBounds } = this.state
    const { content, anchor, positions: rawPositions, dir } = this.props

    const positions = (() =>
      typeof rawPositions === 'string'
        ? [ rawPositions ]
        : rawPositions

    )().map(position => (
      dir === 'rtl'
        ? rtlPositions[position]
        : position
    ))

    const aBounds = anchor.getBoundingClientRect()

    const { rect: { left, top }, position } = getBestRelativePlacement({
      positions,
      anchor: {
        left: aBounds.left,
        right: aBounds.right,
        top: aBounds.top,
        bottom: aBounds.bottom,
        width: aBounds.width,
        height: aBounds.height,
        margins: { left: 5, top: 5, right: 5, bottom: 5 }
      },
      centerPoint: 0,
      target: {
        width: tBounds.width,
        height: tBounds.height
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })

    return (
      <div className={styles.container}>
        <Tooltip
          left={left}
          top={top}
          position={position}
          size={calculateTooltipSize(content)}
        >
          {content}
        </Tooltip>
      </div>
    )
  }
}

TooltipContainer.propTypes = {
  positions: PropTypes.oneOfType([
    PropTypes.oneOf([ 'top', 'right', 'bottom', 'left' ]),
    PropTypes.arrayOf(PropTypes.oneOf([ 'top', 'right', 'bottom', 'left' ]))
  ]),
  content: PropTypes.string,
  anchor: PropTypes.object,
  dir: PropTypes.oneOf(['rtl', 'ltr'])
}

TooltipContainer.defaultProps = {
  positions: ['top', 'bottom', 'left', 'right'],
  dir: 'ltr'
}

export default TooltipContainer
