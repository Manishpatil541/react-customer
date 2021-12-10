const listApprovalPerm = [ "Admin", "CEO", "Manager"];

export function hasListApprovalPerm(user) {
    return listApprovalPerm.includes(user.group);
}

export function hasPermission(user, permList = []) {
    if (!user) return false;
    return permList.includes(user.group);
}