package com.jdlink.controller;

import com.jdlink.domain.LoginLog;
import com.jdlink.domain.User;
import com.jdlink.service.ClientService;
import com.jdlink.service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
@Controller
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    ClientService clientService;

    @RequestMapping("getUser")
    @ResponseBody
    public String getUser(User user, HttpSession session, HttpServletRequest request) {
        JSONObject res = new JSONObject();
        try {
            // 查询参数
            Map<String, String> params = new HashMap<>();
            if (user.getUsername().equals("") || user.getPassword().equals("")) {
                res.put("status", "fail");
                res.put("message", "用户名密码为空");
            }
            params.put("username", user.getUsername());
            params.put("password", user.getPassword());
            List<User> userList = userService.get(params);
            // 更新用户，通过数据查询后得到的用户为准
            if (userList.size() > 0) {
                user = userList.get(0);
                session.setAttribute("user", user);
                JSONObject jsonObject = JSONObject.fromBean(user);
                // 创建登录日志
                LoginLog loginLog = new LoginLog();
                loginLog.setUserId(user.getId());
                loginLog.setUsername(user.getUsername());
                loginLog.setTime(new Date());
                loginLog.setIp(request.getRemoteAddr());
                userService.addLog(loginLog);
                res.put("status", "success");
                res.put("message", "登录成功");
                res.put("user", jsonObject);
            } else {
                res.put("status", "fail");
                res.put("message", "用户名或密码错误");
            }
        } catch (Exception e) {
            res.put("status", "error");
            res.put("message", "服务器异常");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("addUser")
    @ResponseBody
    public String addUser(User user, String cfmPassword) {
        JSONObject res = new JSONObject();
        if (cfmPassword.equals(user.getPassword())) {
            try {
                if (userService.getByUsername(user.getUsername()).size() > 0) {
                    res.put("status", "fail");
                    res.put("message", "用户名已存在");
                } else {
                    userService.add(user);
                    res.put("status", "success");
                    res.put("message", "注册成功");
                }
            } catch (Exception e) {
                e.printStackTrace();
                res.put("status", "error");
                res.put("message", "注册失败");
            }
        } else {
            res.put("status", "fail");
            res.put("message", "两次密码不一致，请重试！");
        }
        return res.toString();
    }

    @RequestMapping("getLog")
    @ResponseBody
    public String getLog(HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            User user = (User) session.getAttribute("user");
            if (user == null) throw new NullPointerException("未正确登录！");
            List<LoginLog> loginLogs = userService.getLogById(user.getId());
            JSONArray data = JSONArray.fromArray(loginLogs.toArray(new LoginLog[loginLogs.size()]));
            res.put("data", data.toString());
            res.put("message", "获取日志信息成功");
            res.put("status", "success");
        } catch (NullPointerException e) {
            e.printStackTrace();
            res.put("message", "未正确登录！");
            res.put("status", "fail");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "获取日志信息失败");
            res.put("status", "fail");
        }
        return res.toString();
    }

}
