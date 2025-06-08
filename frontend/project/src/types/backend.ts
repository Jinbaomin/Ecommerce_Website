export interface IBackendResponse<T> {
  statusCode: number | string;
  error?: string;
  message: string;
  data: T;
}

export interface PaginationResult<T> {
  meta: {
    page: number;
    pageSize: number;
    amountPage: number;
    total: number;
  };
  
  data: T;
}

export interface IAccount {
  authenticated: boolean;
  access_token: string;
  user: {
    userId: string;
    fullName: string;
    userName: string;
    email: string;
    phone: string;
    roles: ["ADMIN" | "USER"];
    wishList: IProduct[];
  }
}

// export interface IUser extends Pick<IAccount, 'user'> { };

export interface IGetAccount extends Omit<IAccount, 'access_token'> { }

export interface IUser {
  userId: string;
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  roles: ["ADMIN" | "USER"];
  wishList: IProduct[];
  cart: ICart;
  createdDate: string;
  lastModifiedDate: string;
  modifiedBy: string;
}

export interface IProduct {
  productId: number;
  productName: string;
  price: number;
  salePrice: number;
  description: string;
  quantity: number;
  category: {
    id: number;
    categoryName: string;
  },
  images: string[];
  productInfo: {
    brand: string;
    cpu: string;
    screenSize: string;
    ram: string;
    rom: string;
    batteryLife: string;
  },
  createdAt: string;
  modifiedAt: string;
}

export interface ICartItem {
  id: string;
  quantity: number;
  total: number;
  product: IProduct;
}

export interface ICart {
  id: string;
  total: number;
  cartItems: ICartItem[];
}

export interface IOrderItem {
  orderItemId: string;
  quantity: number;
  total: number;
  product: IProduct;
}

export interface IOrder {
  orderId: string;
  total: number;
  orderItems: IOrderItem[];
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "DELIVERED" | "CANCELED";
  user: IUser,
  orderInfo: {
    shipTo: string;
    shippingMethod: string;
  }
}

export interface ICategory {
  categoryId: string;
  categoryName: string;
  products: IProduct[];
  createdAt: string;
}