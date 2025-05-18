import Events from '../components/home/Events'
import Players from '../components/home/Players'
import Teams from '../components/home/Teams'


export default function Home() {
    return (
        <div className="flex flex-col space-y-16 md:flex-row md:justify-between md:space-x-16 bg-[#ebebeb] p-6">
            <Players />
            <Teams />
            <Events />
        </div>
    )
}
