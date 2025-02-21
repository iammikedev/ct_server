import { Card } from "primereact/card"

export default function MetricsCard({ title, value, icon }) {
    return (
        <Card className="flex-1">
            <div className="flex justify-between items-center">
                <div>
                    <small className="text-grey-700">{title}</small>
                    <div className="text-3xl font-bold text-black mt-2">{value}</div>
                </div>
                {icon && <span className={`pi ${icon} mr-4 text-2xl`}></span>}
            </div>
        </Card>
    )
}