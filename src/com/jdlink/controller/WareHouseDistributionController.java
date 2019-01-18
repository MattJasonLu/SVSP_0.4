package com.jdlink.controller;

import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.domain.Inventory.WareHouseDistribution;
import com.jdlink.domain.Inventory.WareHouseDistributionList;
import com.jdlink.domain.User;
import com.jdlink.service.WareHouseDistributionService;
import com.jdlink.service.WareHouseService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * 角色仓库分配
 */
@Controller
public class WareHouseDistributionController {

    @Autowired
    WareHouseDistributionService wareHouseDistributionService;
    @Autowired
    WareHouseService wareHouseService;

    /**
     * 保存角色仓库设置数据
     * @return 仓库列表
     */
    @RequestMapping("deleteAndAddWareHouseDistribution")
    @ResponseBody
    public String deleteAndAddWareHouseDistribution(@RequestBody WareHouseDistributionList wareHouseDistributionList) {
        JSONObject res=new JSONObject();
        try {
            wareHouseDistributionService.deleteByRoleId(wareHouseDistributionList.getRoleId());
            wareHouseDistributionService.addAll(wareHouseDistributionList);
            res.put("status", "success");
            res.put("message", "保存成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "保存失败");
        }
        return res.toString();
    }

    /**
     * 跟据当前角色取出所有仓库
     * @return 仓库列表
     */
    @RequestMapping("getWareHouseListByCurrentUser")
    @ResponseBody
    public String getWareHouseListByCurrentUser(HttpSession session) {
        JSONObject res=new JSONObject();
        try {
            User userInfo = (User) session.getAttribute("user");   // 获取用户信息
            if(userInfo != null){
                // 根据角色获取仓库ID列表
                int roleId = userInfo.getRole().getId();
                List<Integer> wareHouseIdList = wareHouseDistributionService.getWareHouseIdListByRoleId(roleId);
                List<WareHouse> wareHouseList = wareHouseService.list(); // 获取所有的仓库信息
                List<WareHouse> wareHouseNewList = new ArrayList<>();     // 已分配的仓库数据
                for(WareHouse wareHouse : wareHouseList){
                    if(wareHouseIdList.contains(wareHouse.getWareHouseId())) {   // 如果仓库数组存在该仓库id
                        wareHouseNewList.add(wareHouse);  // 添加
                    }
                }
                JSONArray data = JSONArray.fromArray(wareHouseNewList.toArray(new WareHouse[wareHouseNewList.size()]));
                res.put("status", "success");
                res.put("message", "获取成功");
                res.put("data", data);
            }else{
                res.put("status", "fail");
                res.put("message", "用户未登陆，请先登陆！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    /**
     * 跟据角色ID取出已分配仓库ID
     * @return 仓库列表
     */
    @RequestMapping("getWareHouseIdListByRoleId")
    @ResponseBody
    public String getWareHouseIdListByRoleId(int roleId) {
        JSONObject res=new JSONObject();
        try {
            // 根据角色ID获取仓库ID列表
            List<Integer> wareHouseIdList = wareHouseDistributionService.getWareHouseIdListByRoleId(roleId);
            JSONArray data = JSONArray.fromArray(wareHouseIdList.toArray(new Integer[wareHouseIdList.size()]));
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }
}
