export default class Calculator {

  constructor() {
    this.calculation = new Map();
    this.calculation.set("FLAT_PERCENT", "calculateByPercent");
    this.calculation.set("QTY_BASED_PRICE_OVERRIDE", "calculateByQtyBasedPrice");
    this.calculation.set("BUY_X_GET_Y_FREE", "calculateByBuyXgetY");
  }

  calculateByPercent(item) {
    console.log(item);
    let discount = 0;
    const totalItem = item.price * item.qty;
    discount = (item.promotion.amount / 100) * totalItem;
    return { ...item, discount: parseInt(discount) };
  }

  calculateByQtyBasedPrice(item) {
    console.log(item);
    let discount = 0
    if (item.qty >= item.promotion.required_qty) {
      discount = item.price - item.promotion.price;
    }
    return { ...item, discount: (item.qty * discount) };
  }

  calculateByBuyXgetY(item) {
    console.log(item);
    const qtyFree = parseInt(item.qty / item.promotion.required_qty)
    const discount = (qtyFree * item.promotion.free_qty * item.price);
    return {
      ...item,
      discount: discount,
      qtyFree: qtyFree,
      bonus: qtyFree > 0 ? `+ ${qtyFree} free` : undefined
    };
  }

  execute(item) {
    if (item.promotion.type) {
      return this[this.calculation.get(item.promotion.type)](item)
    } else {
      return item;
     }
  }
}