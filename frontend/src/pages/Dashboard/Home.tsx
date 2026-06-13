import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6 flex justify-between">
              <div><h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Activities</h3></div>
              <div className="relative inline-block">
                <button className="dropdown-toggle">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                       className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                          fill="currentColor"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-6 bottom-10 left-5 w-px bg-gray-200 dark:bg-gray-800"></div>
              <div className="relative mb-6 flex">
                <div className="z-10 flex-shrink-0"><img alt="Francisco Grbbs"
                                                         className="size-10 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
                                                         src="./images/user/user-01.jpg"/></div>
                <div className="ml-4">
                  <div className="mb-1 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M9 5.0625H14.0625L12.5827 8.35084C12.4506 8.64443 12.4506 8.98057 12.5827 9.27416L14.0625 12.5625H10.125C9.50368 12.5625 9 12.0588 9 11.4375V10.875M3.9375 10.875H9M3.9375 3.375H7.875C8.49632 3.375 9 3.87868 9 4.5V10.875M3.9375 15.9375V2.0625"
                          stroke="#12B76A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <p className="text-theme-xs text-success-500 font-medium">New invoice</p></div>
                  <div className="flex items-baseline"><h3
                      className="text-theme-sm font-medium text-gray-800 dark:text-white/90">Francisco Grbbs</h3><span
                      className="text-theme-sm ml-2 font-normal text-gray-500 dark:text-gray-400">created invoice</span>
                  </div>
                  <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">PQ-4491C</p><p
                    className="text-theme-xs mt-1 text-gray-400">Just Now</p></div>
              </div>
              <div className="relative mb-6 flex">
                <div className="z-10 flex-shrink-0"><img alt="Courtney Henry"
                                                         className="size-10 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
                                                         src="./images/user/user-03.jpg"/></div>
                <div className="ml-4">
                  <div className="flex items-baseline"><h3
                      className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">Courtney Henry</h3><span
                      className="ml-2 text-sm text-gray-500 dark:text-gray-400">created invoice</span></div>
                  <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">HK-234G</p><p
                    className="text-theme-xs mt-1 text-gray-400">15 minutes ago</p></div>
              </div>
              <div className="relative mb-6 flex">
                <div className="z-10 flex-shrink-0"><img alt="Bessie Cooper"
                                                         className="size-10 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
                                                         src="./images/user/user-04.jpg"/></div>
                <div className="ml-4">
                  <div className="flex items-baseline"><h3
                      className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">Bessie Cooper</h3><span
                      className="text-theme-sm ml-2 text-gray-500 dark:text-gray-400">created invoice</span></div>
                  <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">LH-2891C</p><p
                    className="text-theme-xs mt-1 text-gray-400">5 months ago</p></div>
              </div>
              <div className="relative flex">
                <div className="z-10 flex-shrink-0"><img alt="Theresa Web"
                                                         className="size-10 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
                                                         src="./images/user/user-05.jpg"/></div>
                <div className="ml-4">
                  <div className="flex items-baseline"><h3
                      className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">Theresa Web</h3><span
                      className="ml-2 text-sm text-gray-500 dark:text-gray-400">created invoice</span></div>
                  <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">CK-125NH</p><p
                    className="text-theme-xs mt-1 text-gray-400">2 weeks ago</p></div>
              </div>
            </div>
          </div>
          <MonthlyTarget/>
        </div>


        <div className="col-span-12 xl:col-span-5">
          <DemographicCard/>
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders/>
        </div>

      </div>
    </>
  );
}
