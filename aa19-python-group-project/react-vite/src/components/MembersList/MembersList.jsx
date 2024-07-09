const MemberList = ({ members }) => {
    return (
        <div>
            <span>Members</span>
            {members?.map((member) => (
                <div>{member?.username}</div>
            ))}
        </div>
    )
}


export default MemberList
