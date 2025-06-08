import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetAllProduct } from "../../config/api"
import { IBackendResponse, IProduct, PaginationResult } from "../../types/backend";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
  const [searchParams] = useSearchParams();

  let page, pageSize;

  if(window.location.pathname.startsWith('/admin') && !window.location.pathname.endsWith('/dashboard')) {
    page = searchParams.get('page') || 1;
    pageSize = searchParams.get('limit') || 5;
  } else if(window.location.pathname.startsWith('/products')) {
    page = searchParams.get('page') || 1;
    pageSize = searchParams.get('limit') || 8;
  } else {
    page = searchParams.get('page') || 1;
    pageSize = searchParams.get('limit') || 999;
  }
  
  const sortedBy = searchParams.get('sortedBy') || 'createdAt,asc';
  const stock = searchParams.get('stock') || '';
  const name = searchParams.get('name') || '';
  const brands = searchParams.get('brands') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const ram = searchParams.get('ram') || '';
  const rom = searchParams.get('rom') || '';

  const query = `?page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&stock=${stock}&name=${name}&brands=${brands}&minPrice=${minPrice}&maxPrice=${maxPrice}&ram=${ram}&rom=${rom}`;
  // const query = `?page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&name=${name}`;

  const { data, isPending } = useQuery<IBackendResponse<PaginationResult<IProduct[]>>, AxiosError<any>>({
    queryKey: ['products', query],
    queryFn: async (): Promise<any> => callGetAllProduct(query),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}