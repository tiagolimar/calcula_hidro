import { useState } from "react";
import PropTypes from "prop-types";
import { MinimizeAndCloseButtons } from "./MinimizeAndCloseButtons"

export const Card = (props) => {
    let [hideCard,setHideCard] = useState("");

    const onClickMin = ()=>{
        hideCard = hideCard ? "" : "hide-card";
        setHideCard(hideCard);
    }

    return (
        <div className={`card col-12 mt-2 mb-2 border-primary rounded-4`}>
            <div className="card-header d-flex justify-content-between">
                <h3 className="card-title fs-6">{props.title}</h3>
                <MinimizeAndCloseButtons onClickMin={onClickMin} />
            </div>
            <div className={`${hideCard} card-body d-flex flex-wrap gap-3`}>
                {props.children}
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
