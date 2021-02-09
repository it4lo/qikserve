import React, { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';
import ShoppingCart from '../components/ShoppingCart';
import ModalAddItem from '../components/ModalAddItem';
import api from '../services/api';
import Calculator from '../util/Calculator';
import './global.css';

const Home = () => {

  const [display, setDisplay] = useState('none');
  const [listItems, setListItems] = useState([]);
  const [listItemsCart, setListItemsCart] = useState([]);
  const [item, setItem] = useState({});

  const showModalAddItem = (e, itemSelected) => {
    e.preventDefault();
    setItem(itemSelected);
    setDisplay('flex');
  }

  const handleAddItem = async newItem => {
    const calculator = new Calculator();
    const responseItem = await api.get(`/products/${newItem.id}`);
    const promotion = responseItem.data.promotions.length > 0 ? responseItem.data.promotions[0] : {};
    const contains = listItemsCart.some(itemCart => itemCart.id === newItem.id);
    if (contains) {
      setListItemsCart(listItemsCart.map(itemCart => (itemCart.id === newItem.id ? calculator.execute({ ...itemCart, qty: itemCart.qty + newItem.qty }) : itemCart)))
    } else {
      setListItemsCart([...listItemsCart, calculator.execute({ ...newItem, promotion })])
    }
    setDisplay('none');
    setItem({});
  }

  const handleUpdateQtyItem = (type, item) => {
    const calculator = new Calculator();
    if (type === '+') {
      setListItemsCart(listItemsCart.map(itemCart => (itemCart.id === item.id ? calculator.execute({ ...itemCart, qty: itemCart.qty + 1 }) : itemCart)));
    } else if (item.qty > 1) {
      setListItemsCart(listItemsCart.map(itemCart => (itemCart.id === item.id ? calculator.execute({ ...itemCart, qty: itemCart.qty - 1 }) : itemCart)));
    } else {
      setListItemsCart(listItemsCart.filter(itemCart => itemCart.id !== item.id));
    }
  }

  const handleCancelAddItem = () => {
    setDisplay('none');
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/products');
      setListItems(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <header>
        <div className="menu-openner"><span>0</span>🛒</div>
      </header>
      <main>
        <h1>QikServe Basket</h1>
        <div className="basket-area">
          {listItems.map(item => (
            <ItemList
              key={item.id}
              item={item}
              showModal={showModalAddItem} />
          ))}
        </div>
      </main>

      <ShoppingCart itemsCart={listItemsCart} updateQtyItem={handleUpdateQtyItem} />

      <ModalAddItem
        moode={display}
        cancel={handleCancelAddItem}
        item={item}
        addItem={handleAddItem}
      />
    </>
  )
}

export default Home;