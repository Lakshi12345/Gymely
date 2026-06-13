import { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarMenu } from "../constants/sidebarMenu";

function Sidebar() {
    const [openMenu, setOpenMenu] =
        useState("");
    const toggleMenu = (
        title: string
    ) => {

        setOpenMenu(
            openMenu === title
                ? ""
                : title
        );
    };
    return (

        <div className="w-72 bg-slate-900 text-white min-h-screen">

            <div className="p-5 border-b border-slate-700">

                <h1 className="text-2xl font-bold">
                    Gymoryx
                </h1>

            </div>

            <div className="p-3">

                {
                    sidebarMenu.map(
                        (menu) => (

                            <div
                                key={menu.title}
                                className="mb-2"
                            >

                                {
                                    menu.children ? (

                                        <>
                                            <button
                                                onClick={() =>
                                                    toggleMenu(
                                                        menu.title
                                                    )
                                                }
                                                className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 flex justify-between"
                                            >

                                                <span>
                                                    {menu.title}
                                                </span>

                                                <span>
                                                    {
                                                        openMenu === menu.title
                                                            ? "-"
                                                            : "+"
                                                    }
                                                </span>

                                            </button>

                                            {
                                                openMenu === menu.title && (

                                                    <div className="ml-5 mt-2 space-y-1">

                                                        {
                                                            menu.children.map(
                                                                (
                                                                    child
                                                                ) => (

                                                                    <Link
                                                                        key={
                                                                            child.path
                                                                        }
                                                                        to={
                                                                            child.path
                                                                        }
                                                                        className="block px-3 py-2 rounded text-sm hover:bg-slate-800"
                                                                    >
                                                                        {
                                                                            child.title
                                                                        }
                                                                    </Link>

                                                                )
                                                            )
                                                        }

                                                    </div>

                                                )
                                            }

                                        </>

                                    ) : (

                                        <Link
                                            to={
                                                menu.path
                                            }
                                            className="block px-3 py-2 rounded hover:bg-slate-800"
                                        >
                                            {
                                                menu.title
                                            }
                                        </Link>

                                    )
                                }

                            </div>

                        )
                    )
                }

            </div>

        </div>

    );
}

export default Sidebar;