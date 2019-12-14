package com.jdlink.controller;

import com.jdlink.domain.Account.Authority;
import com.jdlink.domain.Account.Function;
import com.jdlink.domain.Account.Role;
import com.jdlink.domain.LoginLog;
import com.jdlink.domain.Page;
import com.jdlink.domain.User;
import com.jdlink.service.ClientService;
import com.jdlink.service.UserService;
import com.jdlink.util.DBUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
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
                loginLog.setName(user.getName());
                // 用户名root不添加登陆日志（测试账号）
                if(!loginLog.getUsername().equals("root"))
                userService.addLog(loginLog);
                res.put("status", "success");
                res.put("message", "登录成功");
                res.put("user", jsonObject);
            } else {
                res.put("status", "fail");
                res.put("message", "用户名或密码错误");
            }
        } catch (Exception e) {
            e.printStackTrace();
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
    public String getLog(HttpSession session,Page page) {
        JSONObject res = new JSONObject();
        try {
            User user = (User) session.getAttribute("user");
            if (user == null) throw new NullPointerException("未正确登录！");
            List<LoginLog> loginLogs = userService.getLogById(user.getId(),page);
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

    @RequestMapping("getAllLog")
    @ResponseBody
    public String getAllLog(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<LoginLog> loginLogs = userService.getLog(page);
            JSONArray data = JSONArray.fromArray(loginLogs.toArray(new LoginLog[loginLogs.size()]));
            res.put("data", data);
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
     * 导出登陆日志(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcelConlog")
    @ResponseBody
    public String exportExcel(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "用户编号/登录名/用户姓名/登录时间/IP地址";
            name = "登录日志";   // 重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (IOException ex) {
            ex.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
        return res.toString();
    }


    @RequestMapping("totalLogRecord")
    @ResponseBody
    public int totalLogRecord(HttpSession session){
        return userService.totalLogRecord();
    }

    /**
     * 通过编号获取用户信息
     * @param id 编号
     * @return 用户信息
     */
    @RequestMapping("getUserById")
    @ResponseBody
    public String getUserById(String id) {
        JSONObject res = new JSONObject();
        try {
            User user = userService.getById(id);
            JSONObject data = JSONObject.fromBean(user);
            res.put("status", "success");
            res.put("message", "获取用户信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取用户信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 更新用户
     * @param user 用户参数
     * @return 成功与否
     */
    @RequestMapping("updateUser")
    @ResponseBody
    public String updateUser(@RequestBody User user) {
        JSONObject res = new JSONObject();
        try {
            userService.update(user);
            res.put("status", "success");
            res.put("message", "更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
            res.put("exception", e.getMessage());
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
            res.put("status", "fail");
            res.put("message", "获取用户信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 获取当前的用户信息
     * @param session
     * @return 用户信息
     */
    @RequestMapping("getCurrentUserInfo")
    @ResponseBody
    public String getCurrentUserInfo(HttpSession session){
        JSONObject res = new JSONObject();
        try {
            User userInfo = (User) session.getAttribute("user");   // 获取用户信息
            if(userInfo == null ){
                res.put("message","用户未正常登陆");
                res.put("status","fail");
            }else {
                res.put("message","获取用户信息成功");
                res.put("status","success");
                res.put("data",userInfo);
            }
        }catch (Exception e){
            e.printStackTrace();
            res.put("message","获取用户信息失败");
            res.put("status","fail");
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
            res.put("status", "fail");
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
            res.put("status", "fail");
            res.put("message", "分配角色失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 增加角色
     * @param role 角色
     * @return 结果
     */
    @RequestMapping("addRole")
    @ResponseBody
    public String addRole(@RequestBody Role role) {
        JSONObject res = new JSONObject();
        try {
            userService.addRole(role);
            res.put("status", "success");
            res.put("message", "增加角色成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加角色失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 更新角色名称
     * @param role 角色
     * @return 结果
     */
    @RequestMapping("setRoleName")
    @ResponseBody
    public String setRoleName(@RequestBody Role role) {
        JSONObject res = new JSONObject();
        try {
            userService.setRoleName(role);
            res.put("status", "success");
            res.put("message", "修改角色名称成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改角色名称失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 删除角色
     * @param
     * @return 结果
     */
    @RequestMapping("deleteRole")
    @ResponseBody
    public String deleteRole(int id) {
        JSONObject res = new JSONObject();
        try {
            userService.deleteRoleById(id);
            res.put("status", "success");
            res.put("message", "删除角色成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除角色失败");
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
            res.put("status", "fail");
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
            res.put("status", "fail");
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
            res.put("status", "fail");
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
           // session.setMaxInactiveInterval(30*60);//以秒为单位，即在没有活动30分钟后，session将失效
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

    @RequestMapping("searchLog")
    @ResponseBody
    public String searchLog(@RequestBody LoginLog loginLog) {
        JSONObject res = new JSONObject();
        try {
            List<LoginLog> loginLogs = userService.searchLog(loginLog);
            JSONArray data = JSONArray.fromArray(loginLogs.toArray(new LoginLog[loginLogs.size()]));
            res.put("data", data);
            res.put("message", "查询成功！");
            res.put("status", "success");
        } catch (NullPointerException e) {
//            e.printStackTrace();
            res.put("message", "查询失败！");
            res.put("status", "fail");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "获取日志信息失败");
            res.put("status", "fail");
        }
        return res.toString();
    }

    @RequestMapping("searchLogTotal")
    @ResponseBody
    public int searchLogTotal(@RequestBody LoginLog loginLog) {
        try {
            return userService.searchLogCount(loginLog);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 验证密码是否正确
     * @param
     * @return
     */
    @RequestMapping("validationUser")
    @ResponseBody
    public String validationUser(@RequestBody User user) {
        JSONObject res = new JSONObject();
        try {
            int count = userService.countByUser(user);
            res.put("count", count);
            res.put("message", "查询成功！");
            res.put("status", "success");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "查询失败！");
            res.put("status", "fail");
        }
        return res.toString();
    }

    /**
     * 修改密码
     * @param
     * @return
     */
    @RequestMapping("modifyPassword")
    @ResponseBody
    public String modifyPassword(@RequestBody User user) {
        JSONObject res = new JSONObject();
        try {
            userService.modifyPassword(user);
            res.put("message", "密码修改成功！");
            res.put("status", "success");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "密码修改失败");
            res.put("status", "fail");
        }
        return res.toString();
    }


    /**
     * 获取公司邮箱信息
     * @return
     */
    @RequestMapping("getCompanyEmail")
    @ResponseBody
    public String getCompanyEmail() {
        JSONObject res = new JSONObject();
        try {
            User user = userService.getCompanyEmail();
            JSONObject data = JSONObject.fromBean(user);
            res.put("status", "success");
            res.put("message", "获取邮箱成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取邮箱失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 修改公司邮箱
     * @param user
     * @return
     */
    @RequestMapping("updateCompanyEmail")
    @ResponseBody
    public String updateCompanyEmail(@RequestBody User user) {
        JSONObject res = new JSONObject();
        try {
            userService.updateCompanyEmail(user);
            res.put("status", "success");
            res.put("message", "修改邮箱成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改邮箱失败！");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 删除账号
     * @param
     * @return 结果
     */
    @RequestMapping("deleteUserById")
    @ResponseBody
    public String deleteUserById(int id) {
        JSONObject res = new JSONObject();
        try {
            userService.deleteUserById(id);
            res.put("status", "success");
            res.put("message", "删除账号成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除账号失败");
        }
        return res.toString();
    }

}
