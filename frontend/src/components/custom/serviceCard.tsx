export default function  ServiceCard({service, onDeleteButtonClick}){
    return(
        <div className="w-full max-w-[607px] rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#1E2634]">
            <div className="flex items-start gap-3">
                <div className="text-brand-500">
                    <svg width="1em" height="1em" viewBox="0 0 24 26" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.814 4.75L4.78516 16.0352H11.1859L11.1859 23.25L19.2148 11.9648L12.814 11.9648V4.75Z"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                </div>
                <div className="flex flex-col items-center gap-5 sm:flex-row">
                    <div><h5 className="mb-1 text-base font-medium text-gray-800 dark:text-white/90">{service.name}</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{service.type}</p></div>
                    <div className="flex items-center w-full gap-3 sm:max-w-fit">
                        <button type="button"
                                className="flex justify-center rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-white shadow-theme-xs bg-yellow-600 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">Edit
                        </button>
                        <button type="button"
                                className="flex justify-center px-3 py-1.5 text-sm font-medium text-white rounded-lg bg-red-600 shadow-theme-xs hover:bg-brand-600"

                                onClick={onDeleteButtonClick}

                            >Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}