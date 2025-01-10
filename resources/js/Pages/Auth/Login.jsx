import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function Login({ status, canResetPassword }) {
    const userAgent = window.navigator.userAgent;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);
    const deviceID = `${userAgent} - ${randomString}`;
    const toast = useRef(null)
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        device_id: deviceID,
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'))
    };

    const cardFooter = (
        <div className="flex items-center justify-end w-full">
            {canResetPassword && (
                <Link
                    href={route('password.request')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                    Forgot your password?
                </Link>
            )}

            <Button form='login-form' type='submit' label='Login' size='small' className='w-full' loading={processing} disabled={processing} />
        </div>
    )

    return (
        <GuestLayout footer={cardFooter}>
            <Head title="Log in" />

            <Toast ref={toast} />

            <form id='login-form' onSubmit={submit} className="space-y-4">

                <div>
                    <InputText
                        id="email"
                        type="text"
                        className="p-inputtext-sm w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder='Email Address'
                        invalid={!(errors.email === undefined)}
                    />

                    {errors.email && <small className='text-red-600'>{errors.email}</small>}
                </div>

                <div>
                    <Password
                        value={data.password}
                        inputClassName='p-inputtext-sm w-full'
                        className='w-full'
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder='Password'
                        panelClassName='invisible'
                        showIcon={true}
                        invalid={!(errors.password === undefined)}
                    />

                    {errors.password && <small className='text-red-600'>{errors.password}</small>}
                </div>
            </form>
        </GuestLayout>
    );
}
