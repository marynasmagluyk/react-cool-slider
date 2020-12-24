import React, {useEffect, useState} from "react";
import data from "./data";

import {FaQuoteRight} from 'react-icons/fa';
import Buttons from "./Buttons";

const CenterSection = () => {

    const [people] = useState(data);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = people.length - 1;

        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, people]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1)
        }, 3000);

        return () => clearInterval(slider);
    }, [index]);

    return (
        <div className="section-center">
            {people.map((person, personIndex) => {
                const {id, image, title, name, quote} = person;
                let position = 'nextSlide';

                if (personIndex === index) {
                    position = 'activeSlide';
                }

                if (
                    personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)
                ) {
                    position = 'lastSlide';
                }

                return <article key={id}
                                className={position}>
                    <img className='person-img'
                         src={image}
                         alt={name}/>
                    <h4>{name}</h4>
                    <p className='title'>{title}</p>
                    <p className="text">{quote}</p>
                    <FaQuoteRight className='icon'/>
                </article>
            })}
            <Buttons setIndex={setIndex}
                     index={index}/>
        </div>
    );
};

export default CenterSection;
