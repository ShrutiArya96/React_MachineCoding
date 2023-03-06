import { useState } from 'react'
import Images from '../SliderImages/images'
import Selector from '../SlideSelector/selector'
import './slider.css'

export default function Slider() {
    let data = ["https://source.unsplash.com/random?landscape,mountain",
    "https://source.unsplash.com/random?landscape,cars",
    "https://source.unsplash.com/random?landscape,night",
    "https://source.unsplash.com/random?landscape,city",
    "https://source.unsplash.com/random?landscape,stars",
    "https://source.unsplash.com/random?landscape,dessert"];
    let [imageDataSet, setImageDataSet] = useState(data);
    let [curImage, setCurImage] = useState(0);
    return (
        <>
            <Images imageDataSet={imageDataSet} curImage={curImage} setCurImage={setCurImage}/>
            <Selector dataSize={imageDataSet.length} curImage={curImage} setCurImage={setCurImage}/>
        </>
    )
}