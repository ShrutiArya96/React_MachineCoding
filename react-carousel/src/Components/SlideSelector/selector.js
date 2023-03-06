import './selector.css'

export default function Selector({dataSize, curImage, setCurImage}) {
    function showbuttons() {
           return [...Array(dataSize)].map((el, idx) => {
            return <button key={idx} className={idx == curImage ? 'btn-select active':'btn-select'} onClick={() => setCurImage(idx)}></button>
           })
    }
    return (
        <>
            <div className='btn-selectors'>
                {showbuttons()}
            </div>
        </>
    )
}