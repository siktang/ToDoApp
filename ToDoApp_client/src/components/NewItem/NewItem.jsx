import "./NewItem.scss";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function NewItem() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [apiError, setApiError] = useState(null);

    return(
        <div className="new-item-section">
            <label htmlFor="new-item"> New Item: </label>
            <textarea id="new-item" placeholder="Add a new item here"></textarea>
            <button>Add</button>
        </div>
    )
}