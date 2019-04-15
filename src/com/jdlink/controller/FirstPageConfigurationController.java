package com.jdlink.controller;

import com.jdlink.domain.Produce.Organization;
import com.jdlink.service.FirstPageConfigurationService;
import com.jdlink.service.MenuManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class FirstPageConfigurationController {
    @Autowired
    MenuManageService menuManageService;
    @Autowired
    FirstPageConfigurationService firstPageConfigurationService;

    /**
     * 新增首页显示配置
     * @param organization
     * @return
     */
    @RequestMapping("addPageConfiguration")
    @ResponseBody
    public String addPageConfiguration(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            firstPageConfigurationService.addPage(organization);
            res.put("status", "success");
            res.put("message", "新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败");
        }
        return res.toString();
    }

    /**
     * 根据一级菜单名和角色ID获取选中的页面ID集合
     * @param organization
     * @return
     */
    @RequestMapping("getPageIdListByMenuNameAndRoleId")
    @ResponseBody
    public String getPageIdListByMenuNameAndRoleId(@RequestBody Organization organization) {
        JSONObject res = new JSONObject();
        try {
            List<Integer> dataList = firstPageConfigurationService.getByMenuNameAndRoleId(organization);
            JSONArray data = JSONArray.fromArray(dataList.toArray(new Integer[dataList.size()]));
            res.put("status", "success");
            res.put("message", "新增成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败");
        }
        return res.toString();
    }


}
