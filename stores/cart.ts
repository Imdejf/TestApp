import axios from 'axios'
import { defineStore } from 'pinia'
import { CartDTO } from '~/types/ShoppingCart/Cart'
import { Fetch } from '~/composables/useFetch'
import { $axios } from '~/composables/useAxios'

export interface Cart {
  total: number,
  totalGross: number,
  cartItem: CartItem[]
}

export interface CartItem {
    parentProductId: string
    id: string
    name: string
    filePath: string
    price: number
    productPriceGross: number
    quantity: number
    relatedProducts: CartItemRelatedDTO[],
}

interface CartItemRelatedDTO {
  optionName: string;
  value: string;
 }

interface CartState {
    cart: CartDTO | null,
    items: CartItem[],
    lastAddedItem: CartItem | null,
    totalCount: number, 
    total: number,
    addCartResult: boolean,
    showCart: boolean,
  }

// Definiujemy sklep koszyka
export const useCart = defineStore({
  id: 'cart',
  state: (): CartState => ({
    cart: null,
    items: [],
    lastAddedItem: null,
    totalCount: 0,
    total: 0,
    addCartResult: false,
    showCart: false,
  }),
  getters: {
    // // Obliczamy łączną ilość przedmiotów w koszyku
    // itemCount(): number {
    //   return this.items.reduce((count, item) => count + item.quantity, 0)
    // },
    // // Obliczamy łączną wartość koszyka
    // totalPrice(): number {
    //   return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
    // },
  },
  actions: {
    async initCartBadge(): Promise<void> {
        try {
          // var response = await $axios('product/shoppingcart/CartBadge', {
          //   params: {
          //     userId: useCookie("dsCustomer").value
          //   }
          // })
          // this.setTotalCount(response.data)
          var response = Fetch('/product/shoppingcart/CartBadge', { method: 'get', params: {
            userId: useCookie("dsCustomer").value
          }})

          this.setTotalCount(response?.data?.value)
        } catch (error) {
          console.error(error)
        }
    },
    
    setItems(items: CartItem[]): void {
        // this.items = items
    },

    setTotalCount(totalItems: number): void {
      this.totalCount = totalItems
    },

    setLastAddedItem(item: CartItem): void {
      this.lastAddedItem = item
    },

    setAddCartResult(): void {
      this.addCartResult = true;
    },

    setShowCart(value: boolean): void {
      this.showCart = value;
    },

    async getCartDetail(calculateTransport: boolean): Promise<void> {
      const config = useRuntimeConfig().public;
      const dsCustomer = useCookie('dsCustomer').value

      const { data: cartDetails } = await $axios(
        "product/shoppingcart/GetActiveCartDetails",
        {
          method: "get",
          params: {
            userId: dsCustomer,
            languageId: config.languageId,
            calculateTransport: calculateTransport,
          },
        }
      );

      const cartDetail: CartDTO = cartDetails;
      this.cart = cartDetail
    },

    async addOrderNoteToCart(orderNote: string): Promise<void> {
      const dsStore = useCookie('dsStore')
      const dsCustomer = useCookie('dsCustomer')
      
      Fetch('/product/shoppingcart/UpdateOrderNote', { method: 'put', body: {
        storeId: dsStore,
        userId: dsCustomer,
        orderNote: orderNote
      }})
    },

    calculatePalletsAndCardboards(productId: string, value: number): void {
      const ruleList = this.cart.shippingRule;
      const TAX_RATE = 0.23;
      let shippingPrice = 0;
  
      for (const rule of ruleList ?? []) {
          let quantitySum = rule.cartItems.reduce((sum, item) => {
              if (item.productId === productId) {
                  item.quantity = value;
                  return sum + value;
              }
              return sum + item.quantity;
          }, 0);
          console.log(rule)
          // Logic for pallet
          if(rule.stackPallet) {
            while (quantitySum >= rule.conditionMinForQuantityPallet) {
                if (quantitySum === rule.conditionMinForQuantityPallet || 
                    quantitySum <= rule.conditionMaxForQuantityPallet) {
                    shippingPrice += rule.shipmentPricePallet;
                    break; // finish current iteration, because the products are placed on a pallet
                } else if (quantitySum > rule.conditionMaxForQuantityPallet) {
                    const palletCount = Math.floor(quantitySum / rule.conditionMaxForQuantityPallet);
                    quantitySum -= palletCount * rule.conditionMaxForQuantityPallet;
                    shippingPrice += palletCount * rule.shipmentPricePallet;
                }
            }
        }
          // Logic for cardboard boxes if not placed on a pallet
          if (quantitySum > 0 && quantitySum < rule.conditionMinForQuantityPallet || quantitySum > 0 && !rule.stackPallet) {
              const cardboardCount = Math.ceil(quantitySum / rule.conditionMaxQuantity);
              shippingPrice += cardboardCount * rule.shipmentPrice;
              quantitySum -= cardboardCount * rule.conditionMaxQuantity;
          }
      }
  
      this.cart.shippingAmount = shippingPrice / (1 + TAX_RATE);
      this.cart.shippingAmountGross = shippingPrice;
  },

    async addToCart(item: CartItem): Promise<void> {
      const config = useRuntimeConfig().public;
      const dsCustomer = useCookie('dsCustomer')
      this.setAddCartResult()
      Fetch('/product/shoppingcart/Add', { method: 'post', body: {
        productId: item.id,
        storeId: config.storeId,
        userId: dsCustomer,
        quantity: item.quantity
      }})
      this.totalCount = +this.totalCount + +item.quantity
     
      const cartItem: CartItem = {
        parentProductId: item.parentProductId,
        id: item.id,
        name: item.name,
        filePath: item.filePath,
        price: item.price,
        quantity: item.quantity
      }

      this.setLastAddedItem(cartItem)
    },

    removeFromCart(id: string): void {
      const currentItem = this.cart?.items.find((c) => c.id === id);
      if (currentItem !== null) {
        this.cart.subTotal -= currentItem.productPrice
        this.cart.subTotalGross -= currentItem.productPriceGross
        this.calculatePalletsAndCardboards(currentItem?.productId, 0)
        this.cart.orderTotal = this.cart?.subTotalGross + this.cart?.shippingAmountGross
        const index = this.cart?.items.indexOf(currentItem);
        if (index > -1) {
          this.cart?.items.splice(index, 1);
        }        
        Fetch(`/product/shoppingcart/${id}`, {method: "delete"});
      }
    },

     updateQuantity(cartId:string, productId:string, quantity: number): void {
      const dsCustomer = useCookie('dsCustomer')
       Fetch('/product/shoppingcart/update-product-quantity-cart', { method:"put" ,body:{
        cartId: cartId,
        userId: dsCustomer,
        cartItemId: productId,
        quantity: quantity
      }})
      const cartItem = this.cart.items.find((item) => item.productId === productId);

      if (cartItem) {
        const TAX_RATE = 0.23;
        cartItem.quantity = quantity;
    
        this.cart.subTotal = this.cart.items.reduce((sum, item) => sum + item.quantity * item.productPrice, 0);
        this.cart.subTotalGross = this.cart.subTotal * (1 + TAX_RATE);
    
        this.calculatePalletsAndCardboards(productId, quantity);

        this.cart.orderTotal = this.cart.subTotalGross + this.cart?.shippingAmountGross 
      }
    },

    increaseQuantity(id: string): void {
      const dsStore = useCookie('dsStore')
      const dsCustomer = useCookie('dsCustomer')
      Fetch('/product/shoppingcart/Add', { method: 'post', body: {
        productId: item.id,
        storeId: dsStore,
        userId: dsCustomer,
        Quantity: item.quantity
      }})
    },

    decreaseQuantity(id: string): void {
      const item = this.items.find((i) => i.id === id)
      if (item && item.quantity > 1) {
        item.quantity--
      }
    },

    clearCart(): void {
      this.items = []
    },
  },
})