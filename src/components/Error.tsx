export default function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-md mx-auto p-4 bg-foreground/30 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <h2 className="text-red-700 font-semibold">Error</h2>
                </div>
                <pre className="mt-2 text-foreground">{message}</pre>
            </div>
        </div>
    );
}