package com.jdlink.mapper;

import com.jdlink.domain.Account.Authority;
import com.jdlink.domain.Account.Function;
import com.jdlink.domain.Account.Role;
import com.jdlink.domain.LoginLog;
import com.jdlink.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
public interface UserMapper {

    public void add(User user);

    public void delete(int id);

    public User get(int id);

    public List<User> get(Map params);

    public void update(User category);

    public List<User> list();

    public int count();

    List<User> getByUsername(String username);

    User getById(String id);

    void addLog(LoginLog loginLog);

    List<LoginLog> getLogById(int id);

    /**
     * 列出所有角色
     * @return
     */
    List<Role> listRole();

    /**
     * 设置用户的角色编号
     * @param roleId 角色编号
     */
    void setRole(@Param("userId") int userId, @Param("roleId") int roleId);

    /**
     * 列出所有功能
     * @return
     */
    List<Function> listFunction();

    /**
     * 从权限表中根据角色编号获取该角色可操作的功能列表
     * @param roleId 角色编号
     * @return 功能列表
     */
    List<Function> getFunctionByRoleId(int roleId);

    /**
     * 列出所有权限
     * @return
     */
    List<Authority> listAuthority();

    /**
     * 更新权限
     * @param roleId 角色编号
     * @param functionIdList 功能编号列表
     */
    void updateAuthority(@Param("roleId")int roleId, @Param("functionIdList")int[] functionIdList);

}
