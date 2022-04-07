const getRecipientId = (users, currentUser) => 
    users?.filter((userToFilter) => userToFilter !== currentUser?.uid)[1]

export default getRecipientId