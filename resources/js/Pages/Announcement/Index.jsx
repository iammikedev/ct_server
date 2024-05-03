import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Index({ auth, announcements }) {
    const [createVisible, setCreateVisible] = useState(false);
    const [announcement, setAnnouncement] = useState(null);
    const toast = useRef(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        description: '',
        publish_at: '',
        is_important: true,
        is_active: true,
    })

    const onSubmit = (e) => {
        e.preventDefault();

        if (announcement == null) {
            createAnnouncement()
        } else {
            updateAnnouncement()
        }
    }

    const onClose = () => {
        reset()
        setAnnouncement(null)
        setCreateVisible(false)
    }

    const onError = (error) => {
        toast.current.show({
            severity: 'error',
            summary: 'Oops!',
            detail: 'Something went wrong. Please try again.',
            life: 3000
        });
    }

    const onSuccess = (page) => {
        toast.current.show({
            severity: 'success',
            summary: page.props.flash.message['title'],
            detail: page.props.flash.message['description'],
            life: 3000
        });
        onClose();
    }

    const createAnnouncement = () => {
        post(route('announcement.store'), {
            onSuccess: onSuccess, 
            onError: onError 
        })
    }

    const updateAnnouncement = () => {
        put(route('announcement.update', announcement.id), {
            onSuccess: onSuccess,
            onError: onError
        })
    }

    const createDialogFooter = (
        <div className="flex gap-x-1 justify-end">
            <Button
                type='button'
                label="Cancel"
                size='small'
                severity="secondary"
                onClick={onClose}
                outlined
            />
            <Button
                form='create-announcement-form'
                type='submit'
                label={announcement == null ? 'Create' : 'Update'}
                size='small'
                loading={processing}
                disabled={processing}
            />
        </div>
    )

    const descriptionBody = (rowData) => {
        return parse(rowData.description);
    }

    const statusBody = (rowData) => {
        return rowData.is_active ? 'Active' : 'Inactive';
    }

    const importantBody = (rowData) => {
        return rowData.is_important ? 'Yes' : 'No';
    }

    const onEdit = (rowData) => {
        setAnnouncement(rowData);
        setData({
            title: rowData.title,
            description: rowData.description,
            publish_at: new Date(rowData.publish_at),
            is_important: (rowData.is_important == 1),
            is_active: (rowData.is_active == 1),
        })
        setCreateVisible(true);
    }

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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Announcements" />
            <Toast ref={toast} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button type="button" label="Create" icon="pi pi-plus" size="small" className="mb-4" onClick={() => setCreateVisible(true)} />

                    <DataTable value={announcements} columnResizeMode="expand" resizableColumns scrollable paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                        <Column field="title" className="font-bold" frozen sortable header="Title"></Column>
                        <Column field="description" sortable header="Content" body={descriptionBody}></Column>
                        <Column field="is_active" sortable header="Status" body={statusBody}></Column>
                        <Column field='is_important' sortable header='Important' body={importantBody}></Column>
                        <Column field="created_at" sortable header="Created At"></Column>
                        <Column header="Action" body={actionCellBody}></Column>
                    </DataTable>
                </div>
            </div>

            <Dialog header={`${announcement != null ? 'Edit' : 'Create'} Announcement`} className='w-1/2' visible={createVisible} onHide={() => setCreateVisible(false)} footer={createDialogFooter}>
                <form id='create-announcement-form' onSubmit={onSubmit} className='space-y-4'>
                    <div>
                        <InputText
                            id="title"
                            type="title"
                            className="p-inputtext-sm w-full"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder='Title'
                            invalid={!(errors.title === undefined)}
                            required
                        />

                        {errors.title && <small className='text-red-600'>{errors.title}</small>}
                    </div>

                    <div>
                        <ReactQuill
                            value={data.description}
                            onChange={(e) => setData("description", e)}
                            theme="snow"
                        />
                    </div>

                    <div>
                        <Calendar
                            className='w-full p-inputtext-sm'
                            placeholder='Publishing Date'
                            value={data.publish_at}
                            onChange={(e) => setData("publish_at", e.target.value)}
                            showTime
                            hourFormat="12"
                        />
                    </div>

                    <div className='flex justify-between'>
                        <label htmlFor="is_important" className='block'>Important</label>
                        <InputSwitch
                            id='is_important'
                            checked={data.is_important}
                            onChange={(e) => setData('is_important', e.value)}
                        />
                    </div>

                    <div className='flex justify-between'>
                        <label htmlFor="is_active" className='block'>Status</label>
                        <InputSwitch
                            id='is_active'
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.value)}
                        />
                    </div>
                </form>
            </Dialog>
        </AuthenticatedLayout>
    )
}