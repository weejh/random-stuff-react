import React, { Component } from 'react'

export default class ProductResult extends Component {
  render () {
    const { productResult } = this.props

    const productListDOM = productResult.map(function (product) {
      return <div>{product.title}</div>
    })

    return (
      <div className='productResult'>
        {productListDOM}
      </div>
    )

  }
}
