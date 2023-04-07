export default function Message({message}) {
    return (
        <div>
            {message &&
                <div className="message danger">
                    <h2>{message}</h2>
                </div>
            }
        </div>
    )
}