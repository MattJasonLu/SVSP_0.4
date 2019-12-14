package com.jdlink.service.impl;

import com.jdlink.domain.Account.Authority;
import com.jdlink.domain.Account.Function;
import com.jdlink.domain.Account.Role;
import com.jdlink.domain.LoginLog;
import com.jdlink.domain.Page;
import com.jdlink.domain.User;
import com.jdlink.mapper.UserMapper;
import com.jdlink.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public List<User> list() {
        return userMapper.list();
    }

    @Override
    public List<User> get(Map params) {
        return userMapper.get(params);
    }

    @Override
    public void add(User user) {
        userMapper.add(user);
    }

    @Override
    public List<User> getByUsername(String username) {
        return userMapper.getByUsername(username);
    }

    @Override
    public User getById(String id) {
        return userMapper.getById(id);
    }

    @Override
    public void deleteRoleById(int id) { userMapper.deleteRoleById(id);}

    @Override
    public void deleteUserById(int id) { userMapper.deleteUserById(id);}

    @Override
    public void update(User user) {
        userMapper.update(user);
    }


    @Override
    public void addLog(LoginLog loginLog) {
        userMapper.addLog(loginLog);
    }

    @Override
    public List<LoginLog> getLogById(int id,Page page) {
        return userMapper.getLogById(id,page);
    }

    @Override
    public int totalLogRecord(){ return userMapper.totalLogRecord(); }

    @Override
    public List<Role> listRole() {
        return userMapper.listRole();
    }

    @Override
    public void setRole(int userId, int roleId) {
        userMapper.setRole(userId, roleId);
    }

    @Override
    public void addRole(Role role) {
        userMapper.addRole(role);
    }

    @Override
    public void setRoleName(Role role) {
        userMapper.setRoleName(role);
    }

    @Override
    public List<Function> listFunction() {
        return userMapper.listFunction();
    }

    @Override
    public List<Function> getFunctionByRoleId(int roleId) {
        return userMapper.getFunctionByRoleId(roleId);
    }

    @Override
    public List<Authority> listAuthority() {
        return userMapper.listAuthority();
    }

    @Override
    public void updateAuthority(int roleId, int[] functionIdList) {
        userMapper.updateAuthority(roleId, functionIdList);
    }

    @Override
    public boolean checkAuthority(int roleId, int functionId) {
        return userMapper.checkAuthority(roleId, functionId);
    }

    @Override
    public List<LoginLog> getLog(Page page){ return userMapper.getLog(page); }

    @Override
    public List<LoginLog> searchLog(LoginLog loginLog){return userMapper.searchLog(loginLog);}

    @Override
    public int searchLogCount(LoginLog loginLog){ return userMapper.searchLogCount(loginLog);}

    @Override
    public  int countByUser(User user){ return userMapper.countByUser(user);}

    @Override
    public void modifyPassword(User user){ userMapper.modifyPassword(user);}

    @Override
    public User getCurrentUserInfo(HttpSession session) {
        return (User) session.getAttribute("user");
    }

    @Override
    public List<User> getUserListByRoleId(int roleId) {
        return userMapper.getUserListByRoleId(roleId);
    }

    @Override
    public User getCompanyEmail() {
        return userMapper.getCompanyEmail();
    }

    @Override
    public void updateCompanyEmail(User user) {
        userMapper.updateCompanyEmail(user);
    }
}
