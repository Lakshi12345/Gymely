
import { ArrowRight } from "lucide-react";
import {Modal} from "../ui/modal";
import Button from "../ui/button/Button";

interface SuccessButton {

    label: string;

    onClick: () => void;

    className?: string;

}

interface SuccessModalProps {

    isOpen: boolean;

    onClose: () => void;

    title?: string;

    description?: string;

    buttons?: SuccessButton[];

}

export default function SuccessModal({

    isOpen,

    onClose,

    title = "Success",

    description = "Operation completed successfully",

    buttons = []

}: SuccessModalProps) {

    return (

        <Modal

            isOpen={isOpen}

            onClose={onClose}

            className="
                max-w-lg
                p-6
            "

        >

            <div className="text-center">

                <div
                    className="
                        mx-auto
                        mb-4
                        flex
                        h-18
                        w-18
                        items-center
                        justify-center
                        rounded-full
                        bg-green-100
                    "
                >

                    <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />

                    </svg>

                </div>

                <h3
                    className="
                        text-xl
                        font-semibold
                        mb-2
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        text-gray-500
                        mb-6
                    "
                >
                    {description}
                </p>

                <div className="flex  gap-2"
                >

                    {

                        buttons.map(

                            (
                                btn,
                                index
                            ) => (

                                <Button

                                    key={index}

                                    className={`

 
 w-full

    flex

    items-center

    justify-center

    gap-3

    px-5

    py-5

    text-xs
    h-8

    rounded-md

${btn.className ||

"bg-blue-600"}

`}

                                    onClick={btn.onClick}

                                >

                                    {

                                        btn.label

                                    }

                                    <ArrowRight
                                        size={12}
                                    />

                                </Button>

                            )

                        )

                    }

                </div>

            </div>

        </Modal>

    );

}

