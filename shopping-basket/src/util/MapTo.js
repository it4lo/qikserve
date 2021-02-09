import  Calculator  from './Calculator'

export async function mapToAddItem(itemCart, newItem) {
  //const calculator = new Calculator();
  //await calculator.execute('FLAT_PERCENT', 'ITEM');
  const item =  itemCart.id === newItem.id ? { ...itemCart, qty: itemCart.qty + newItem.qty } : itemCart;
  return item;
}