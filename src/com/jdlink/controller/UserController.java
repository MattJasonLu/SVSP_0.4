package com.jdlink.controller;

import com.jdlink.domain.Client;
import com.jdlink.domain.User;
import com.jdlink.service.ClientService;
import com.jdlink.service.UserService;
import com.sun.javafx.sg.PGShape;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
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

    @RequestMapping("listUser")
    public ModelAndView listUser() {
        ModelAndView mav = new ModelAndView();
        List<User> userList = userService.list();
        mav.addObject("userList", userList);
        mav.setViewName("/WEB-INF/jsp/listUser.jsp");
        return mav;
    }

    @RequestMapping("getUser")
    @ResponseBody
    public User getUser(User user, HttpSession session) {
        try {
            // 查询参数
            Map<String, String> params = new HashMap<>();
            if (user.getUsername().equals("") || user.getPassword().equals("")) {
                return null;
            }
            params.put("username", user.getUsername());
            params.put("password", user.getPassword());
            List<User> userList = userService.get(params);
            // 更新用户，通过数据查询后得到的用户为准
            user = userList.get(0);
            if (userList.size() > 0) {
                // 将用户绑定的客户对象信息绑定到session中
                Client client = clientService.getByClientId(user.getClientId());
                // 将用户对应的客户编号或者管理员编号加入session保存
                session.setAttribute("client", client);
                // 设置session的有效时间为30分钟
                session.setMaxInactiveInterval(30 * 60);
                return user;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping("addUser")
    public ModelAndView addUser(HttpServletRequest request, User user) {
        ModelAndView mav = new ModelAndView();
        String secondPassword = request.getParameter("secondPassword");
        if (secondPassword.equals(user.getPassword())) {
            userService.add(user);
            mav.addObject("username", user.getUsername());
            mav.setViewName("redirect: index.html");
        } else {
            mav.addObject("message", "两次密码不一致，请重试！");
            mav.setViewName("fail");
        }
        return mav;
    }

    @RequestMapping("home")
    public ModelAndView goHome(HttpSession session) {
        ModelAndView mav = new ModelAndView();
        Client client = clientService.getByClientId("0001");
        // 将用户对应的客户编号或者管理员编号加入session保存
        session.setAttribute("client", client);
        mav.setViewName("home");
        return mav;
    }

}
