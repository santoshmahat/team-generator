import Players from '../components/Players'
import Teams from '../components/Teams'
import Events from '../components/Events'

export default function Home() {
    return (
        <div className="flex flex-col space-y-16 md:flex-row md:justify-between md:space-x-16 bg-[#ebebeb] p-6">
            <Players />
            <Teams />
            <Events />
        </div>
    )
}
