import { useEffect } from "react"
import { AiOutlineSearch } from 'react-icons/ai'
import { BsBriefcase } from 'react-icons/bs'
import { ImLocation } from 'react-icons/im'
import { useState } from "react"
import './styles/ApplicationFilters.css'
import Select from 'react-select'

function ConnectionFilters({ setFilteredPosts, posts }) {
    const [company, setCompany] = useState("")
    const [job, setJob] = useState("")
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")
    const [graduateLevel, setGraduateLevel] = useState("")
    const [minSalary, setMinSalary] = useState("")
    const [maxSalary, setMaxSalary] = useState("")

    const options = [
        { value: 'geen opleiding vereist of middelbare school volstaat', label: 'Geen diploma vereist' },
        { value: 'voorbereidend/lager middelbaar beroepsonderwijs (vmbo)', label: 'VMBO' },
        { value: 'middelbaar beroepsonderwijs (mbo)', label: 'MBO' },
        { value: 'hoger beroepsonderwijs (hbo)', label: 'HBO' },
        { value: 'universitair onderwijs (wo) en/of hoger', label: 'WO' }
    ]

    const handler = (event) => {
        const value = event?.value
        setGraduateLevel(value ? value : "")
    }

    const typeOptions = [
        { value: 'Onbepaalde tijd', label: 'Onbepaalde tijd' },
        { value: 'Projectduur', label: 'Projectduur' }
    ]

    const typeHandler = (event) => {
        const value = event?.value
        setType(value ? value : "")
    }

    const handleFilterChange = (e, filterType) => {
        switch (filterType) {
            case "company":
                setCompany(e.target.value)
                break;
            case "job":
                setJob(e.target.value)
                break;
            case "location":
                setLocation(e.target.value)
                break;
            case "minSalary":
                setMinSalary(e.target.value)
                break;
            case "maxSalary":
                setMaxSalary(e.target.value)
                break;
            default: break;
        }
    }

    useEffect(() => {
        let filterPosts = posts
        if (company !== "") {
            filterPosts = filterPosts.filter((post) => post.post.companyName.toLowerCase().includes(company?.toLowerCase()))
        }
        if (job !== "") {
            filterPosts = filterPosts.filter((post) => post.post.jobTitle.toLowerCase().includes(job?.toLowerCase()))
        }
        if (location !== "") {
            filterPosts = filterPosts.filter((post) => post.post.address.toLowerCase().includes(location?.toLowerCase()))
        }
        if (type !== "") {
            filterPosts = filterPosts.filter((post) => post.post.applicationType === type)
        }
        if (graduateLevel !== "") {
            filterPosts = filterPosts.filter((post) => post.post.graduateLevel === graduateLevel)
        }
        if (minSalary !== "") {
            filterPosts = filterPosts.filter((post) => post.post.salary >= minSalary)
        }
        if (maxSalary !== "") {
            filterPosts = filterPosts.filter((post) => post.post.salary <= maxSalary)
        }
        setFilteredPosts(filterPosts)
    }, [location, job, company, type, graduateLevel, minSalary, maxSalary, posts, setFilteredPosts])

    return (
        <div className="sidebar_right">
            <h2 className="sidebar_title">Filters</h2>
            <div className="sidebar_input_container">
                <input className="sidebar_input" placeholder="Zoeken op bedrijf..." type="text" value={company} onChange={(e) => handleFilterChange(e, "company")} ></input>
                <AiOutlineSearch style={{ marginRight: 10, fontSize: '1.2em' }} />
            </div>
            <div className="sidebar_input_container">
                <input className="sidebar_input" placeholder="Zoeken op baan..." type="text" value={job} onChange={(e) => handleFilterChange(e, "job")} ></input>
                <BsBriefcase style={{ marginRight: 10, fontSize: '1.2em' }} />
            </div>
            <div className="sidebar_input_container">
                <input className="sidebar_input" placeholder="Zoeken op locatie..." type="text" value={location} onChange={(e) => handleFilterChange(e, "location")} ></input>
                <ImLocation style={{ marginRight: 10, fontSize: '1.2em' }} />
            </div>
            <b>Branche</b>
            <Select className="application_select" placeholder="Categorie" isClearable={true} />
            <b>Salarisindicatie</b>
            <div className="sidebar_input_salary">
                <input className="salary_input" placeholder="Salaris van" value={minSalary} onChange={(e) => handleFilterChange(e, "minSalary")}></input>
                <input className="salary_input" placeholder="Salaris tot" value={maxSalary} onChange={(e) => handleFilterChange(e, "maxSalary")}></input>
            </div>
            <b>Type opdracht</b>
            <Select className="application_select" placeholder="Type" onChange={typeHandler} options={typeOptions} isClearable={true} />
            <b>Opleidingsniveau</b>
            <Select className="application_select" placeholder="Niveau" onChange={handler} options={options} isClearable={true} />
        </div>
    )
}

export default ConnectionFilters