export interface IBackendResponse<T> {
  statusCode: number | string;
  error?: string;
  message: string;
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

export interface IUser extends Pick<IAccount, 'user'> { };

export interface IGetAccount extends Omit<IAccount, 'access_token'> { }

export interface IUser {
  userId: string;
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  roles: ["ADMIN" | "USER"];
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
  }
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

export interface IOrder {
  orderId: string;
  total: number;
  orderItems: ICartItem[];
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "DELIVERED" | "CANCELED";
  user: IUser,
  orderInfo: {
    shipTo: string;
    shippingMethod: string;
  }
}