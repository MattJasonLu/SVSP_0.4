package com.jdlink.service.impl;

import com.jdlink.domain.Account.Authority;
import com.jdlink.domain.Account.Function;
import com.jdlink.domain.Account.Role;
import com.jdlink.domain.LoginLog;
import com.jdlink.domain.User;
import com.jdlink.mapper.UserMapper;
import com.jdlink.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void addLog(LoginLog loginLog) {
        userMapper.addLog(loginLog);
    }

    @Override
    public List<LoginLog> getLogById(int id) {
        return userMapper.getLogById(id);
    }

    @Override
    public List<Role> listRole() {
        return userMapper.listRole();
    }

    @Override
    public void setRole(int userId, int roleId) {
        userMapper.setRole(userId, roleId);
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

}
