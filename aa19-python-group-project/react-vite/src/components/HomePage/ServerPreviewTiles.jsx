

function ServerPreviewTile({ server, onClick }) {
    return (
        <div className='ServerLinkHolder' onClick={() => onClick(server.id)}>
            <div className="ServerLink">
                <img src={server.preview} className='serverPreview' alt={server.name} />
                <div>
                    <span id='tooltip'>{server.name}</span>
                </div>
            </div>
        </div>
    );
}

export default ServerPreviewTile;
