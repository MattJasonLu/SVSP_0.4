package com.jdlink.service;

import com.jdlink.domain.Account.Authority;
import com.jdlink.domain.Account.Function;
import com.jdlink.domain.Account.Role;
import com.jdlink.domain.LoginLog;
import com.jdlink.domain.Page;
import com.jdlink.domain.User;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
public interface UserService {

    List<User> list();

    List<User> get(Map params);

    void add(User user);

    void deleteRoleById(int id);

    void deleteUserById(int id);

    List<User> getByUsername(String username);

    User getById(String id);

    void update(User user);

    void addLog(LoginLog loginLog);

    /**
     * 获取分页登录数据
     * @param id
     * @param page
     * @return
     */
    List<LoginLog> getLogById(int id,Page page);

    List<LoginLog> getLog(Page page);
    /**
     * 获取登陆总记录数
     * @return
     */
    int totalLogRecord();
    /**
     * 列出所有角色
     * @return
     */
    List<Role> listRole();

    /**
     * 设置用户的角色编号
     * @param roleId 角色编号
     */
    void setRole(int userId, int roleId);

    /**
     * 增加角色
     * @param role 角色
     */
    void addRole(Role role);

    /**
     * 更新角色名称
     * @param role 角色
     */
    void setRoleName(Role role);

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
    void updateAuthority(int roleId, int[] functionIdList);

    /**
     * 校验当前账号所对应的角色是否可以进入该功能
     * @param roleId 角色编号
     * @param functionId 功能编号
     * @return 能否进入
     */
    boolean checkAuthority(int roleId, int functionId);

    List<LoginLog> searchLog(LoginLog loginLog);

    int searchLogCount(LoginLog loginLog);

    int countByUser(User user);

    void modifyPassword(User user);

    /**
     * 获取当前用户信息
     * @param session
     * @return
     */
    User getCurrentUserInfo(HttpSession session);

    List<User> getUserListByRoleId(int roleId);

    User getCompanyEmail();

    void updateCompanyEmail(User user);

}
