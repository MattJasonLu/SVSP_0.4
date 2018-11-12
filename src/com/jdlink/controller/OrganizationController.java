package com.jdlink.controller;


import com.jdlink.domain.Produce.BurnOrder;
import com.jdlink.domain.Produce.Organization;
import com.jdlink.service.OrganizationService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class OrganizationController {

    @Autowired
    OrganizationService organizationService;

    /**
     * 获取组织架构数据
     * @return
     */
    @RequestMapping("loadOrganizationList")
    @ResponseBody
    public String list(){
        JSONObject res = new JSONObject();
        try {
            List<Organization> organizationList = organizationService.list();
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
     * @param organization
     * @return
     */
    @RequestMapping("addOrganization")
    @ResponseBody
    public String addOrganization(@RequestBody Organization organization){
        JSONObject res = new JSONObject();
        try {
            if(organization.getId() < 10){
                organizationService.addCompanyName(organization);
            }else if(organization.getId() < 100){
                organizationService.addDepartment(organization);
            }else if(organization.getId() < 1000){
                organizationService.addTeam(organization);
            }
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
    @RequestMapping("updateOrganization")
    @ResponseBody
    public String updateOrganization(@RequestBody Organization organization){
        JSONObject res = new JSONObject();
        try {
            if(organization.getId() < 10){
                organizationService.updateCompanyName(organization);
            }else if(organization.getId() < 100){
                organizationService.updateDepartment(organization);
            }else if(organization.getId() < 1000){
                organizationService.updateTeam(organization);
            }
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
    @RequestMapping("deleteOrganization")
    @ResponseBody
    public String deleteOrganization(@RequestBody Organization organization){
        JSONObject res = new JSONObject();
        try {
            System.out.println("数据：");
            System.out.println(organization);
            if(organization.getId() < 10){
                organizationService.deleteCompanyName(organization);
            }else if(organization.getId() < 100){
                organizationService.deleteDepartment(organization);
            }else if(organization.getId() < 1000){
                organizationService.deleteTeam(organization);
            }
            res.put("status", "success");
            res.put("message", "删除成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败！");
        }
        return res.toString();
    }

}
