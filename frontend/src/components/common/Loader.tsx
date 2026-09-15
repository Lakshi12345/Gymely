interface LoaderProps {
    loading: boolean;
    text?: string;
}

function Loader({ loading, text = "Please wait..." }: LoaderProps) {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="rounded-xl bg-white p-6 shadow-xl">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                <p className="mt-4 text-center font-medium">{text}</p>
            </div>
        </div>
    );
}

export default Loader;
