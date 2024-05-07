import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import MetricsCard from '@/Components/MetricsCard'
import { Card } from 'primereact/card'
import { Chart } from 'primereact/chart'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import TimeAgo from 'react-timeago'
export default function Dashboard({
    auth,
    establishment_count,
    user_count,
    scan_user_count,
    scan_establishment_count,
    latest_announcement
}) {
    const [chartData, setChartData] = useState({})
    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement)
        const textColor = documentStyle.getPropertyValue('--text-color')
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Active Cases',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Recoveries',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                },
                {
                    label: 'Deaths',
                    data: [5, 7, 9, 15, 7, 10, 5],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    tension: 0.4
                }
            ]
        }

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        }

        setChartData(data)
        setChartOptions(options)
    }, [])
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                    <div className="grid grid-cols-4 gap-x-4">
                        <MetricsCard title="Total Establishments" value={establishment_count} icon='pi-shop' />
                        <MetricsCard title="Registered User" value={user_count} icon="pi-user" />
                        <MetricsCard title="Total User Scans" value={scan_user_count} icon="pi-qrcode" />
                        <MetricsCard title="Total Establishment Scans" value={scan_establishment_count} icon="pi-barcode" />

                    </div>

                    <div className='grid grid-cols-6 grid-rows-3 gap-x-4'>
                        <Card className='flex-1 col-span-4 row-span-2' title="COVID Analytics">
                            <Chart type="line" data={chartData} options={chartOptions} />
                        </Card>

                        <Card title="Latest Announcement" className='col-span-2 row-span-1'>
                            <p className='text-xl font-medium mb-2'>{latest_announcement.title}</p>
                            <div className='mb-6 truncate'>
                                {parse(latest_announcement.description)}
                            </div>
                            <TimeAgo className="text-sm italic" date={latest_announcement.created_at} />
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
