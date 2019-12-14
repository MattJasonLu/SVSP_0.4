package com.jdlink.controller;


import com.jdlink.domain.Produce.Organization;
import com.jdlink.domain.User;
import com.jdlink.service.FirstPageConfigurationService;
import com.jdlink.service.MenuManageService;
import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class MenuManageController {
    @Autowired
    MenuManageService menuManageService;
    @Autowired
    FirstPageConfigurationService firstPageConfigurationService;

    /**
     * 获取菜单数据
     *
     * @return
     */
    @RequestMapping("loadMenuList")
    @ResponseBody
    public String loadMenuList() {
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

    /**
     * 获取菜单数据
     *
     * @return
     */
    @RequestMapping("loadFirstMenuList")
    @ResponseBody
    public String loadFirstMenuList() {
        JSONObject res = new JSONObject();
        try {
            List<Organization> organizationList = menuManageService.listFirstMenu();
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


    /**
     * 获取页面数据
     *
     * @return
     */
    @RequestMapping("loadMenuPageList")
    @ResponseBody
    public String loadMenuPageList() {
        JSONObject res = new JSONObject();
        try {
            List<Organization> organizationList = menuManageService.listMenuPage();
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

    /**
     * 获取一级菜单图标数据
     *
     * @return
     */
    @RequestMapping("loadFirstMenuIconList")
    @ResponseBody
    public String loadFirstMenuIconList() {
        JSONObject res = new JSONObject();
        try {
            List<Organization> organizationList = menuManageService.loadFirstMenuIconList();
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

    /**
     * 新增
     *
     * @param organization
     * @return
     */
    @RequestMapping("addMenu")
    @ResponseBody
    public String addMenu(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            Organization organization1 = new Organization();
            int id = menuManageService.countById(organization.getId()); // 获取其子节点个数+1
            id += organization.getId() * 10;
            while (menuManageService.getMenuById(id) != null) {
                id += 1;
            }
            String name = "新页面";
            int i = 1;
            while (menuManageService.getMenuByName(name, organization.getId()) != null) { // 同一节点下名称不予许重复
                i++;
                name = "新页面";
                name += i;
            }
            organization1.setId(id);
            organization1.setpId(organization.getId());
            organization1.setName(name);
            organization1.setUrl(organization.getUrl());// 为空
            organization1.setIcon(organization.getIcon()); // 为空
            organization1.setLevel(organization.getLevel());
            organization1.setCreationDate(new Date());
            organization1.setFounder(organization.getFounder());
            menuManageService.add(organization1);    // 新增菜单模块和权限树模块
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
     *
     * @param organization
     * @return
     */
    @RequestMapping("updateMenuName")
    @ResponseBody
    public String updateMenuName(@RequestBody Organization organization) {
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
     * 设置页面链接
     *
     * @param organization
     * @return
     */
    @RequestMapping("updateMenuUrl")
    @ResponseBody
    public String updateMenuUrl(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            // 获取网页对应的功能列表
            List<Organization> organizationList = menuManageService.getPageFunctionByUrl(organization.getUrl());
//            menuManageService.deleteFunctionByPId(organization.getpId()); // 删除之前的功能
//            for (Organization organization1 : organizationList) {
//                int pId = organization.getId();
//                organization1.setpId(pId);
//                menuManageService.addFunctionTree(organization1);  // 添加网页功能
//            }
            menuManageService.updateMenuUrl(organization);
            res.put("status", "success");
            res.put("message", "设置成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "该页面已绑定！");
        }
        return res.toString();
    }

    /**
     * 设置一级菜单图标
     *
     * @param organization
     * @return
     */
    @RequestMapping("updateMenuIcon")
    @ResponseBody
    public String updateMenuIcon(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            menuManageService.updateMenuIcon(organization);
            res.put("status", "success");
            res.put("message", "设置成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "设置失败！");
        }
        return res.toString();
    }


    /**
     * 设置顺序
     *
     * @param
     * @return
     */
    @RequestMapping("updateMenuOrder")
    @ResponseBody
    public String updateMenuOrder(String idList, int pId) {
        JSONObject res = new JSONObject();
        try {
            List<Integer> oldIdList = menuManageService.getMenuIdListByPId(pId);
            // System.out.println("旧顺序");
            for (Integer integer : oldIdList) {
                System.out.print(integer + "/");
            }
            // System.out.println();
            String idOrder[] = idList.split("/");
            List<Integer> newIdList = new ArrayList<>();
            int j = 0;
            int id = -1;   // 用于储存第一个顺序发生变化的ID
            for (int i = 0; i < idOrder.length; i++) {
                //   System.out.print(idOrder[i]+"/");
                int newId = Integer.parseInt(idOrder[i]);
                int oldId = oldIdList.get(i);
                newIdList.add(newId);
                Organization organization = new Organization();
                if (newId != oldId) { // 如果顺序发生改变则进行调整
                    if (j == 0) { // 第一次设置
                        organization.setId(id);  // 将第一个对象的ID暂时设为-1,避免冲突
                        id = newId; // 将新ID暂存到ID中
                        organization.setOldId(oldId);
                        menuManageService.updateMenuOrder(organization);
                    } else {
                        organization.setId(newId);
                        organization.setOldId(oldId);
                        menuManageService.updateMenuOrder(organization);
                    }
                    j++;   // 计时器
                }
            }
            if (j != 0) {
                Organization organization1 = new Organization(); // 将第一个对象的顺序调整回来
                organization1.setId(id);
                organization1.setOldId(-1);
                menuManageService.updateMenuOrder(organization1);
            }
            res.put("status", "success");
            res.put("message", "设置成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "设置失败！");
        }
        return res.toString();
    }

    /**
     * 删除
     *
     * @param organization
     * @return
     */
    @RequestMapping("deleteMenu")
    @ResponseBody
    public String deleteMenu(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            List<Organization> organizationList = getTreeMenuList(organization);  // 获取孩子节点
            organization.setOrganizationList(organizationList); // 设置树状结构
            delete(organization);
            res.put("status", "success");
            res.put("message", "删除成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败！");
        }
        return res.toString();
    }

    /**
     * 递归删除节点及其子节点
     *
     * @param organization
     */
    public void delete(Organization organization) {
        menuManageService.delete(organization);
        if (organization.getOrganizationList() != null && organization.getOrganizationList().size() > 0) {
            for (Organization organization1 : organization.getOrganizationList()) {
                delete(organization1);
            }
        }
    }

    /**
     * 根据ID获取对象
     *
     * @param
     * @return
     */
    @RequestMapping("getMenuById")
    @ResponseBody
    public String getMenuById(int id) {
        JSONObject res = new JSONObject();
        try {
            Organization organization = menuManageService.getMenuById(id);
            JSONObject data = JSONObject.fromBean(organization);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败！");
        }
        return res.toString();
    }

    /**
     * 根据name 和 pId获取对象
     *
     * @param
     * @return
     */
    @RequestMapping("getMenuByName")
    @ResponseBody
    public String getMenuByName(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            Organization organization1 = menuManageService.getMenuByName(organization.getName(), organization.getpId());
            JSONObject data = JSONObject.fromBean(organization1);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败！");
        }
        return res.toString();
    }

    /**
     * 根据name 和 pId获取子类对象及其树状结构
     *
     * @param
     * @return
     */
    @RequestMapping("getChildrenMenuByName")
    @ResponseBody
    public String getChildrenMenuByName(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            List<Organization> organizationList = getTreeMenuList(organization);
            JSONArray data = JSONArray.fromArray(organizationList.toArray(new Organization[organizationList.size()]));
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败！");
        }
        return res.toString();
    }

    /**
     * 获取动态菜单树状结构
     *
     * @param
     * @return
     */
    @RequestMapping("getMenuTree")
    @ResponseBody
    public String getMenuTree(HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            Organization organization = menuManageService.getMenuById(1);  // 获取动态菜单树状结构
            List<Organization> organizationList = getTreeMenuList(organization);
           Organization organization1 = new Organization();
            User user = (User) session.getAttribute("user");   // 获取当前用户
            if(user != null && user.getRole() != null) {  // 获取该角色下的首页配置数据
                List<Organization> firstMenuConfigurationList = firstPageConfigurationService.getPageConfigurationTreeByRoleId(user.getRole().getId());
                organization1.setOrganizationList(firstMenuConfigurationList);
            }
            organization.setOrganizationList(organizationList);
            JSONObject data = JSONObject.fromBean(organization);
            JSONObject data1 = JSONObject.fromBean(organization1);
            res.put("data", data);
            res.put("firstMenuConfiguration", data1);
            res.put("status", "success");
            res.put("message", "获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败！");
        }
        return res.toString();
    }

    /**
     * 递归获取树状结构
     *
     * @param organization
     * @return
     */
    public List<Organization> getTreeMenuList(Organization organization) {
        List<Organization> organizationList = menuManageService.getChildrenMenuByName(organization);
        for (int i = 0; i < organizationList.size(); i++) {
            organizationList.get(i).setOrganizationList(getTreeMenuList(organizationList.get(i)));
        }
        return organizationList;
    }

    /**
     * 获取一级菜单父节点及其树状结构
     *
     * @param
     * @return
     */
    @RequestMapping("getLevelOneMenuByUrlAndPName")
    @ResponseBody
    public String getLevelOneMenuByUrlAndPName(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            organization.setpId(1);  // 设置一级菜单父节点
            List<Organization> organizationList = getTreeMenuList(organization); // 获取一级菜单及其树状结构
            organization.setOrganizationList(organizationList);
            Organization organization1 = new Organization();
            if (organizationList != null && organizationList.size() > 0) {
                organization1 = getChildMenuByUrl(organization);
            }
            organization1.setUrl("firstPage.html");
            organization1.setName(organization.getName());
            JSONObject data = JSONObject.fromBean(organization1);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败！");
        }
        return res.toString();
    }

    /**
     * 递归根据URL查询子节点
     *
     * @param organization1
     * @return
     */
    public Organization getChildMenuByUrl(Organization organization1) {
        Organization organization2 = new Organization();
        for (Organization organization : organization1.getOrganizationList()) {
            if (organization.getUrl() != null && organization.getUrl().equals(organization1.getUrl())) { // 如果相等则说明是要寻找的子节点
                organization2.setName(organization1.getName());
                organization2.getOrganizationList().add(organization);  // 添加子节点路径
            } else { // 如果不相等则寻找子节点的子节点是否相等
                if (organization.getOrganizationList() != null && organization.getOrganizationList().size() > 0) {
                    organization.setUrl(organization1.getUrl());
                    Organization organization3 = getChildMenuByUrl(organization);
                    if (organization3 != null && !organization3.getName().equals("")) {
                        organization2.setName(organization1.getName());
                        organization2.getOrganizationList().add(organization3);  // 添加路径
                    }
                }
            }
        }
        return organization2;
    }

    /**
     * 根据子类url获取一级菜单
     *
     * @param
     * @return
     */
    @RequestMapping("getLevelOneMenuByUrl")
    @ResponseBody
    public String getLevelOneMenuByUrl(String url) {
        JSONObject res = new JSONObject();
        try {
            Organization organization = getLevelOneMenuByUrl1(url); // 获取一级菜单
            res.put("name", organization.getName());  // 返回一级菜单名
            res.put("status", "success");
            res.put("message", "获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败！");
        }
        return res.toString();
    }

    /**
     * 递归获取一级菜单
     *
     * @param url
     * @return
     */
    public Organization getLevelOneMenuByUrl1(String url) {
        Organization organization1 = new Organization();
        List<Organization> organizationList = menuManageService.getMenuByCUrl(url);
        for (Organization organization : organizationList) {
            if (organization.getpId() == 1) { // 获取到一级菜单直接返回
                organization1 = organization;
                return organization1;
            } else {
                Organization organization2 = getLevelOneMenuByUrl1(organization.getUrl());
                if (!organization2.getName().equals("")) organization1 = organization2;
            }
        }
        return organization1;
    }

    /**
     * 根据动态菜单同步设置权限表树状结构
     *
     * @param
     * @return
     */
    @RequestMapping("setFunctionTreeByMenuTree")
    @ResponseBody
    public String setFunctionTreeByMenuTree() {
        JSONObject res = new JSONObject();
        try {
            Organization organization = menuManageService.getMenuById(1);  // 获取动态菜单树状结构
            List<Organization> organizationList = getTreeMenuAndFunctionList(organization); // 一级菜单及树状结构
            organization.setOrganizationList(organizationList);
            menuManageService.deleteFunction(); // 删除旧数据
            for (Organization organization1 : organizationList) {
                if (organization1.getpId() == 1) { // 一级菜单
                    organization1.setpId(0);   // 一级菜单在权限表中父节点为0
                }
                setFunctionTree(organization1);  // 设置权限表
            }
            JSONObject data = JSONObject.fromBean(organization);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "更新成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败！");
        }
        return res.toString();
    }

    /**
     * 递归获取菜单及功能树状结构
     *
     * @param organization
     * @return
     */
    public List<Organization> getTreeMenuAndFunctionList(Organization organization) {
        List<Organization> organizationList = menuManageService.getChildrenMenuByName(organization); // 获取其子节点
        for (int i = 0; i < organizationList.size(); i++) {  // 递归获取子节点的子节点
            organizationList.get(i).setOrganizationList(getTreeMenuAndFunctionList(organizationList.get(i)));
        }
        if (organization.getUrl() != null && !organization.getUrl().equals("")) {  // 如果URL非空则获取其功能表的功能节点并设置
            List<Organization> organizationList1 = menuManageService.getPageFunctionByUrl(organization.getUrl());
            for (Organization organization1 : organizationList1) {  // 设置父节点ID
                int pId = organization.getId();
                organization1.setpId(pId);
                organizationList.add(organization1);
            }
        }
        return organizationList;
    }

    /**
     * 递归设置权限表
     */
    public void setFunctionTree(Organization organization) {
        if (menuManageService.getFunctionCountById(organization.getId()) == 0) {
            menuManageService.addFunctionTree(organization); // 新增
        } else {
            System.out.println(organization);
        }
        if (organization.getOrganizationList() != null && organization.getOrganizationList().size() > 0) { // 存在字节点继续设置
            for (Organization organization1 : organization.getOrganizationList()) {
                setFunctionTree(organization1);
            }
        }
    }

}
