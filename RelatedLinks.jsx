import { TbLink, TbWorld } from 'react-icons/tb'
import './RelatedLinks.css'

export default function RelatedLinks({ activeCompany }) {
    return (
        <div className="firstFragment">
            <div className="thridFragmentHeader">
                <TbLink />
                <p>Gerelateerde links {activeCompany.company_name}</p>
            </div>
            <div className="relatedLinkItem">
                <div className="relatedLinkIcon">
                    <TbWorld />
                </div>
                <div className='relatedLinksText'>
                    <p>Website</p>
                    <p>www.Rabobank.nl</p>
                </div>
            </div>
            <div className="relatedLinkItem">
                <div className="relatedLinkIcon">
                    <TbWorld />
                </div>
                <div className='relatedLinksText'>
                    <p>Website</p>
                    <p>www.Rabobank.nl</p>
                </div>
            </div>
            <div className="relatedLinkItem">
                <div className="relatedLinkIcon">
                    <TbWorld />
                </div>
                <div className='relatedLinksText'>
                    <p>Website</p>
                    <p>www.Rabobank.nl</p>
                </div>
            </div>
            <div className="relatedLinkItem">
                <div className="relatedLinkIcon">
                    <TbWorld />
                </div>
                <div className='relatedLinksText'>
                    <p>Website</p>
                    <p>www.Rabobank.nl</p>
                </div>
            </div>
        </div>
    )
}