package com.jdlink.mapper;

import com.jdlink.domain.User;

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

}
