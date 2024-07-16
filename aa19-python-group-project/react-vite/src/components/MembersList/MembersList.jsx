const MemberList = ({ members }) => {
    return (
        <div className="column4">
           <h3>Members - {members?.length}</h3>
            {members?.map((member) => (
                <div id="members-list" key={`${member.id}`}>{member?.username}
                <span className="online-status"></span>
                </div>
            ))}
        </div>
    )
}


export default MemberList
