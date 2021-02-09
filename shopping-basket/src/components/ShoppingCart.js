import React, { useState } from 'react'

function reducePromotion(total, item) {
  return total + (item.discount ? item.discount : 0);
}

function reduceSubTotal(total, item) {
  const qty = item.qty;
  const qtyFree = item.qtyFree ? item.qtyFree : 0;
  const price = item.price;
  const totalPrice = (qty + qtyFree) * price;
  return total + totalPrice;
}

function ShoppingCart({ itemsCart, updateQtyItem }) {

  return (
    <aside className="show">
      <div className="cart--area">
        <div className="menu-closer">❌</div>
        <h1>Your Shooping Cart</h1>
        <div className="cart">
          {itemsCart.map(item => {
            return (
              <div key={item.id} className="cart--item">
                <img src={item.img} />
                <div className="cart--item-nome">{`${item.name} ${item.bonus ? item.bonus : ''}`}</div>
                <div className="cart--item--qtarea">
                  <button className="cart--item-qtmenos" onClick={() => updateQtyItem('-', item)}>-</button>
                  <div className="cart--item--qt">{item.qty}</div>
                  <button className="cart--item-qtmais" onClick={() => updateQtyItem('+', item)}>+</button>
                </div>
              </div>
            )
          }
          )}
        </div>
        <div className="cart--details">
          <div className="cart--totalitem subtotal">
            <span>Subtotal</span>
            <span>{itemsCart.reduce(reduceSubTotal, 0)}</span>
          </div>
          <div className="cart--totalitem desconto">
            <span>Desconto</span>
            <span>{itemsCart.reduce(reducePromotion, 0)}</span>
          </div>
          <div className="cart--totalitem total big">
            <span>Total</span>
            <span>{itemsCart.reduce(reduceSubTotal, 0) - itemsCart.reduce(reducePromotion, 0)}</span>
          </div>
          <div className="cart--finalizar">Finalizar a compra</div>
        </div>
      </div>
    </aside>
  )
}

export default ShoppingCart;