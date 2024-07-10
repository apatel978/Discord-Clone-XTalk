const MemberList = ({ members }) => {
    return (
        <div>
            <span>Members</span>
            {members?.map((member) => (
                <div key={`${member.id}`}>{member?.username}</div>
            ))}
        </div>
    )
}


export default MemberList
