package com.jdlink.controller;


import com.jdlink.domain.Produce.Organization;
import com.jdlink.domain.User;
import com.jdlink.service.MenuManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Controller
public class MenuManageController {
    @Autowired
    MenuManageService menuManageService;

    private User user; // 当前登陆用户

    /**
     * 获取菜单数据
     * @return
     */
    @RequestMapping("loadMenuList")
    @ResponseBody
    public String loadMenuList(){
        JSONObject res = new JSONObject();
        try {
            List<Organization> organizationList = menuManageService.list();
            JSONArray data = JSONArray.fromArray(organizationList.toArray(new Organization[organizationList.size()]));
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    public void getCurrentUserInfo(HttpSession session){
      user = (User) session.getAttribute("user");   // 获取用户信息
    }

    /**
     * 新增
     * @param organization
     * @return
     */
    @RequestMapping("addMenu")
    @ResponseBody
    public String addMenu(@RequestBody Organization organization){
        JSONObject res = new JSONObject();
        try {
            Organization organization1 = new Organization();
            int id = menuManageService.countById(organization.getId()) + 1; // 获取其子节点个数+1
            while (menuManageService.getMenuById(id) != null){
                id += 1;
            }
            organization1.setId(id);
            organization1.setpId(organization.getId());
            organization1.setName("新页面");
            organization1.setUrl(organization.getUrl());
            organization1.setIcon(organization.getIcon());
            organization1.setLevel(organization.getLevel());
            organization1.setCreationDate(new Date());
            if(user != null){
                organization1.setFounder(user.getName());
            }else{
                organization1.setFounder("未登录");
            }
            menuManageService.add(organization1);
            res.put("status", "success");
            res.put("message", "新增成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败！");
        }
        return res.toString();
    }

    /**
     * 重命名
     * @param organization
     * @return
     */
    @RequestMapping("updateMenuName")
    @ResponseBody
    public String updateMenuName(@RequestBody Organization organization){
        JSONObject res = new JSONObject();
        try {
            menuManageService.updateName(organization);
            res.put("status", "success");
            res.put("message", "修改成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败！");
        }
        return res.toString();
    }

    /**
     * 删除
     * @param organization
     * @return
     */
    @RequestMapping("deleteMenu")
    @ResponseBody
    public String deleteMenu(@RequestBody Organization organization){
        JSONObject res = new JSONObject();
        try {
            menuManageService.delete(organization);
            res.put("status", "success");
            res.put("message", "删除成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败！");
        }
        return res.toString();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
