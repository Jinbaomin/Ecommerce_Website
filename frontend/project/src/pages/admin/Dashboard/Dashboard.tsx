"use client"

import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { useProducts } from "../../../features/product/useProducts"
import { IOrder, IProduct } from "../../../types/backend"
import FullPage from "../../../ui/FullPage"
import Spinner from "../../../ui/Spinner"
import { useAllOrder } from "../../../features/order/useAllOrder"
import { Button, DatePicker, DatePickerProps, Select, Space } from "antd"
import { useNavigate, useSearchParams } from "react-router-dom"
import { IoMdDownload } from "react-icons/io"
import { useReport } from "../../../features/report/useReport"
import { nofitication } from "../../../helper/notificationHelper"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Sample data
const years = ["2019", "2020", "2021", "2022", "2023"]
// const quarters = ["Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022", "Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023"]
const quarters = ["Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Yearly data
const yearlyRevenueData = [245000, 310000, 375000, 420000, 495000]
const yearlyOrderTotals = [1850, 2340, 2780, 3120, 3650]

// Quarterly data
// const quarterlyRevenueData = [92000, 105000, 118000, 125000, 110000, 128000, 142000, 155000]
// const quarterlyOrderTotals = [680, 780, 870, 920, 810, 950, 1050, 1150]

const quarterlyRevenueData = [0, 0, 0, 0]
const quarterlyOrderTotals = [0, 0, 0, 0]

// Monthly data
// const monthlyRevenueData = [15200, 19400, 18200, 21500, 24800, 27300, 29100, 32400, 31200, 34500, 38700, 42100]
// const monthlyOrderTotals = [124, 145, 132, 158, 187, 201, 215, 236, 228, 254, 276, 298]

const monthlyRevenueData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const monthlyOrderTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// Calculate month-over-month percentage changes
const calculateMonthlyChanges = () => {
  const revenueChanges = monthlyRevenueData.map((revenue, index) => {
    if (index === 0) return 0 // No previous month for the first month
    const prevRevenue = monthlyRevenueData[index - 1]
    return ((revenue - prevRevenue) / prevRevenue) * 100
  })

  const orderChanges = monthlyOrderTotals.map((orders, index) => {
    if (index === 0) return 0 // No previous month for the first month
    const prevOrders = monthlyOrderTotals[index - 1]
    return ((orders - prevOrders) / prevOrders) * 100
  })

  return { revenueChanges, orderChanges }
}

// Calculate totals based on timeframe
const getDataByTimeframe = (timeframe: string) => {
  switch (timeframe) {
    case "yearly":
      return {
        labels: years,
        revenue: yearlyRevenueData,
        orders: yearlyOrderTotals,
        totalRevenue: yearlyRevenueData.reduce((sum, value) => sum + value, 0),
        totalOrders: yearlyOrderTotals.reduce((sum, value) => sum + value, 0),
      }
    case "quarterly":
      return {
        labels: quarters,
        revenue: quarterlyRevenueData,
        orders: quarterlyOrderTotals,
        totalRevenue: quarterlyRevenueData.reduce((sum, value) => sum + value, 0),
        totalOrders: quarterlyOrderTotals.reduce((sum, value) => sum + value, 0),
      }
    case "monthly":
    default:
      return {
        labels: months,
        revenue: monthlyRevenueData,
        orders: monthlyOrderTotals,
        totalRevenue: monthlyRevenueData.reduce((sum, value) => sum + value, 0),
        totalOrders: monthlyOrderTotals.reduce((sum, value) => sum + value, 0),
      }
  }
}

// Get timeframe label
const getTimeframeLabel = (timeframe: string) => {
  switch (timeframe) {
    case "yearly":
      return "Year"
    case "quarterly":
      return "Quarter"
    case "monthly":
    default:
      return "Month"
  }
}

// Format currency
const formatCurrency = (value: any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Format percentage
const formatPercentage = (value: any) => {
  return value.toFixed(1) + "%"
}

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState("monthly")
  const [reload, setReload] = useState(false);

  const currentData = getDataByTimeframe(timeframe)
  const avgOrderValue = (currentData.totalRevenue / currentData.totalOrders).toFixed(2)
  const timeframeLabel = getTimeframeLabel(timeframe)
  const { revenueChanges, orderChanges } = calculateMonthlyChanges()
  const { data, isPending } = useAllOrder();
  const [searchParams, setSearchParams] = useSearchParams();
  const [changeYear, setChangeYear] = useState(false);
  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);
  const navigate = useNavigate();

  console.log(dateRange);

  // const { exportReport, isPending: loadingExportFile } = useReport();

  useEffect(() => {
    if (!isPending) {
      const orders: IOrder[] = data?.data?.data;
      // console.log(orders);

      const selectedYear = searchParams.get('year') || '2025';

      for (var i = 0; i < 12; i++) {
        monthlyRevenueData[i] = 0;
        monthlyOrderTotals[i] = 0;
      }

      orders.forEach(order => {
        if (order.createdAt.substring(0, 4) == selectedYear) {
          const month = Number(order.createdAt.substring(5, 7));
          monthlyOrderTotals[month - 1]++;
          monthlyRevenueData[month - 1] += order.total;

          const quarter = Math.floor((month - 1) / 3);
          quarterlyOrderTotals[quarter]++;
          quarterlyRevenueData[quarter] += order.total;
        }
      });

      setReload(reload => !reload);
    }

  }, [isPending, changeYear]);

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  // Chart options
  const orderBarChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Order Totals`,
      },
    },
  }

  const revenueBarChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Revenue`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCurrency(value),
        },
      },
    },
  }

  // Chart data
  const orderBarChartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Order Count",
        data: currentData.orders,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  const revenueBarChartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Revenue",
        data: currentData.revenue,
        backgroundColor: "rgba(53, 162, 235, 0.6)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Orders Analytics Dashboard</h1>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap space-x-2 bg-white rounded-lg shadow p-1">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeframe === "yearly" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setTimeframe("yearly")}
              >
                Yearly
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeframe === "quarterly" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setTimeframe("quarterly")}
              >
                Quarterly
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeframe === "monthly" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setTimeframe("monthly")}
              >
                Monthly
              </button>
            </div>
            <div>
              <label className='text-lg font-medium mr-2'>Year</label>
              <Space wrap>
                <Select
                  defaultValue={'2025'}
                  // placeholder='Select status'
                  style={{ width: 250, height: 40 }}
                  onChange={(year) => {
                    setSearchParams(searchParams => {
                      searchParams.set('year', year);
                      return searchParams;
                    });
                    setChangeYear(changeYear => !changeYear);
                  }}
                  options={[
                    { value: 2025, label: '2025' },
                    { value: 2024, label: '2024' },
                    { value: 2023, label: '2023' }
                  ]}
                />
              </Space>
            </div>
          </div>
          <div className="pt-7 flex justify-end items-center gap-10">
            <div>
              <label className='text-lg font-medium mr-2'>Start date</label>
              <Space direction="vertical">
                <DatePicker onChange={(date, dateString) => {
                  setDateRange([dateString, dateRange[1]]);
                }} />
              </Space>
            </div>
            <div>
              <label className='text-lg font-medium mr-2'>End date</label>
              <Space direction="vertical">
                <DatePicker onChange={(date, dateString) => {
                  setDateRange([dateRange[0], dateString]);
                }} />
              </Space>
            </div>
            <div>
              <Button
                type="primary"
                icon={<IoMdDownload className="h-4 w-4" />}
                onClick={() => {
                  // http://localhost:8081/next-tech/report/excel?startDate=2024-12-20&endDate=2025-01-01
                  // navigate(`http://localhost:8081/next-tech/report/excel?startDate=${dateRange[0]}&endDate=${dateRange[1]}`, { replace: true });
                  window.location.href = `http://localhost:8081/next-tech/report/excel?startDate=${dateRange[0]}&endDate=${dateRange[1]}`;
                  nofitication('Export report successfully', 'success');
                }}
                // loading={loadingExportFile}
                className="bg-green-500"
                size="large"
              >
                Export to Excel
              </Button>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900">{formatCurrency(currentData.totalRevenue)}</span>
              <span className="ml-2 text-sm text-green-600">+12.5%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Compared to previous period</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900">{currentData.totalOrders.toLocaleString()}</span>
              <span className="ml-2 text-sm text-green-600">+8.3%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Compared to previous period</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Average Order Value</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900">${avgOrderValue}</span>
              <span className="ml-2 text-sm text-green-600">+4.2%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Compared to previous period</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <Bar options={orderBarChartOptions} data={orderBarChartData} height={300} />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Bar options={revenueBarChartOptions} data={revenueBarChartData} height={300} />
          </div>
        </div>

        {/* Month-over-Month Comparison (only shown for monthly view) */}
        {timeframe === "monthly" && (
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Month-over-Month Comparison</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Month
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Revenue
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Revenue Change
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Orders
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Orders Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {months.map((month, index) => (
                    <tr key={month} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(monthlyRevenueData[index])}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {index === 0 ? (
                          <span className="text-gray-400">N/A</span>
                        ) : (
                          <div className="flex items-center">
                            {revenueChanges[index] > 0 ? (
                              <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                            ) : revenueChanges[index] < 0 ? (
                              <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                            ) : (
                              <span className="w-4 h-4 inline-block mr-1">—</span>
                            )}
                            <span
                              className={
                                revenueChanges[index] > 0
                                  ? "text-green-600"
                                  : revenueChanges[index] < 0
                                    ? "text-red-600"
                                    : "text-gray-500"
                              }
                            >
                              {formatPercentage(revenueChanges[index])}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {monthlyOrderTotals[index].toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {index === 0 ? (
                          <span className="text-gray-400">N/A</span>
                        ) : (
                          <div className="flex items-center">
                            {orderChanges[index] > 0 ? (
                              <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                            ) : orderChanges[index] < 0 ? (
                              <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                            ) : (
                              <span className="w-4 h-4 inline-block mr-1">—</span>
                            )}
                            <span
                              className={
                                orderChanges[index] > 0
                                  ? "text-green-600"
                                  : orderChanges[index] < 0
                                    ? "text-red-600"
                                    : "text-gray-500"
                              }
                            >
                              {formatPercentage(orderChanges[index])}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Order Breakdown Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Breakdown
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {timeframeLabel}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Revenue
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Orders
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Avg. Order Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.labels.map((label, index) => (
                  <tr key={label} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{label}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(currentData.revenue[index])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {currentData.orders[index].toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(currentData.revenue[index] / currentData.orders[index]).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
