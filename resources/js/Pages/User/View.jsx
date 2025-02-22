import ScanEstablishmentTable from '@/Components/tables/ScanEstablishmentTable'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import QRCode from 'qrcode.react';
import ScanUserTable from '@/Components/tables/ScanUserTable';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from "primereact/toast";
import { Timeline } from 'primereact/timeline';
import { format } from "date-fns";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useRef } from 'react';
import { Message } from 'primereact/message';

const View = ({ auth, user, scan_establishments, scan_user }) => {
    const profile = user.user_profile;
    const toast = useRef(null);

    const { data, setData, processing, post } = useForm({
        status: profile.status,
        user_id: user.id,
    });

    const statuses = [
        { name: 'NORMAL' },
        { name: 'ASYMPTOMATIC' },
        { name: 'SYMPTOMATIC' },
        { name: 'RECOVERED' },
        { name: 'DECEASED' },
    ];

    const showConfirmationDialog = () => {
        confirmDialog({
            message: 'Are you sure you want to update health declaration status?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
        });
    }

    const accept = () => {
        post(route('user-status.store'), {
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

        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = `${profile.first_name}-${profile.last_name}-QR.png`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }

    const cardFooter = (
        <div className="flex gap-x-1 justify-center">
            <Button
                type='button'
                label="Download QR"
                size='small'
                severity="info"
                onClick={downloadQRCode}
                className='w-full'
                outlined
            />
        </div>
    )

    const formatCreatedAt = (str) => {
        const date = new Date(str);
        return format(date, "MMM dd, yyyy hh:mm a");
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`${profile.first_name} ${profile.last_name}`} />
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className='grid grid-cols-3 gap-4 p-4'>
                <div className="col-span-2 space-y-4">
                    {['ASYMPTOMATIC', 'SYMPTOMATIC'].includes(profile.status) && <Message severity="error" text="This user has been marked as Infected. Please take appropriate action if necessary. Ensure that all safety protocols are followed, including contact tracing and necessary precautions." className='justify-start w-full' />}

                    {profile.status == 'RECOVERED' && <Message severity="success" text="This user has been marked as Recovered. No further action is required, but continued monitoring and adherence to health guidelines are recommended." />}
                    <Card title="Health Declaration History">
                        <Timeline value={user.user_status} opposite={(item) => item.status} content={(item) => <small className="text-color-secondary">{formatCreatedAt(item.created_at)}</small>} />
                    </Card>

                    <Card title="Scanned Establishments">
                        <ScanEstablishmentTable excludedFields={['user.name']} scans={scan_establishments.data} />
                    </Card>

                    <Card title="Scanned Contacts">
                        <ScanUserTable excludedFields={['user.name']} scans={scan_user.data} />
                    </Card>
                </div>

                <div className="col-span-1">
                    <div className="space-y-4">
                        <Card footer={cardFooter}>
                            {user && (
                                <div className="flex justify-center">
                                    <QRCode value={user.id} id="qrCode" size={250} />
                                </div>
                            )}
                        </Card>

                        <Card title={"Health Declaration"}>
                            <Dropdown value={data.status} onChange={(e) => setData('status', e.value)} options={statuses}
                                optionValue='name'
                                optionLabel='name'
                                placeholder="Select Status" className="w-full md:w-14rem" />
                            <Button
                                className='mt-4 w-full'
                                type='button'
                                onClick={showConfirmationDialog}
                                label={'Update'}
                                size='small'
                                loading={processing}
                                disabled={profile.status == data.status || processing} />

                        </Card>

                        <Card title={"User Information"}>
                            <div className="space-y-4">
                                <InputText
                                    id="first_name"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={profile.first_name.toUpperCase()}
                                    disabled
                                />

                                <InputText
                                    id="middle_name"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={profile.middle_name == null ? 'N/A' : profile.middle_name.toUpperCase()}
                                    disabled
                                />

                                <InputText
                                    id="last_name"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={profile.last_name}
                                    disabled
                                />
                            </div>
                        </Card>

                        <Card title={"Location Details"}>
                            <InputTextarea autoResize value={profile.address} onChange={(e) => setData("address", e.target.value.toUpperCase())} rows={5} cols={30} className='w-full' disabled />
                        </Card>

                        <Card title={"Contact Details"}>
                            <div>
                                <InputText
                                    id="email"
                                    type="text"
                                    className="p-inputtext-sm w-full"
                                    value={user.email} disabled
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default View;