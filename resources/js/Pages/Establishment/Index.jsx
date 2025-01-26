import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from "primereact/toast";
import QRCode from 'qrcode.react';
import { format } from "date-fns";

export default function Index({ auth, establishments }) {
    const [createVisible, setCreateVisible] = useState(false);
    const [establishment, setEstablishment] = useState(null);
    const toast = useRef(null);

    const nameBody = (rowData) => {
        return `${rowData.first_name} ${rowData.last_name}`
    }

    const { data, setData, post, put, processing, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        email_address: '',
        contact_number: '',
        establishment_name: '',
        address: '',
        baranggay: '',
        city: '',
        lat: null,
        lng: null,
        status: '',
    });

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

    const submit = (e) => {
        e.preventDefault();

        if (establishment == null) {
            onCreateEstablishment();
        } else {
            onUpdateEstablishment();
        }
    }

    const onCreateEstablishment = () => {
        post(route('establishment.store'), {
            onSuccess: (page) => {
                toast.current.show({
                    severity: 'success',
                    summary: page.props.flash.message['title'],
                    detail: page.props.flash.message['description'],
                    life: 3000
                });

                onClose();
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

    const onUpdateEstablishment = () => {
        put(route('establishment.update', { id: establishment.id }), {
            onSuccess: (page) => {
                toast.current.show({
                    severity: 'success',
                    summary: page.props.flash.message['title'],
                    detail: page.props.flash.message['description'],
                    life: 3000
                });

                onClose();
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

    const onClose = () => {
        reset();
        setEstablishment(null);
        setCreateVisible(false);
    }

    const onEdit = (rowData) => {
        setEstablishment(rowData);
        setData({
            first_name: rowData.first_name,
            middle_name: rowData.middle_name,
            last_name: rowData.last_name,
            email_address: rowData.email_address,
            contact_number: rowData.contact_number,
            establishment_name: rowData.establishment_name,
            address: rowData.address,
            baranggay: rowData.baranggay,
            city: rowData.city,
            lat: rowData.lat,
            lng: rowData.lng,
            status: rowData.status,

        })
        setCreateVisible(true)
    }

    const createdAtBody = (str) => {
        const date = new Date(str.created_at);
        return format(date, "MMM dd, yyyy hh:mm a");
    }

    const createDialogFooter = (
        <div className="flex gap-x-1 justify-between">
            <Button
                type='button'
                label="Download QR"
                size='small'
                severity="info"
                onClick={downloadQRCode}
                outlined
            />
            <div>
                <Button
                    type='button'
                    label="Cancel"
                    size='small'
                    severity="secondary"
                    onClick={onClose}
                    outlined
                />
                <Button
                    form='create-establishment-form'
                    type='submit'
                    label={establishment == null ? 'Create' : 'Update'}
                    size='small'
                    loading={processing}
                    disabled={processing} />
            </div>
        </div>
    )

    const actionCellBody = (rowData) => {
        return (
            <Button
                icon="pi pi-pen-to-square"
                rounded
                text
                aria-label="Edit"
                type="button"
                onClick={() => onEdit(rowData)}
            />
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Establishments" />
            <Toast ref={toast} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button type="button" label="Create" icon="pi pi-plus" size="small" className="mb-4" onClick={() => setCreateVisible(true)} />

                    <DataTable value={establishments.data} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                        <Column field="establishment_code" className="font-bold" frozen sortable header="Code"></Column>
                        <Column field="establishment_name" sortable header="Name"></Column>
                        <Column field="email_address" sortable header="Email Address"></Column>
                        <Column field="first_name" sortable body={nameBody} header="Contact Person"></Column>
                        <Column field="address" sortable header="Address"></Column>
                        <Column field="baranggay" sortable header="Baranggay"></Column>
                        <Column field="created_at" sortable header="Created At" body={createdAtBody}></Column>
                        <Column header="Action" body={actionCellBody}></Column>
                    </DataTable>
                </div>
            </div>

            <Dialog header={`${establishment != null ? 'Edit' : 'Add'} Establishment`} className='w-1/2' visible={createVisible} onHide={() => setCreateVisible(false)} footer={createDialogFooter}>
                <form id="create-establishment-form" onSubmit={submit} className="space-y-4">
                    {establishment && (
                        <div className="flex justify-center">
                            <QRCode value={establishment.establishment_code} id="qrCode" size={250} />
                        </div>
                    )}

                    <h3 className="text-lg">Basic Information</h3>
                    <div>
                        <InputText
                            id="establishment_name"
                            type="text"
                            className="p-inputtext-sm w-full"
                            value={data.establishment_name}
                            onChange={(e) => setData("establishment_name", e.target.value)}
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
                            onChange={(e) => setData("first_name", e.target.value)}
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
                            onChange={(e) => setData("middle_name", e.target.value)}
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
                            onChange={(e) => setData("last_name", e.target.value)}
                            placeholder='Last Name'
                            invalid={!(errors.last_name === undefined)}
                        />

                        {errors.last_name && <small className='text-red-600'>{errors.last_name}</small>}
                    </div>

                    <h3 className="text-lg">Contact Details</h3>

                    <div className="flex gap-x-4">
                        <div className="w-full">
                            <InputText
                                id="email_address"
                                type="text"
                                className="p-inputtext-sm w-full"
                                value={data.email_address}
                                onChange={(e) => setData("email_address", e.target.value)}
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

                    <h3 className="text-lg">Location Information</h3>
                    <small className="mt-4">Get coordinates of an establishment using this <a className="font-bold text-current" target="_blank" href="https://www.latlong.net/">link</a>.</small>

                    <div>
                        <InputText
                            id="address"
                            type="text"
                            className="p-inputtext-sm w-full"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
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
                                onChange={(e) => setData("baranggay", e.target.value)}
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
                                onChange={(e) => setData("city", e.target.value)}
                                placeholder='City'
                                invalid={!(errors.city === undefined)}
                                required
                            />

                            {errors.city && <small className='text-red-600'>{errors.city}</small>}
                        </div>
                    </div>

                    <div className="flex gap-x-4">
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
                    </div>
                </form>
            </Dialog>
        </AuthenticatedLayout>
    );
}
