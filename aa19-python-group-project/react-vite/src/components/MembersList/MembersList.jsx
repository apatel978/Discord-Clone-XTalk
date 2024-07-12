const MemberList = ({ members }) => {
    return (
        <div className="column4">
            <span>Members</span>
            {members?.map((member) => (
                <div key={`${member.id}`}>{member?.username}</div>
            ))}
        </div>
    )
}


export default MemberList
