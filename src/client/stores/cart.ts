import { get } from "mongoose";
import { defineStore } from "pinia";
import type { IDBUserCart } from "~~/types/model/user";

export const useCartStore = defineStore("cart", () => {
  const cart: any = ref(undefined);
  async function setCart(data: IDBUserCart | null) {
    try {
      const setCart = await useAPI("client/cart/add", data);
      await getCart();
      return Promise.resolve(setCart);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async function getCart() {
    try {
      const getCart = await useAPI("client/cart/get");
      cart.value = getCart;
      return getCart;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async function updateCart(data:any) {
    try {
      const updateCart = await useAPI("client/cart/edit", data);
      await getCart();
      return Promise.resolve(updateCart);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async function updateOption(data:any) {
    try {
      const updateOption = await useAPI("client/cart/option", data);
      await getCart();
      return Promise.resolve(updateOption);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async function delCart(_id: string) {
    try {
      await useAPI("client/cart/del", { _id });
      await getCart();
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return { cart, setCart, getCart, delCart, updateCart, updateOption };
});
