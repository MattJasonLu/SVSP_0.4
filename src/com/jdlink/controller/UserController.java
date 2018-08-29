package com.jdlink.controller;

import com.jdlink.domain.Account.Authority;
import com.jdlink.domain.Account.Function;
import com.jdlink.domain.Account.Role;
import com.jdlink.domain.LoginLog;
import com.jdlink.domain.User;
import com.jdlink.service.ClientService;
import com.jdlink.service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
//            e.printStackTrace();
            res.put("message", "未正确登录！");
            res.put("status", "fail");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "获取日志信息失败");
            res.put("status", "fail");
        }
        return res.toString();
    }

    /**
     * 列出所有用户
     * @return 所有用户数据
     */
    @RequestMapping("listUser")
    @ResponseBody
    public String listUser() {
        JSONObject res = new JSONObject();
        try {
            List<User> userList = userService.list();
            JSONArray data = JSONArray.fromArray(userList.toArray(new User[userList.size()]));
            res.put("status", "success");
            res.put("message", "获取用户信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "获取用户信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 列出所有用户
     * @return 所有用户数据
     */
    @RequestMapping("listRole")
    @ResponseBody
    public String listRole() {
        JSONObject res = new JSONObject();
        try {
            List<Role> roleList = userService.listRole();
            JSONArray data = JSONArray.fromArray(roleList.toArray(new Role[roleList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "获取信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("setRole")
    @ResponseBody
    public String setRole(String userId, String roleId) {
        JSONObject res = new JSONObject();
        try {
            userService.setRole(Integer.parseInt(userId), Integer.parseInt(roleId));
            res.put("status", "success");
            res.put("message", "分配角色成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "分配角色失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 列出所有功能
     * @return 功能列表
     */
    @RequestMapping("listFunction")
    @ResponseBody
    public String listFunction() {
        JSONObject res = new JSONObject();
        try {
            // 获取
            List<Function> functionList = userService.listFunction();
            JSONArray data = JSONArray.fromArray(functionList.toArray(new Function[functionList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "获取信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 根据角色的编号获取可操作的功能
     * @param roleId 角色编号
     * @return 可操作的功能列表
     */
    @RequestMapping("getFunctionByRoleId")
    @ResponseBody
    public String getFunctionByRoleList(String roleId) {
        JSONObject res = new JSONObject();
        try {
            List<Function> functionList = userService.getFunctionByRoleId(Integer.parseInt(roleId));
            JSONArray data = JSONArray.fromArray(functionList.toArray(new Function[functionList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    /**
     * 更新权限
     * @param roleId 角色编号
     * @param functionIdList 可用的功能编号列表
     * @return 成功与否
     */
    @RequestMapping("updateAuthority")
    @ResponseBody
    public String updateAuthority(int roleId, @RequestParam(value = "functionIdList[]")int[] functionIdList) {
        JSONObject res = new JSONObject();
        try {
            userService.updateAuthority(roleId, functionIdList);
            res.put("status", "success");
            res.put("message", "权限更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "权限更新失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 列出所有用户
     * @return 所有用户数据
     */
    @RequestMapping("loadAuthority")
    @ResponseBody
    public String loadAuthority() {
        JSONObject res = new JSONObject();
        try {
            List<Authority> authorityList = userService.listAuthority();
            JSONArray data = JSONArray.fromArray(authorityList.toArray(new Authority[authorityList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "获取信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 校验权限是否可以进入该功能
     * @return 能否进入
     */
    @RequestMapping("checkAuthority")
    @ResponseBody
    public String checkAuthority(HttpSession session, String functionId) {
        JSONObject res = new JSONObject();
        try {
            // 获取session中保存的用户信息
            User user = (User) session.getAttribute("user");
            // 获取user对象中的角色编号
            if (user != null) {
                int roleId = user.getRole().getId();
                // 进行校验
                if (!userService.checkAuthority(roleId, Integer.parseInt(functionId))) {
                    res.put("status", "fail");
                    res.put("message", "对不起，该账号没有权限！");
                } else {
                    res.put("status", "success");
                    res.put("message", "进入功能成功");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "服务器错误");
        }
        return res.toString();
    }

}
