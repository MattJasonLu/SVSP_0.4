package com.jdlink.controller;

import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;
import com.jdlink.service.produce.ApprovalManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ApprovalManageController {

    @Autowired
    ApprovalManageService approvalManageService;


    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("searchApprovalManageTotal")
    @ResponseBody
    public int SearchApprovalManageTotal(@RequestBody ApprovalProcess approvalProcess) {
        try {
            return approvalManageService.searchTotal(approvalProcess);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取分页数据
     *
     * @param approvalProcess
     * @return
     */
    @RequestMapping("searchApprovalManage")
    @ResponseBody
    public String SearchApprovalManage(@RequestBody ApprovalProcess approvalProcess) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<ApprovalProcess> approvalProcessList = approvalManageService.search(approvalProcess);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(approvalProcessList.toArray(new ApprovalProcess[approvalProcessList.size()]));
            res.put("data", array);
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


    /*审批公共方法*/
    @RequestMapping("publicApproval")
    @ResponseBody
    public String publicApproval(String orderId,String roleId) {

        JSONObject res = new JSONObject();

        try {
            //1根据订单号找出审批流对象,再找出节点列表
            ApprovalProcess approvalProcess = approvalManageService.getApprovalProcessByOrderId(orderId);
            if (approvalProcess != null) {
                //在根据角色编号和审批流主键找出相应的节点
                ApprovalNode approvalNode = approvalManageService.getNodeByIdAndRoleId(approvalProcess.getId(), roleId);
                //更新审批节点新父节点状态为审批中
                approvalManageService.updateApprovalById(approvalNode.getApprovalPId(), 2);
                //更新本节点新父节点状态为通过
                approvalManageService.updateApprovalById(approvalNode.getId(), 1);
                res.put("status", "success");
                res.put("message", "审批通过");
            }


        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审批失败");
        }
        return res.toString();
    }

    /**
     * 获取网页链接数据
     * @return
     */
    @RequestMapping("getUrlList")
    @ResponseBody
    public String getUrlList() {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Organization> organizationList = approvalManageService.getUrlList();
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(organizationList.toArray(new Organization[organizationList.size()]));
            res.put("data", array);
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
     * 根据Id获取审批流模板数据数据
     *
     * @param id
     * @return
     */
    @RequestMapping("getApprovalProcessModelById")
    @ResponseBody
    public String getApprovalProcessModelById(int id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            ApprovalProcess approvalProcess = approvalManageService.getApprovalProcessModelById(id);
            //新建一个对象并给它赋值
            JSONObject data = JSONObject.fromBean(approvalProcess);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 删除审批流
     * @param id
     * @return
     */
    @RequestMapping("deleteApprovalProcessModelById")
    @ResponseBody
    public String deleteApprovalProcessModelById(int id) {
        JSONObject res = new JSONObject();
        try {
            approvalManageService.deleteModelById(id);  // 删除审批流
            res.put("status", "success");
            res.put("message", "删除成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败！");
        }
        return res.toString();
    }

    /**
     * 修改审批流及节点数据
     * @param approvalProcess
     * @return
     */
    @RequestMapping("updateApprovalProcessModelById")
    @ResponseBody
    public String updateApprovalProcessModelById(@RequestBody ApprovalProcess approvalProcess) {
        JSONObject res = new JSONObject();
        try {
            approvalManageService.updateModelProcessById(approvalProcess);  // 修改审批流及节点
            res.put("status", "success");
            res.put("message", "修改成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败！");
        }
        return res.toString();
    }
}
