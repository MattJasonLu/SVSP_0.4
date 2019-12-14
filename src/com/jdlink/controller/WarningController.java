package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.User;
import com.jdlink.domain.Warning;
import com.jdlink.service.WarningService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * 预警模块控制器
 */
@Controller
public class WarningController {
    @Autowired
    WarningService warningService;


    /**
     * 添加或更新
     */
    @RequestMapping("AddOrUpdateWarning")
    @ResponseBody
    public String AddOrUpdateWarning(@RequestBody Warning warning) {
        JSONObject res = new JSONObject();

        try {
            //1如果Id存在做更新

            if (warning.getId() != 0) {
                warningService.updateWarning(warning);
            }

            //2如果Id不存在就添加
            if (warning.getId() == 0) {
                warningService.add(warning);
            }
            //3还有一种情况是有的在前端被删除
            res.put("message", "编辑成功");
            res.put("status", "success");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "编辑失败");
        }

        return res.toString();
    }

    /**
     * 获取危废入库单预警阈值
     */
    @RequestMapping("getWastesThreshold")
    @ResponseBody
    public String getWastesThreshold() {
        JSONObject res = new JSONObject();
        try {
            float wastesThreshold = warningService.getThresholdById(1);
            res.put("status", "success");
            res.put("message", "获取危废入库单预警阈值成功");
            res.put("data", wastesThreshold);
        } catch (Exception e) {
            e.printStackTrace();

            res.put("status", "fail");

            res.put("message", "获取危废入库单预警阈值失败");
        }

        return res.toString();

    }


    /**
     * 获取危废库存预警期限阈值
     */
    @RequestMapping("getInventoryThreshold")
    @ResponseBody
    public String getInventoryThreshold() {
        JSONObject res = new JSONObject();
        try {
            float inventoryThreshold = warningService.getThresholdById(2);
            res.put("status", "success");
            res.put("message", "获取危废库存预警期限阈值成功");
            res.put("data", inventoryThreshold);
        } catch (Exception e) {
            e.printStackTrace();

            res.put("status", "fail");

            res.put("message", "获取危废库存预警期限阈值失败");
        }

        return res.toString();

    }

    /**
     * 初始化页面加载
     */
    @RequestMapping("loadWarningList")
    @ResponseBody
    public String loadWarningList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Warning> warningList = warningService.loadWarningList(page);
            res.put("warningList", warningList);
            res.put("status", "success");
            res.put("message", "查询成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }


    @RequestMapping("deleteWarning")
    @ResponseBody
    public String deleteWarning(int id) {
        JSONObject res = new JSONObject();

        try {
            warningService.deleteWarning(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }
        return res.toString();

    }

    @RequestMapping("reStartWarning")
    @ResponseBody
    public String reStartWarning(int id) {
        JSONObject res = new JSONObject();

        try {
            warningService.reStartWarning(id);
            res.put("status", "success");
            res.put("message", "启用成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "启用失败");

        }
        return res.toString();
    }

    /**
     * 计算总数
     */
    @RequestMapping("totalWarningRecord")
    @ResponseBody
    public int totalWarningRecord() {

        return warningService.totalWarningRecord();

    }

    /**
     * 查询
     */
    @RequestMapping("searchWaring")
    @ResponseBody
    public String searchWaring(@RequestBody Warning warning) {
        JSONObject res = new JSONObject();
        try {
            List<Warning> warningList = warningService.searchWaring(warning);
            res.put("warningList", warningList);
            res.put("status", "success");
            res.put("message", "查询成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 查询计数
     */
    @RequestMapping("searchWaringCount")
    @ResponseBody
    public int searchWaringCount(@RequestBody Warning warning) {
        return warningService.searchWaringCount(warning);

    }

    /**
     * 根据外键ID获取预警详细信息
     * @param id
     * @return
     */
    @RequestMapping("getWarningDetailById")
    @ResponseBody
    public String getWarningDetailById(int id) {
        JSONObject res = new JSONObject();
        try {
            List<Warning> warningList = warningService.getWarningDetailByAid(id);
            res.put("data", warningList);
            res.put("status", "success");
            res.put("message", "详细信息获取成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "详细信息获取失败");
        }
        return res.toString();
    }

    /**
     * 更新预警权限设置
     * @param warning
     * @return
     */
    @RequestMapping("updateWarningRoleIdList")
    @ResponseBody
    public String updateWarningRoleIdList(HttpSession session, @RequestBody Warning warning) {
        JSONObject res = new JSONObject();
        try {
            User user = (User) session.getAttribute("user");  // 获取当前用户
            if(user != null ) {
                warning.setModifier(user.getName());   // 设置修改人
            }else {
                warning.setModifier("未登录");
            }
            warningService.updateWarningRoleIdList(warning);
            res.put("status", "success");
            res.put("message", "更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }

    /**
     * 更新预警详细信息
     * @param warning
     * @return
     */
    @RequestMapping("updateWarningDetail")
    @ResponseBody
    public String updateWarningDetail(HttpSession session, @RequestBody Warning warning) {
        JSONObject res = new JSONObject();
        try {
            User user = (User) session.getAttribute("user");  // 获取当前用户
            if(user != null ) {
                warning.setModifier(user.getName());   // 设置修改人
            }else {
                warning.setModifier("未登录");
            }
            warningService.updateWarningDetail(warning);
            res.put("status", "success");
            res.put("message", "更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }

    /**
     * 根据当前角色获取预警信息
     * @param session
     * @return
     */
    @RequestMapping("getWarningInfoByRole")
    @ResponseBody
    public String getWarningInfoByRole(HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            User user = (User) session.getAttribute("user");   // 获取当前角色
            if(user != null) {
                List<String> warningList = warningService.getWarningInfoByRole(user.getRole().getId());
                JSONArray data = JSONArray.fromArray(warningList.toArray(new String[warningList.size()]));
                res.put("data", data);
                res.put("status", "success");
                res.put("message", "查询成功");
            }else {
                res.put("status", "fail");
                res.put("message", "查询失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }


}
