/**
 * Find a eboard member with a certain title
 * @param {[]} eboard_members 
 * @param {string} userId the user id 
 * @param {string} title 
 * @returns true if the member was found that has the given title false otherwise
 */
function findEboardMember(eboard_members, userId, title) {
    for (const eboard_member of eboard_members) {
        if (eboard_member.userId === userId && eboard_member.title === title) {
            return true;
        }
    }

    return false;
}

module.exports = findEboardMember;