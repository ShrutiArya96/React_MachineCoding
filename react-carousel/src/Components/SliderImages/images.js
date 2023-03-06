import './images.css'

export default function Images({imageDataSet, curImage, setCurImage}) {

    function createImageContainers(imgSrc, idx) {
        let cont = (<div id={idx == curImage ? 'displayed-image': ''} className= 'imageCotainer' key={idx}>
            <img src={imgSrc} className='image'  alt= 'Could not load image'/>
        </div>)
        return cont;
    }
    function setCur(cur) {
        if(cur > imageDataSet.length-1) {
            setCurImage(0);
        } else if(cur < 0) {
            setCurImage(imageDataSet.length-1); 
        } else {
            setCurImage(cur);
        }
    }

    return (
        <>
        <div className='slider'>
            <button onClick={() => setCur(curImage-1)} className="action-btn">Prev</button>
            <div className='slider-container'>
                {
                    imageDataSet && imageDataSet.map((el, idx) => createImageContainers(el, idx))
                }
            </div>
            <button onClick={() => setCur(curImage+1)} className="action-btn">Next</button>
        </div>
        </>
    )
}