import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Card } from 'primereact/card';

export default function Guest({ children, footer }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center sm:pt-0 bg-gray-100 p-4 sm:p-0">
            <div className='flex flex-col items-center text-center'>
                <Link href="/">
                    <ApplicationLogo className="w-15 h-15 fill-current text-gray-500" />
                </Link>

                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                        GapoTracer
                    </h2>
                    <h4 className="mt-2 text-lg text-gray-600 dark:text-gray-400">Olongapo City Contact Tracing Management System</h4>
                </div>
            </div>

            {/* <Card className='mt-12 w-full sm:max-w-md' footer={footer}>
                
            </Card> */}
            <div className="mt-12 w-full sm:max-w-md space-y-4">
                {children}
                {footer}
            </div>
        </div>
    );
}
