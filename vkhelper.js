module.exports = {
  vk_groups_isMember : function (vk, group_id, user_id) {

    return vk.groups.isMember({
        group_id: group_id,
        user_id:user_id
    });
  }
};
