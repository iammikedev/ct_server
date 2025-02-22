import ScanEstablishmentTable from '@/Components/tables/ScanEstablishmentTable'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import QRCode from 'qrcode.react';
import ScanUserTable from '@/Components/tables/ScanUserTable';

const View = ({ auth, user, scan_establishments, scan_user }) => {
    const profile = user.user_profile;

    const { data, setData, processing, errors } = useForm({
        first_name: profile.first_name,
        middle_name: profile.middle_name ?? undefined,
        last_name: profile.last_name,
        address: profile.address,
    });

    const downloadQRCode = () => {
        const qrCodeURL = document.getElementById('qrCode')
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = `${profile.first_name}-${profile.last_name}-QR.png`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }

    const cardFooter = (
        <div className="flex gap-x-1 justify-end">
            <Button
                type='button'
                label="Download QR"
                size='small'
                severity="info"
                onClick={downloadQRCode}
                outlined
            />
        </div>
    )

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`${profile.first_name} ${profile.last_name}`} />
            <div className='grid grid-cols-3 gap-4 p-4'>
                <div className="col-span-2">
                    {/* <div className="flex gap-x-4 mb-4">
                        <MetricsCard title="Average Daily Scans" value={avg_daily_scans} />
                        <MetricsCard title="Average Monthly Scans" value={avg_monthly_scans} />
                    </div> */}
                    <Card title="Scanned Establishments">
                        <ScanEstablishmentTable excludedFields={['user.name']} scans={scan_establishments.data} />
                    </Card>

                    <Card title="Scanned Contacts" className='mt-4'>
                        <ScanUserTable excludedFields={['user.name']} scans={scan_user.data} />
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card footer={cardFooter}>
                        <form id="update-user-form" className="space-y-4">
                            {user && (
                                <div className="flex justify-center mb-12">
                                    <QRCode value={user.id} id="qrCode" size={250} />
                                </div>
                            )}

                            <h3 className="text-lg font-semibold">User Information</h3>
                            <div>
                                <InputText
                                    id="first_name"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={data.first_name}
                                    onChange={(e) => setData("first_name", e.target.value.toUpperCase())}
                                    placeholder='First Name'
                                    invalid={!(errors.first_name === undefined)}
                                    required
                                />

                                {errors.first_name && <small className='text-red-600'>{errors.first_name}</small>}
                            </div>

                            <div>
                                <InputText
                                    id="middle_name"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={data.middle_name}
                                    onChange={(e) => setData("middle_name", e.target.value.toUpperCase())}
                                    placeholder={data.middle_name === undefined ? 'N/A' : 'Middle Name'}
                                    invalid={!(errors.middle_name === undefined)}
                                />

                                {errors.middle_name && <small className='text-red-600'>{errors.middle_name}</small>}
                            </div>

                            <div>
                                <InputText
                                    id="last_name"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={data.last_name}
                                    onChange={(e) => setData("last_name", e.target.value.toUpperCase())}
                                    placeholder={data.last_name === null ? 'N/A' : 'Last Name'}
                                    invalid={!(errors.last_name === undefined)}
                                />

                                {errors.last_name && <small className='text-red-600'>{errors.last_name}</small>}
                            </div>

                            <h3 className="text-lg font-semibold">Location Details</h3>

                            <InputTextarea autoResize value={data.address} onChange={(e) => setData("address", e.target.value.toUpperCase())} rows={5} cols={30} className='w-full' />

                            <h3 className="text-lg font-semibold">Contact Details</h3>

                            <div>
                                <InputText
                                    id="email"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={user.email} disabled
                                />
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default View;