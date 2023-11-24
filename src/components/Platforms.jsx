export default function Platforms({ platforms }) {
    return (
        <>
            <div className="dropdown" >
                <button className="btn py-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Platforms
                </button>
                <ul className="dropdown-menu" style={{'height' : '300px', 'overflowY' : 'scroll'}}>
                    {platforms.map((platform) => (
                        <li key={platform.id}><a className="dropdown-item" href="#">{platform.name}</a></li>
                    ))}
                </ul>
            </div>
        </>
    )
}