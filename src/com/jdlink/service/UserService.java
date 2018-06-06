package com.jdlink.service;

import com.jdlink.domain.User;

import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
public interface UserService {

    List<User> list();

    List<User> get(Map params);

    void add(User user);


}
