package com.jdlink.controller;

import com.jdlink.domain.Approval.ApprovalProcess;
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
}
