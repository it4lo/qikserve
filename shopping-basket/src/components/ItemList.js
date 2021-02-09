import React from 'react';

function ItemList({ item, showModal ,addItem }) {
  return (
    <div className="basket-item">
      <a href="" onClick={(event) => showModal(event, item)}>
        <div className="basket-item--img"><img src={item.img} /></div>
        <div className="basket-item--add">+</div>
      </a>
      <div className="basket-item--price">{`$${item.price}`}</div>
      <div className="basket-item--name">{item.name}</div>
    </div>
  )

}

export default ItemList;