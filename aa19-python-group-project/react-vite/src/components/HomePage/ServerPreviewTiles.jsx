import { Link } from "react-router-dom"

function ServerPreviewTile({ server }) {
    return (
        <div className='ServerLinkHolder'>
            <Link className="ServerLink" to={`servers/${server.id}`}>
          
                <img src={server.preview} className='serverPreview'/>
                <div>
                    <span id='tooltip'>{server.name}</span>
                </div>
            </Link>
        </div>
    )
}

export default ServerPreviewTile
