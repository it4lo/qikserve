import React, { useState } from 'react'


function ModalAddItem({ moode, cancel, item, addItem }) {

  const [qty, setQty] = useState(1);

  const counter = type => {
    if (type === '+') {
      setQty(qty + 1);
    } else if (qty > 1) {
      setQty(qty - 1);
    }
  }

  const addCart = () => {
    addItem({ ...item, qty: qty });
    setQty(1);
  }


  return (
    <div className="basketWindowArea" style={{ display: moode }}>
      <div className="basketWindowBody">
        <div className="basketInfo--cancelMobileButton">Voltar</div>
        <div className="basketBig">
          <img src={item.img} />
        </div>
        <div className="basketInfo">
          <h1>{item.name}</h1>
          <div className="basketInfo--pricearea">
            <div className="basketInfo--sector">Preço</div>
            <div className="basketInfo--price">
              <div className="basketInfo--actualPrice">{`$${item.price}`}</div>
              <div className="basketInfo--qtarea">
                <button className="basketInfo--qtmenos" onClick={() => counter('-')} >-</button>
                <div className="basketInfo--qt">{qty}</div>
                <button className="basketInfo--qtmais" onClick={() => counter('+')}>+</button>
              </div>
            </div>
          </div>
          <div className="basketInfo--addButton" onClick={addCart}>Adicionar ao carrinho</div>
          <div className="basketInfo--cancelButton" onClick={cancel}>Cancelar</div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddItem;