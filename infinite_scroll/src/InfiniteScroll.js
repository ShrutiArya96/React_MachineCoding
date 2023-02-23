import { useEffect, useState, memo, useRef } from 'react'
import './InifiniteScroll.css';

function InfiniteScroll(props) {
    const {moviesList, scrollEndCallback, listRenderer} = props;
    const scrollContainer = useRef(null);
    const lastContainer = useRef(null);

    function lastEelemtReachedCallback(entries) {
        if(entries[0].isIntersecting) {scrollEndCallback()}
    }

    useEffect(() => {
        const observer = new IntersectionObserver(lastEelemtReachedCallback, {
            root: null,
            threshold: 1
        });
    
        if(lastContainer.current){
            observer.observe(lastContainer.current)
        }
    }, [])

    return (
        <>
            <div className='container' ref={scrollContainer}>{
                listRenderer()
            }
                <div className='last-movie-container' ref={lastContainer}>
                    <h1>This is the end</h1>
                </div>
            </div>
            
        </>
    )
}

export default memo(InfiniteScroll)