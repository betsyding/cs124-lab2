import './Alert.css';

function Alert(props) {
    return <div className={"backdrop"}>
        <div className="modal">
            {props.children}
            <div className="alert-buttons">
                <label htmlFor="shareField"> Share list with: </label>
                <input type="text" id="shareField" value={props.newEmail} onChange={(e) => props.setNewEmail(e.target.value)}/>
                <button className="alert-button alert-cancel" type="button"
                        onClick={props.onClose}>
                    Cancel
                </button>
                <button className="alert-button alert-ok" type="button"
                        onClick={() => {
                            props.onClose();
                            props.onOK();
                        }}>
                    OK
                </button>
                </div>
            </div>
    </div>
}

export default Alert;