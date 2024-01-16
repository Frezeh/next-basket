export const BASE_URL = "https://dummyjson.com";

export interface Response {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  next: number | undefined;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductListType extends Product {
  quantity: number;
}

export const cartTotal = (cart: ProductListType[]) => {
  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  return { totalPrice, totalQuantity };
};