import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import ScanEstablishmentTable from '@/Components/tables/ScanEstablishmentTable'
import QRCode from 'qrcode.react';
import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from "primereact/toast";
import { useRef, useState } from 'react';
import MetricsCard from '@/Components/MetricsCard'

export default function View({ auth, establishment, scans, avg_monthly_scans, avg_daily_scans }) {
    const toast = useRef(null);
    const [canEdit, setCanEdit] = useState(false);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        first_name: establishment.first_name,
        middle_name: establishment.middle_name,
        last_name: establishment.last_name,
        email_address: establishment.email_address,
        contact_number: establishment.contact_number,
        establishment_name: establishment.establishment_name,
        address: establishment.address,
        baranggay: establishment.baranggay,
        city: establishment.city,
        lat: establishment.lat,
        lng: establishment.lng,
        status: establishment.status,
    });

    const submit = (e) => {
        e.preventDefault();
        onUpdateEstablishment();
    }

    const onUpdateEstablishment = () => {
        put(route('establishment.update', { id: establishment.id }), {
            onSuccess: (page) => {
                toast.current.show({
                    severity: 'success',
                    summary: page.props.flash.message['title'],
                    detail: page.props.flash.message['description'],
                    life: 3000
                });
            },
            onError: (errors) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Oops!',
                    detail: 'Something went wrong. Please try again.',
                    life: 3000
                });
            }
        });
    }


    const downloadQRCode = () => {
        const qrCodeURL = document.getElementById('qrCode')
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        console.log(qrCodeURL)
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = `${establishment.establishment_code}.png`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }

    const cardFooter = (
        <div className="flex gap-x-1 justify-between">
            <Button
                type='button'
                label="Download QR"
                size='small'
                severity="info"
                onClick={downloadQRCode}
                outlined
            />
            <Button
                className='ml-2'
                form='update-establishment-form'
                type='submit'
                label={'Update'}
                size='small'
                loading={processing}
                disabled={processing} />
        </div>
    )

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={establishment.establishment_name + ' - Establishment'} />
            <Toast ref={toast} />


            <div className='grid grid-cols-3 gap-4 p-4'>
                <div className="col-span-2">
                    <div className="flex gap-x-4 mb-4">
                        <MetricsCard title="Average Daily Scans" value={avg_daily_scans} />
                        <MetricsCard title="Average Monthly Scans" value={avg_monthly_scans} />
                    </div>
                    <Card title="Scans">
                        <ScanEstablishmentTable scans={scans.data} excludedFields={['establishment.establishment_name']} />
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card footer={cardFooter}>
                        <form id="update-establishment-form" onSubmit={submit} className="space-y-4">
                            {establishment && (
                                <div className="flex justify-center mb-12">
                                    <QRCode value={establishment.establishment_code} id="qrCode" size={250} />
                                </div>
                            )}

                            <h3 className="text-lg font-semibold">Basic Information</h3>
                            <div>
                                <InputText
                                    id="establishment_name"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={data.establishment_name}
                                    onChange={(e) => setData("establishment_name", e.target.value.toUpperCase())}
                                    placeholder='Establishment Name'
                                    invalid={!(errors.establishment_name === undefined)}
                                    required
                                />

                                {errors.establishment_name && <small className='text-red-600'>{errors.establishment_name}</small>}
                            </div>

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
                                    placeholder='Middle Name'
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
                                    placeholder='Last Name'
                                    invalid={!(errors.last_name === undefined)}
                                />

                                {errors.last_name && <small className='text-red-600'>{errors.last_name}</small>}
                            </div>

                            <h3 className="text-lg font-semibold">Contact Details</h3>

                            <div className="flex gap-x-4">
                                <div className="w-full">
                                    <InputText
                                        id="email_address"
                                        type="text"
                                        className="p-inputtext-sm w-full"
                                        value={data.email_address}
                                        onChange={(e) => setData("email_address", e.target.value.toUpperCase())}
                                        placeholder='Email Address'
                                        invalid={!(errors.email_address === undefined)}
                                        required
                                    />

                                    {errors.email_address && <small className='text-red-600'>{errors.email_address}</small>}
                                </div>

                                <div className="w-full">
                                    <InputMask
                                        id="contact_number"
                                        mask="0999-999-9999"
                                        value={data.contact_number}
                                        className="p-inputtext-sm w-full"
                                        onChange={(e) => setData("contact_number", e.target.value)}
                                        placeholder="Contact Number"
                                        invalid={!(errors.contact_number === undefined)}
                                        unmask={true}
                                        required
                                    />

                                    {errors.email_address && <small className='text-red-600'>{errors.email_address}</small>}
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold">Location Information</h3>
                            <small className="mt-4">Get coordinates of an establishment using this <a className="font-bold text-current" target="_blank" href="https://www.latlong.net/">link</a>.</small>

                            <div className="w-full">
                                <InputText
                                    id="address"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value.toUpperCase())}
                                    placeholder='Address'
                                    invalid={!(errors.address === undefined)}
                                    required
                                />

                                {errors.address && <small className='text-red-600'>{errors.address}</small>}
                            </div>

                            <div className="flex gap-x-4">
                                <div className="w-full">
                                    <InputText
                                        id="baranggay"
                                        type="text"
                                        className="p-inputtext-sm w-full"
                                        value={data.baranggay}
                                        onChange={(e) => setData("baranggay", e.target.value.toUpperCase())}
                                        placeholder='Baranggay'
                                        invalid={!(errors.baranggay === undefined)}
                                        required
                                    />

                                    {errors.baranggay && <small className='text-red-600'>{errors.baranggay}</small>}
                                </div>

                                <div className="w-full">
                                    <InputText
                                        id="city"
                                        type="text"
                                        className="p-inputtext-sm w-full"
                                        value={data.city}
                                        onChange={(e) => setData("city", e.target.value.toUpperCase())}
                                        placeholder='City'
                                        invalid={!(errors.city === undefined)}
                                        required
                                    />

                                    {errors.city && <small className='text-red-600'>{errors.city}</small>}
                                </div>
                            </div>


                            <div className="w-full">
                                <InputNumber
                                    id="lat"
                                    className="p-inputtext-sm w-full"
                                    value={data.lat}
                                    onChange={(e) => setData("lat", e.value)}
                                    placeholder='Latitude'
                                    invalid={!(errors.lat === undefined)}
                                    useGrouping={false}
                                    max={90}
                                    minFractionDigits={2}
                                    maxFractionDigits={6}
                                    required
                                />

                                {errors.lat && <small className='text-red-600'>{errors.lat}</small>}
                            </div>

                            <div className="w-full">
                                <InputNumber
                                    id="lng"
                                    className="p-inputtext-sm w-full"
                                    value={data.lng}
                                    onChange={(e) => setData("lng", e.value)}
                                    placeholder='Longitude'
                                    invalid={!(errors.lng === undefined)}
                                    useGrouping={false}
                                    max={180}
                                    minFractionDigits={2}
                                    maxFractionDigits={6}
                                    required
                                />

                                {errors.lng && <small className='text-red-600'>{errors.lng}</small>}
                            </div>

                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}